import { Star, Plus, Minus, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const DAYS = [
  { day: 'Mon', date: '23', active: true },
  { day: 'Tue', date: '24' },
  { day: 'Wed', date: '25' },
  { day: 'Thu', date: '26' },
  { day: 'Fri', date: '27' },
];

const SLOTS = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

const BookingFlow = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(4);
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight italic">Secure Your Pro.</h1>
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
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
                  className="w-24 h-24 rounded-[2rem] object-cover shadow-lg" 
                  alt="Sarah Mensah" 
                />
                <div className="absolute -bottom-2 -right-2 bg-secondary px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 text-white fill-white" />
                  <span className="text-xs font-black text-white">4.9</span>
                </div>
              </div>
              <div>
                <h2 className="font-extrabold text-xl text-on-surface tracking-tight leading-none italic mb-1">Sarah Mensah</h2>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest opacity-60">Professional Housekeeping • ₵45.00/hr</p>
              </div>
            </Card>
          </section>

          {/* Date & Time Selection */}
          <section className="bg-surface-container-low p-10 rounded-[3rem] space-y-10">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold text-on-surface tracking-tight italic">1. Select Service Date</h3>
                    <span className="text-primary font-bold text-xs tracking-widest uppercase opacity-60">March 2026</span>
                 </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                   {DAYS.map((d) => (
                     <div 
                       key={d.date} 
                       className={cn(
                         "flex-shrink-0 w-24 h-32 rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer border-2",
                         d.active 
                           ? "bg-primary border-primary text-white shadow-2xl shadow-primary/20 scale-105" 
                           : "bg-white border-transparent text-on-surface-variant hover:border-primary/20"
                       )}
                     >
                        <span className={cn("text-[0.6rem] font-bold uppercase tracking-widest mb-1", d.active ? "opacity-70" : "opacity-40")}>{d.day}</span>
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
                      defaultValue="24 Cantonments Crescent, Accra" 
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
                       <span className="font-black">₵{duration * 45}.00</span>
                    </div>
                    <div className="flex justify-between items-center opacity-60">
                       <span className="text-sm font-bold">Logistics & Tech</span>
                       <span className="font-black">₵12.00</span>
                    </div>
                     <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="text-base font-extrabold italic">Total Due</span>
                        <span className="text-3xl font-extrabold tracking-tight text-primary">₵{duration * 45 + 12}.00</span>
                     </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <Button 
                   className="w-full h-14 primary-gradient text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-primary/10 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                   onClick={() => navigate('/payment')}
                 >
                   Confirm & Proceed
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
