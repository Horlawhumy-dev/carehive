import { Star, MapPin, Briefcase, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

const REVIEWS = [
  { id: 1, name: 'Emmanuel K.', initial: 'EK', rating: 5, comment: 'Mavis left my house sparkling. She is very professional and arrived exactly on time. Highly recommended!', color: 'bg-primary-fixed' },
  { id: 2, name: 'Sandra A.', initial: 'SA', rating: 4.5, comment: 'Very thorough cleaning of the kitchen and bathrooms. Professional and polite. Will book again.', color: 'bg-secondary-fixed' },
];

const WorkerProfile = () => {
  const navigate = useNavigate();
  const {} = useParams();

  return (
    <div className="min-h-screen bg-surface pb-32 md:pb-20">
      {/* Dynamic Header for Desktop/Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 max-w-7xl mx-auto items-start">
        
        {/* Left Column: Visuals & Highlights */}
        <div className="lg:col-span-5 space-y-8">
          <section className="relative w-full h-[320px] lg:h-[500px] lg:rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover" 
              alt="Professional at work" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
            <div className="absolute bottom-6 left-6 lg:hidden">
              <h1 className="text-white text-2xl font-extrabold tracking-tight">Mavis A.</h1>
              <p className="text-white/80 font-bold uppercase tracking-widest text-[0.6rem]">Professional Cleaner</p>
            </div>
          </section>

          {/* Stats Bento Grid - Desktop Version */}
          <div className="hidden lg:grid grid-cols-3 gap-4">
            {[
              { label: 'YEARS EXP.', value: '5+', icon: Briefcase },
              { label: 'JOBS DONE', value: '150+', icon: ShieldCheck },
              { label: 'LOCATED', value: 'Accra', icon: MapPin },
            ].map((stat) => (
              <Card key={stat.label} className="bg-surface-container-low border-none p-5 flex flex-col items-center justify-center text-center rounded-2xl shadow-none">
                <span className="text-primary font-extrabold text-xl mb-1">{stat.value}</span>
                <span className="text-[0.6rem] font-bold text-on-surface-variant tracking-widest uppercase">{stat.label}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Booking */}
        <div className="lg:col-span-7 px-6 lg:px-0 mt-8 lg:mt-0 space-y-8">
          <div className="hidden lg:block space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface leading-none italic">Mavis Appiah.</h1>
            <div className="flex items-center gap-4 pt-1">
               <div className="flex items-center text-secondary bg-secondary/5 px-3 py-1 rounded-xl font-bold text-base border border-secondary/10">
                  <Star className="w-5 h-5 fill-secondary mr-2" />
                  4.9
               </div>
               <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Expert Domestic Professional</span>
            </div>
          </div>

          {/* Bio */}
          <section className="space-y-4">
            <h3 className="font-bold text-[0.65rem] uppercase tracking-[0.2em] text-primary">Personal Ethos</h3>
            <p className="text-lg md:text-xl text-on-surface font-medium leading-relaxed italic text-balance opacity-90">
              "I believe a clean home is a sanctuary. With over 5 years of experience in high-end estates, I focus on the details that others miss, ensuring your space feels brand new every visit."
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
                     <span className="text-3xl font-extrabold text-primary tracking-tight">₵45</span>
                     <span className="text-xs font-bold text-on-surface-variant">/ hour</span>
                   </div>
                </div>
                <Button className="h-14 px-10 primary-gradient text-white font-bold text-base rounded-xl shadow-lg shadow-primary/10 active:scale-95 transition-all uppercase tracking-widest" onClick={() => navigate('/booking')}>
                  Book Appointment
                </Button>
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
              <span className="text-on-surface font-extrabold text-xl tracking-tight">₵45</span>
              <span className="text-on-surface-variant text-[0.65rem] font-bold">/hr</span>
            </div>
          </div>
          <Button className="flex-1 h-14 primary-gradient text-white font-black text-[0.9rem] rounded-2xl shadow-lg shadow-primary/20 uppercase tracking-widest" onClick={() => navigate('/booking')}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
