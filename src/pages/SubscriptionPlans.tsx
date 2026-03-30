import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const PLANS = [
  {
    name: 'Basic',
    price: '150',
    desc: 'Perfect for small apartments',
    features: ['1x Weekly Cleaning', '10% off laundry', 'Standard support'],
    unavailable: ['Priority support', 'Dedicated manager'],
    color: 'bg-surface-container-highest',
  },
  {
    name: 'Plus',
    price: '280',
    desc: 'Most popular for families',
    features: ['2x Weekly Cleaning', '15% off laundry', 'Priority support'],
    unavailable: ['Dedicated manager'],
    color: 'bg-primary-container',
    popular: true,
  },
  {
    name: 'Premium',
    price: '400',
    desc: 'Full household management',
    features: ['3x Weekly Cleaning', '20% off laundry', 'Dedicated manager'],
    unavailable: [],
    color: 'bg-surface-container-highest',
  }
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="space-y-16 pb-24 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
        <Badge className="bg-primary/5 text-primary border-none font-bold text-[0.6rem] px-4 py-1 uppercase tracking-widest rounded-full leading-none">Membership Options</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface leading-tight italic">Elevate Your Home Life.</h1>
        <p className="text-on-surface-variant font-medium text-base leading-relaxed opacity-70">
          Choose a tailored care plan that integrates seamlessly with your household rhythm.
        </p>

        <div className="flex justify-center pt-4">
          <div className="bg-surface-container-low p-2 rounded-[2rem] flex items-center gap-1 shadow-inner border border-border/5">
            <button 
              onClick={() => setBilling('monthly')}
              className={cn("px-8 py-2.5 rounded-xl text-xs font-bold transition-all", billing === 'monthly' ? "bg-white text-primary shadow-lg" : "text-on-surface-variant hover:text-primary")}
            >
              MONTHLY
            </button>
            <button 
              onClick={() => setBilling('yearly')}
              className={cn("px-8 py-2.5 rounded-xl text-xs font-bold transition-all", billing === 'yearly' ? "bg-white text-primary shadow-lg" : "text-on-surface-variant hover:text-primary")}
            >
              YEARLY <span className="ml-1 text-[0.55rem] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <Card key={plan.name} className={cn(
            "p-10 rounded-[3.5rem] border-none flex flex-col relative overflow-hidden transition-all group hover:scale-[1.02]",
            plan.popular ? "bg-on-surface text-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] scale-105 z-10" : "bg-surface-container-lowest border-border/10 shadow-2xl shadow-black/[0.03] hover:shadow-primary/5"
          )}>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white px-8 py-3 rounded-bl-[2.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl">
                OUR RECOMMENDATION
              </div>
            )}
            
            <div className="mb-10">
              <h3 className={cn("text-[0.65rem] font-bold uppercase tracking-widest mb-4", plan.popular ? "text-primary" : "text-outline")}>{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold opacity-40 italic">₵</span>
                <span className="text-5xl font-extrabold tracking-tight leading-none italic">{plan.price}</span>
                <span className={cn("text-xs font-bold opacity-40 ml-1 italic", plan.popular ? "text-white" : "text-on-surface-variant")}>/MO</span>
              </div>
              <p className={cn("text-[0.9rem] font-medium mt-4 leading-relaxed opacity-60", plan.popular ? "text-white" : "text-on-surface-variant")}>
                {plan.desc}
              </p>
            </div>
            
            <div className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className={cn("w-5 h-5 rounded-md flex items-center justify-center", plan.popular ? "bg-primary/20 text-white" : "bg-primary/5 text-primary")}>
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={cn("text-sm font-bold", plan.popular ? "text-white" : "text-on-surface")}>{f}</span>
                </div>
              ))}
              {plan.unavailable.map((f) => (
                <div key={f} className="flex items-center gap-3 opacity-20">
                  <XCircle className="w-5 h-5 stroke-[3]" />
                  <span className="text-sm font-medium line-through">{f}</span>
                </div>
              ))}
            </div>

            <Button 
              className={cn(
                "w-full h-14 rounded-xl font-bold text-[0.7rem] uppercase tracking-widest transition-all",
                plan.popular 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-surface-container-high text-on-surface hover:bg-primary hover:text-white"
              )}
              onClick={() => navigate('/subscription-customize')}
            >
              Select {plan.name}
            </Button>
          </Card>
        ))}
      </div>

      {/* Support & CTA Banner */}
      <section className="bg-surface-container-low p-12 rounded-[4rem] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl text-primary shrink-0 relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
               <Sparkles className="w-12 h-12 relative z-10" />
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Enterprise Needs?</h3>
               <p className="text-on-surface-variant text-[0.9rem] font-medium leading-relaxed opacity-60">
                 Dedicated packages for estate managers and corporate benefits.
               </p>
            </div>
         </div>
         <div className="md:text-right">
            <Button variant="outline" className="h-16 px-10 rounded-[2rem] font-black text-[0.8rem] uppercase tracking-widest border-border/10 hover:bg-white transition-all shadow-sm">
               Inquire for Corporate
            </Button>
         </div>
      </section>
    </div>
  );
};

export default SubscriptionPlans;
