import { Star, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const PROVIDERS = [
  { id: 1, name: 'Mavis', rating: '4.9', type: 'Premium Pro', active: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFhBzUGae0sgbUzMS_mSwAwKLh-mmHn2SE0kAGY2W0dHnJw_arohkZ29hHyi_358mJcTZgCTgohh0yKWX6VGMJbXZIswFT4fZabm7GrSZZziLtJylzaA1NCr91JVRwjtCxINfT9lteMLepd0n3AA3yBEVDczxS0MzjE32RRyfZizcvg-4K1zMUOqkctdRIL_BUsTG3MIPziBWjHJ95Ip7Gj_tnbTSlvjaYpb6_Dd1YeX_xx8U14uNbQGgtLHw1tdUuV2_z1EVHong' },
  { id: 2, name: 'Akua', rating: '4.8', type: 'Gold Star', active: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoppPamSzAw49tr3oGXChVTtah2B9IQm9TxfHei9j4RVzWQnhq7EGv1_BwIK32ZkTDlkXwtJsraYE-XVQGRJKPV4_T4va82lZaD_T-lGgkayY5hpRaWwEOGnXMSyjvzMZSDFuLzap3jOl4ThTIuFBixsLdOdgn8QLyK94YOFgdirRFIEcHejlSnvug5gOk-Y_hGaJqR-mbIh86cNzCFcQz57VYLgSAW-958rh038rL5jt8sWDadQuHNqGu0kue5-zcCSHVraAFWpM' },
  { id: 3, name: 'Esi', rating: '4.7', type: 'Specialist', active: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrWflYJDZoimwqhwbkwn7BmiA7MuG49r3CCcFnalNaxlwNLSjRx8es3CCkRgovGHNN4pn4We-gsZpOK3p2yx07Kow5zyHZwvOnj3WrD6cc_gLoFBcgVLhmlRW54HjHBAV53uxVsvcPyfR6LdER1TpFhPMGhBhQD3aDONVLXzige15O0P5hO9Oe6iDFwXkkIeKvm_Q0-__PQSrtevOO2xyq6-vLr6SmQwzPsw9jO9F8zL2sqkf5x9jNF_M5P1TZTLpjMArRFWWn0jA' },
];

const DAYS = [
  { day: 'M', date: '21' },
  { day: 'T', date: '22', active: true },
  { day: 'W', date: '23' },
  { day: 'T', date: '24' },
  { day: 'F', date: '25' },
  { day: 'S', date: '26' },
  { day: 'S', date: '27' },
];

const SubscriptionCustomization = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(1);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight italic">Tailor Your Routine.</h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wide">Configure your household rhythm with precision</p>
        </div>
      </section>

      {/* Main Grid: Details & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Configuration */}
        <div className="lg:col-span-8 space-y-12">
          {/* Provider Selection */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-1">
               <h3 className="text-xl font-extrabold text-on-surface tracking-tight italic">1. Select Preferred Professional</h3>
               <Badge className="bg-primary/5 text-primary border-none text-[0.55rem] font-bold uppercase tracking-widest px-3 py-1">Top Tier Pros</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {PROVIDERS.map((p) => (
                 <Card 
                   key={p.id}
                   onClick={() => setSelectedProvider(p.id)}
                   className={cn(
                     "p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer text-center space-y-6 group",
                     selectedProvider === p.id 
                       ? "bg-primary/5 border-primary shadow-2xl shadow-primary/10 ring-4 ring-primary/5" 
                       : "bg-surface-container-lowest border-transparent shadow-xl shadow-black/5 hover:border-border/10"
                   )}
                 >
                    <div className="relative w-24 h-24 mx-auto transition-transform group-hover:scale-105">
                       <Avatar className="w-full h-full border-2 border-white shadow-lg">
                          <AvatarImage src={p.image} alt={p.name} className="object-cover" />
                          <AvatarFallback className="bg-primary/5 text-primary font-bold text-lg">{p.name[0]}</AvatarFallback>
                       </Avatar>
                       <div className="absolute -bottom-1 -right-1 bg-secondary px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md">
                          <Star className="w-3 h-3 text-white fill-white" />
                          <span className="text-[0.65rem] font-bold text-white">{p.rating}</span>
                       </div>
                    </div>
                    <div>
                       <h4 className="font-extrabold text-on-surface text-lg tracking-tight mb-1">{p.name}</h4>
                       <p className="text-[0.6rem] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">{p.type}</p>
                    </div>
                 </Card>
               ))}
            </div>
          </section>

          {/* Schedule Selection */}
          <section className="bg-surface-container-low p-10 rounded-[3rem] space-y-10">
             <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-on-surface tracking-tight italic">2. Preferred Service Day</h3>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                   {DAYS.map((d) => (
                     <button 
                       key={d.date}
                       className={cn(
                         "flex flex-col items-center justify-center py-5 rounded-2xl transition-all border-2",
                         d.active 
                           ? "bg-primary border-primary text-white shadow-lg shadow-primary/10 scale-105" 
                           : "bg-white border-transparent text-on-surface-variant hover:border-border/10 shadow-sm"
                       )}
                     >
                       <span className={cn("text-[0.6rem] font-bold uppercase tracking-widest mb-1 opacity-60", d.active ? "text-white" : "text-outline")}>{d.day}</span>
                       <span className="text-xl font-extrabold tracking-tight leading-none">{d.date}</span>
                     </button>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="font-bold text-base text-on-surface italic opacity-60 uppercase tracking-widest">Daily Time Slot</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Button className="h-14 rounded-xl bg-white text-on-surface font-bold text-[0.7rem] uppercase tracking-widest ring-1 ring-primary shadow-lg shadow-primary/5 border-none transition-all hover:scale-[1.02]">
                      08:00 AM — 12:00 PM
                   </Button>
                   <Button variant="secondary" className="h-14 rounded-xl bg-surface-container-high/50 text-on-surface-variant font-bold text-[0.7rem] uppercase tracking-widest shadow-sm hover:bg-surface-container-highest border-none transition-all">
                      01:00 PM — 05:00 PM
                   </Button>
                </div>
             </div>
          </section>
        </div>

        {/* Right Column: Recap & Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
           <Card className="primary-gradient p-10 rounded-[3.5rem] text-white space-y-10 shadow-[0_40px_80px_rgba(83,65,205,0.2)] relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <h3 className="text-2xl font-extrabold tracking-tight leading-none italic mb-2">Plus Plan.</h3>
                    <Badge className="bg-white/20 text-white border-none font-bold text-[0.55rem] px-2.5 py-1 uppercase tracking-widest">Weekly Support</Badge>
                 </div>
                 
                 <div className="space-y-5 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4 group cursor-default">
                       <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 transition-colors group-hover:bg-white/20">
                          <Calendar className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-[0.55rem] font-bold opacity-40 uppercase tracking-widest">Selected Interval</p>
                          <p className="text-xs font-bold italic">Every Tuesday, 08:00 AM</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 group cursor-default">
                       <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 transition-colors group-hover:bg-white/20">
                          <MapPin className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-[0.55rem] font-bold opacity-40 uppercase tracking-widest">Primary Station</p>
                          <p className="text-xs font-bold italic">24 Cantonments Rd, Accra</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="pt-4 space-y-6 relative z-10">
                 <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold opacity-40 uppercase tracking-widest">Subscription Cost</span>
                    <div className="flex items-baseline gap-1">
                       <span className="text-sm font-bold opacity-40">₵</span>
                       <span className="text-xl font-extrabold italic opacity-90">280.00</span>
                    </div>
                 </div>
                 <Button 
                    className="w-full h-14 bg-white text-primary font-bold text-[0.75rem] uppercase tracking-widest rounded-xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    onClick={() => navigate('/subscription-manage')}
                  >
                     Confirm Selection
                     <ArrowRight className="w-4 h-4" />
                  </Button>
              </div>
           </Card>

           <div className="mt-8 p-8 bg-surface-container-low rounded-[2rem] flex items-center gap-5 border border-border/5">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md text-primary shrink-0">
                 <Badge className="p-0 bg-transparent text-primary">✓</Badge>
              </div>
              <p className="text-[0.8rem] font-bold text-on-surface-variant leading-relaxed">
                 You can change your professional or schedule <span className="text-on-surface font-black">anytime</span> within the first 30 days.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCustomization;
