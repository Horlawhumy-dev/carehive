import { Smartphone, CreditCard, Wallet, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const METHODS = [
  { id: 'momo', name: 'Mobile Money', desc: 'MTN, Vodafone (Telecel)', icon: Smartphone },
  { id: 'card', name: 'Credit/Debit Card', desc: 'Visa, Mastercard', icon: CreditCard },
  { id: 'wallet', name: 'CareHive Wallet', desc: 'Balance: ₵1,200.00', icon: Wallet, tag: 'Fastest' },
];

const Payment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('momo');

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight italic">Finalize Payment.</h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Transaction ID: #CH-88234-X</p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/5 px-5 py-2.5 rounded-xl border border-secondary/10">
           <ShieldCheck className="w-4 h-4 text-secondary" />
           <span className="text-[0.65rem] font-bold text-secondary uppercase tracking-widest">Secure Encryption Active</span>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Amount & Method Selection */}
        <div className="lg:col-span-7 space-y-12">
          {/* Amount Display */}
          <section className="bg-surface-container-low p-10 rounded-[3rem] text-center md:text-left">
             <p className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest mb-4 opacity-60">Total Amount Due</p>
             <h2 className="text-5xl font-bold tracking-tight text-primary leading-none italic">₵450.00</h2>
              <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                <Badge className="bg-white text-on-surface-variant border-none shadow-sm font-bold text-[0.6rem] px-3 py-1 uppercase tracking-widest leading-none">INC. PLATFORM FEES</Badge>
              </div>
          </section>

          {/* Payment Method Selection */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-on-surface tracking-tight italic">Select Payment Method</h3>
            <div className="grid grid-cols-1 gap-4">
              {METHODS.map((m) => (
                <Card 
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center justify-between group",
                    method === m.id 
                      ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10" 
                      : "bg-surface-container-lowest border-transparent shadow-xl shadow-black/5 hover:border-border/20"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                      method === m.id ? "bg-primary text-white" : "bg-surface-container-high text-primary"
                    )}>
                      <m.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                         <h4 className="font-bold text-lg text-on-surface tracking-tight">{m.name}</h4>
                         {m.tag && <Badge className="bg-primary/10 text-primary border-none text-[0.55rem] font-bold uppercase tracking-widest px-2 py-0.5">{m.tag}</Badge>}
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium opacity-60 uppercase tracking-wide">{m.desc}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all",
                    method === m.id ? "border-primary bg-primary" : "border-border/20"
                  )}>
                    {method === m.id && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-lg" />}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Card Visual and Action */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 h-fit">
           <Card className="bg-on-surface p-10 rounded-[3rem] text-white space-y-12 shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
               <div className="flex justify-between items-start relative z-10">
                 <Smartphone className="w-8 h-8 opacity-60" />
                 <p className="font-bold text-lg italic tracking-tight opacity-60">CareHive Elite</p>
              </div>
              <div className="space-y-1 relative z-10">
                 <p className="text-[0.55rem] font-bold opacity-40 uppercase tracking-widest">Member Account</p>
                 <p className="text-xl font-bold tracking-[0.15em] opacity-90">•••• •••• •••• 8823</p>
              </div>
              <div className="flex justify-between items-end relative z-10">
                  <div>
                    <p className="text-[0.55rem] font-bold opacity-40 uppercase tracking-widest mb-1">Platform Identity</p>
                    <p className="text-xs font-bold opacity-80">Julian Haroff</p>
                  </div>
                 <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10"></div>
              </div>
           </Card>

           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <span className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest">Final Settlement</span>
                 <span className="text-xl font-extrabold text-on-surface uppercase tracking-tight italic">₵450.00</span>
              </div>
              <Button 
                className="w-full h-14 primary-gradient text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-primary/10 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                onClick={() => navigate('/worker-dashboard')}
              >
                <Lock className="w-4 h-4 opacity-40" />
                Complete Transaction
              </Button>
              <p className="text-center text-[0.65rem] text-on-surface-variant font-bold leading-relaxed px-10">
                 Your transaction is protected by end-to-end encryption. Funds are held in escrow via <span className="text-primary font-black">CareGuarantee™</span>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
