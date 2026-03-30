import { useState, useEffect } from 'react';
import { Star, MapPin, Briefcase, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const REVIEWS = [
  { id: 1, name: 'Emmanuel K.', initial: 'EK', rating: 5, comment: 'This professional left my house sparkling. Very professional and arrived exactly on time. Highly recommended!', color: 'bg-primary-fixed' },
  { id: 2, name: 'Sandra A.', initial: 'SA', rating: 4.5, comment: 'Very thorough cleaning of the kitchen and bathrooms. Professional and polite. Will book again.', color: 'bg-secondary-fixed' },
];

const WorkerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .or(`user_id.eq.${id},id.eq.${id}`)
          .single();

        if (error) {
          toast.error('Error fetching professional: ' + error.message);
        } else {
          setWorker(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      }
    });

    return () => subscription.unsubscribe();
  }, [id]);

  const isPro = userMetadata?.role === 'pro';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-6 text-center">
         <h1 className="text-4xl font-black italic tracking-tighter text-on-surface mb-4">Professional not found.</h1>
         <Button onClick={() => navigate('/worker-listing')} className="primary-gradient text-white rounded-xl h-14 px-8 font-black uppercase tracking-widest">Back to Discovery</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-32 md:pb-20">
      {/* Dynamic Header for Desktop/Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 max-w-7xl mx-auto items-start">
        
        {/* Left Column: Visuals & Highlights */}
        <div className="lg:col-span-5 space-y-8">
          <section className="relative w-full h-[320px] lg:h-[500px] lg:rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10">
            <img 
              src={worker.avatar_url || "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000"} 
              className="w-full h-full object-cover" 
              alt={worker.first_name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
            <div className="absolute bottom-6 left-6 lg:hidden">
              <h1 className="text-white text-2xl font-extrabold tracking-tight">{worker.first_name} {worker.last_name[0]}.</h1>
              <p className="text-white/80 font-bold uppercase tracking-widest text-[0.6rem]">{worker.service_type}</p>
            </div>
          </section>

          {/* Stats Bento Grid - Desktop Version */}
          <div className="hidden lg:grid grid-cols-3 gap-4">
               <Card className="bg-surface-container-low border-none p-5 flex flex-col items-center justify-center text-center rounded-2xl shadow-none group hover:bg-white transition-colors">
                 <Briefcase className="w-5 h-5 text-primary mb-2 opacity-40" />
                 <span className="text-primary font-extrabold text-xl mb-1">{worker.years_exp}+</span>
                 <span className="text-[0.6rem] font-bold text-on-surface-variant tracking-widest uppercase">YEARS EXP.</span>
               </Card>
               <Card className="bg-surface-container-low border-none p-5 flex flex-col items-center justify-center text-center rounded-2xl shadow-none group hover:bg-white transition-colors">
                 <ShieldCheck className="w-5 h-5 text-primary mb-2 opacity-40" />
                 <span className="text-primary font-extrabold text-xl mb-1">150+</span>
                 <span className="text-[0.6rem] font-bold text-on-surface-variant tracking-widest uppercase">JOBS DONE</span>
               </Card>
               <Card className="bg-surface-container-low border-none p-5 flex flex-col items-center justify-center text-center rounded-2xl shadow-none group hover:bg-white transition-colors">
                 <MapPin className="w-5 h-5 text-primary mb-2 opacity-40" />
                 <span className="text-primary font-extrabold text-xl mb-1">Accra</span>
                 <span className="text-[0.6rem] font-bold text-on-surface-variant tracking-widest uppercase">LOCATED</span>
               </Card>
          </div>
        </div>

        {/* Right Column: Details & Booking */}
        <div className="lg:col-span-7 px-6 lg:px-0 mt-8 lg:mt-0 space-y-8">
          <div className="hidden lg:block space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface leading-none italic">{worker.first_name} {worker.last_name}.</h1>
            <div className="flex items-center gap-4 pt-1">
               <div className="flex items-center text-secondary bg-secondary/5 px-3 py-1 rounded-xl font-bold text-base border border-secondary/10">
                  <Star className="w-5 h-5 fill-secondary mr-2" />
                  4.9
               </div>
               <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Expert {worker.service_type}</span>
            </div>
          </div>

          {/* Bio */}
          <section className="space-y-4">
            <h3 className="font-bold text-[0.65rem] uppercase tracking-[0.2em] text-primary">Personal Ethos</h3>
            <p className="text-lg md:text-xl text-on-surface font-medium leading-relaxed italic text-balance opacity-90">
              "{worker.bio}"
            </p>
          </section>

          {/* Reviews Row */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[0.65rem] uppercase tracking-[0.2em] text-primary">Resident Voices</h3>
              <Button variant="link" className="text-primary font-bold uppercase tracking-widest text-[0.65rem]">All Reviews →</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REVIEWS.map((review) => (
                <Card key={review.id} className="bg-surface-container-low p-6 rounded-[2rem] border-none shadow-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "fill-secondary text-secondary" : "text-surface-container-highest")} />
                    ))}
                  </div>
                  <p className="text-[0.9rem] text-on-surface-variant font-medium leading-relaxed mb-6 line-clamp-3">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-[0.6rem]", review.color)}>
                      {review.initial}
                    </div>
                    <span className="text-on-surface font-black text-[0.75rem] uppercase tracking-wider">{review.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Booking Card - Embedded for Desktop, Sticky for Mobile */}
          <Card className="p-8 rounded-[2.5rem] bg-surface-container-highest border-none shadow-xl shadow-black/5 hidden lg:block">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[0.6rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Standard Rate</p>
                   <div className="flex items-baseline gap-1">
                     <span className="text-3xl font-extrabold text-primary tracking-tight">₵{worker.hourly_rate}</span>
                     <span className="text-xs font-bold text-on-surface-variant">/ hour</span>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button 
                    className={cn(
                      "h-11 px-10 font-bold text-base rounded-xl transition-all uppercase tracking-widest shadow-lg",
                      isPro 
                        ? "bg-on-surface/5 text-on-surface/20 cursor-not-allowed shadow-none" 
                        : "primary-gradient text-white shadow-primary/10 active:scale-95"
                    )}
                    onClick={() => !isPro && navigate('/booking', { state: { workerId: worker.user_id || worker.id } })}
                    disabled={isPro}
                  >
                    {isPro && <Lock className="w-4 h-4 mr-2" />}
                    Book Appointment
                  </Button>
                  {isPro && (
                    <p className="text-[0.6rem] font-black text-on-surface-variant uppercase tracking-widest italic opacity-40">Switch to Client account to book</p>
                  )}
                </div>
             </div>
          </Card>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-xl z-50 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-indigo-100/10 lg:hidden">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-outline text-[0.55rem] font-bold tracking-widest uppercase mb-1">Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-on-surface font-extrabold text-xl tracking-tight">₵{worker.hourly_rate}</span>
              <span className="text-on-surface-variant text-[0.65rem] font-bold">/hr</span>
            </div>
          </div>
          <Button 
            className={cn(
              "flex-1 h-11 font-black text-[0.9rem] rounded-2xl shadow-lg transition-all uppercase tracking-widest",
              isPro 
                ? "bg-on-surface/5 text-on-surface/20 cursor-not-allowed shadow-none" 
                : "primary-gradient text-white shadow-primary/20"
            )}
            onClick={() => !isPro && navigate('/booking', { state: { workerId: worker.user_id || worker.id } })}
            disabled={isPro}
          >
            {isPro ? "Restricted Flow" : "Book Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
