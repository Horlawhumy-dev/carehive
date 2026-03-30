import { ShieldCheck, CheckCircle2, Star, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const VerificationTrust = () => {
  const navigate = useNavigate();
  const [userMetadata, setUserMetadata] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      }
    });
  }, []);

  const isPro = userMetadata?.role === 'pro';

  return (
    <div className="space-y-16 pb-24">
      {/* ... (Verification Hero section remains unchanged) */}
      <section className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 py-10">
        <div className="relative">
           <div className="w-32 h-32 rounded-[2.5rem] bg-on-surface flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.15)] transform -rotate-6">
              <ShieldCheck className="w-16 h-16 text-primary stroke-[2.5]" />
           </div>
           <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border-4 border-surface shadow-xl rotate-12">
              <Star className="w-6 h-6 text-white fill-white" />
           </div>
        </div>
        <div className="space-y-4">
           <Badge className="bg-primary/5 text-primary border-none font-bold text-[0.6rem] px-4 py-1 uppercase tracking-widest rounded-full leading-none">Safeguarding Excellence</Badge>
           <h1 className="text-4xl font-extrabold tracking-tight text-on-surface leading-tight italic">Verified by CareHive.</h1>
           <p className="text-on-surface-variant font-medium text-base leading-relaxed opacity-70">
             The 5-Star Security Standard for high-end household management.
           </p>
        </div>
      </section>

      {/* ... (Main Content Grid unchanged) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
         {/* (Trust Pillars unchanged) */}
         <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Identity Verified', desc: 'Government-issued ID and biometric check confirmed.', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { title: 'Background Screened', desc: 'Clean criminal record and vetting process passed.', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: 'Insured Services', desc: 'Full liability protection for you and your property.', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { title: 'Trained & Certified', desc: 'Mandatory CareHive hospitality and safety training.', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' }
            ].map((pillar) => (
              <Card key={pillar.title} className="p-8 rounded-[2.5rem] border-none bg-surface-container-lowest shadow-2xl shadow-black/[0.03] flex flex-col gap-6 group hover:scale-[1.02] transition-all">
                 <div className={`w-16 h-16 ${pillar.bg} ${pillar.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:rotate-3`}>
                    <pillar.icon className="w-8 h-8" />
                 </div>
                  <div>
                     <h3 className="font-extrabold text-on-surface text-lg leading-none mb-3 italic tracking-tight">{pillar.title}</h3>
                     <p className="text-sm text-on-surface-variant font-medium leading-relaxed opacity-70">{pillar.desc}</p>
                  </div>
                 <div className="pt-4 border-t border-border/5">
                     <div className="flex items-center gap-2 text-[0.6rem] font-bold text-emerald-600 uppercase tracking-widest">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Status: Certified
                     </div>
                 </div>
              </Card>
            ))}
         </div>

         {/* (Ethos & Quote unchanged) */}
         <div className="lg:col-span-5 space-y-8">
            <Card className="bg-surface-container-low p-12 rounded-[3.5rem] space-y-8 relative overflow-hidden border-none shadow-none">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <ShieldCheck className="w-48 h-48" />
               </div>
               
               <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-[2px] bg-primary"></div>
                  <h4 className="font-bold text-primary text-[0.7rem] uppercase tracking-[0.3em]">The CareHive Ethos</h4>
               </div>
               
               <p className="text-on-surface text-lg font-medium leading-relaxed italic relative z-10 opacity-80">
                 "Trust is our most valuable asset. Every CareHive Certified professional represents a commitment to safety, excellence, and peace of mind. We don't just provide services; we safeguard your home sanctuary."
               </p>
               
               <div className="pt-8 border-t border-border/10 flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-200 shadow-md border-2 border-white overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Ama K. Mensah" className="w-full h-full object-cover" />
                  </div>
                   <div>
                     <p className="font-extrabold text-on-surface text-base tracking-tight">Ama K. Mensah</p>
                     <p className="text-[0.6rem] font-bold text-outline uppercase tracking-widest">Head of Safeguarding</p>
                   </div>
               </div>
            </Card>
         </div>
      </div>

      {/* Return Action */}
      <section className="flex justify-center pt-8">
          <Button 
            className="h-14 px-12 bg-on-surface text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-xl hover:bg-primary transition-all active:scale-95" 
            onClick={() => {
              if (isPro) {
                navigate('/worker-dashboard');
              } else {
                navigate(-1);
              }
            }}
          >
             {isPro ? 'Return to Dashboard' : 'Return to Booking Suite'}
          </Button>
      </section>
    </div>
  );
};

export default VerificationTrust;
