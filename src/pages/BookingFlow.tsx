import { Star, Plus, Minus, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

import { useLocation } from 'react-router-dom';

const SLOTS = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

const generateDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate().toString(),
      fullDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      id: i - 1
    });
  }
  return days;
};

const BookingFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const workerId = location.state?.workerId;

  const [days] = useState(generateDays());
  const [selectedDateId, setSelectedDateId] = useState(0);
  const [duration, setDuration] = useState(4);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [worker, setWorker] = useState<any>(null);
  const [loadingWorker, setLoadingWorker] = useState(true);
  const [address, setAddress] = useState('24 Cantonments Crescent, Accra');

  useEffect(() => {
    if (!workerId) {
      toast.error('No professional selected. Returning to discovery.');
      navigate('/listing');
      return;
    }

    const fetchWorker = async () => {
      setLoadingWorker(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`user_id.eq.${workerId},id.eq.${workerId}`)
        .single();

      if (error) {
        toast.error('Error fetching professional details');
        navigate('/listing');
      } else {
        setWorker(data);
      }
      setLoadingWorker(false);
    };

    fetchWorker();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
        if (session.user.user_metadata.role === 'pro') {
          toast.error('Professional accounts cannot initiate bookings.');
          navigate('/worker-dashboard');
        }
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
        if (session.user.user_metadata.role === 'pro') {
          toast.error('Professional accounts cannot initiate bookings.');
          navigate('/worker-dashboard');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [workerId, navigate]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!session?.user) {
      toast.error('Please sign in to book a professional.');
      navigate('/login');
      return;
    }

    if (!worker) return;

    setIsSubmitting(true);
    const hourlyRate = parseInt(worker.hourly_rate) || 45;
    const serviceFee = duration * hourlyRate;
    const logisticsFee = serviceFee * 0.1;
    const totalPrice = serviceFee + logisticsFee;

    const bookingData = {
      client_id: session.user.id,
      client_name: `${userMetadata?.first_name || 'Client'} ${userMetadata?.last_name || ''}`.trim(),
      worker_id: worker.user_id || worker.id,
      worker_name: `${worker.first_name} ${worker.last_name}`,
      service_date: days[selectedDateId].fullDate,
      service_time: selectedSlot,
      duration: duration,
      address: address,
      total_price: totalPrice,
      status: 'pending'
    };

    const { error } = await supabase.from('bookings').insert([bookingData]);

    if (error) {
      toast.error('Booking failed: ' + error.message);
      setIsSubmitting(false);
    } else {
      toast.success(`Service request sent to ${worker.first_name}!`);
      setTimeout(() => {
        navigate('/household');
      }, 1500);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight italic">
            {userMetadata?.first_name ? `${userMetadata.first_name}'s ` : ''}Booking.
          </h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wide">Refine your schedule and preferences</p>
        </div>
      </section>

      {/* Main Grid: Details & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Configuration */}
        <div className="lg:col-span-8 space-y-12">
          {/* Worker Context Card */}
          <section>
            <Card className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-transparent flex items-center gap-8">
              {loadingWorker ? (
                <div className="w-24 h-24 rounded-[2rem] bg-surface-container-low animate-pulse" />
              ) : (
                <div className="relative">
                  <img
                    src={worker?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
                    className="w-24 h-24 rounded-[2rem] object-cover shadow-lg"
                    alt={worker?.first_name}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-secondary px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                    <span className="text-xs font-black text-white">4.9</span>
                  </div>
                </div>
              )}
              {loadingWorker ? (
                <div className="space-y-2 flex-grow">
                  <div className="h-6 w-1/3 bg-surface-container-low animate-pulse rounded-lg" />
                  <div className="h-4 w-1/2 bg-surface-container-low animate-pulse rounded-lg" />
                </div>
              ) : (
                <div>
                  <h2 className="font-extrabold text-xl text-on-surface tracking-tight leading-none italic mb-1">{worker?.first_name} {worker?.last_name}</h2>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest opacity-60">{worker?.service_type || 'Professional'} • ₵{worker?.hourly_rate || '45'}.00/hr</p>
                </div>
              )}
            </Card>
          </section>

          {/* Date & Time Selection */}
          <section className="bg-surface-container-low p-10 rounded-[3rem] space-y-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-on-surface tracking-tight italic">1. Select Service Date</h3>
                <span className="text-primary font-bold text-xs tracking-widest uppercase opacity-60">
                  {days[0].fullDate.split(' ').slice(0, 1)} {days[0].fullDate.split(' ').slice(-1)}
                </span>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {days.map((d: any) => (
                  <div
                    key={d.id}
                    className={cn(
                      "flex-shrink-0 w-24 h-32 rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer border-2",
                      selectedDateId === d.id
                        ? "bg-primary border-primary text-white shadow-2xl shadow-primary/20 scale-105"
                        : "bg-white border-transparent text-on-surface-variant hover:border-primary/20"
                    )}
                    onClick={() => setSelectedDateId(d.id)}
                  >
                    <span className={cn("text-[0.6rem] font-bold uppercase tracking-widest mb-1", selectedDateId === d.id ? "opacity-70" : "opacity-40")}>{d.day}</span>
                    <span className="text-2xl font-extrabold leading-none">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-on-surface tracking-tight italic">2. Available Intervals</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {SLOTS.map((slot) => (
                  <Button
                    key={slot}
                    variant="outline"
                    className={cn(
                      "h-12 rounded-xl font-bold text-[0.7rem] transition-all border-border/10",
                      selectedSlot === slot ? "bg-primary text-white border-primary shadow-md shadow-primary/10" : "bg-white hover:bg-surface-container-high"
                    )}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Logistics */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 rounded-[2.5rem] bg-surface-container-lowest border-none shadow-lg shadow-black/5 space-y-6">
              <h3 className="text-base font-extrabold text-on-surface tracking-tight italic">Service Duration</h3>
              <div className="flex items-center justify-between bg-surface-container-low p-1.5 rounded-xl">
                <Button
                  variant="ghost"
                  className="w-12 h-12 rounded-xl bg-white text-primary transition-all active:scale-90"
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <div className="text-center">
                  <span className="text-2xl font-extrabold text-on-surface">{duration}</span>
                  <span className="text-[0.55rem] font-bold text-primary uppercase tracking-widest block leading-none">Hours</span>
                </div>
                <Button
                  className="w-12 h-12 rounded-xl primary-gradient text-white transition-all active:scale-90"
                  onClick={() => setDuration(duration + 1)}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-[0.75rem] text-on-surface-variant font-medium leading-relaxed opacity-60">
                Professional cleaning typically takes 1 hour per 50sqm of surface area.
              </p>
            </Card>

            <Card className="p-8 rounded-[2.5rem] bg-surface-container-lowest border-none shadow-lg shadow-black/5 space-y-6">
              <h3 className="text-base font-extrabold text-on-surface tracking-tight italic">Service Address</h3>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  className="w-full bg-surface-container-low border-none rounded-2xl h-14 pl-12 pr-4 font-bold text-[0.85rem] focus:ring-2 focus:ring-primary/10"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Badge className="bg-primary/5 text-primary font-bold text-[0.55rem] rounded-lg tracking-widest px-3 py-1 border-none shadow-none">HOME STATION</Badge>
              </div>
            </Card>
          </section>
        </div>

        {/* Right Column: Checkout Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <Card className="bg-on-surface p-10 rounded-[3rem] text-white space-y-8 shadow-2xl">
            <div className="space-y-6">
              <h3 className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.2em] opacity-80">Billing Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center opacity-60">
                  <span className="text-sm font-bold">Service Fee ({duration}h)</span>
                  <span className="font-black">₵{(duration * (parseInt(worker?.hourly_rate) || 45)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center opacity-60">
                  <span className="text-sm font-bold">Logistics & Tech (10%)</span>
                  <span className="font-black">₵{(duration * (parseInt(worker?.hourly_rate) || 45) * 0.1).toFixed(2)}</span>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-base font-extrabold italic">Total Due</span>
                  <span className="text-3xl font-extrabold tracking-tight text-primary">₵{(duration * (parseInt(worker?.hourly_rate) || 45) * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                disabled={isSubmitting}
                className="w-full h-12 primary-gradient text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-primary/10 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                onClick={handleConfirm}
              >
                {isSubmitting ? 'Processing...' : 'Confirm & Proceed'}
                <ChevronRight className="w-5 h-5" />
              </Button>
              <p className="text-center text-[0.65rem] opacity-40 font-bold leading-relaxed px-4">
                By proceeding, you agree to the CareHive Pro agreement and cancellation policy.
              </p>
            </div>
          </Card>

          <div className="mt-8 bg-surface-container-low p-8 rounded-[2rem] flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <p className="text-[0.75rem] font-bold text-on-surface-variant leading-tight">
              Your cleaning is protected by <span className="text-on-surface font-black">CareGuarantee™</span> up to ₵10,000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
