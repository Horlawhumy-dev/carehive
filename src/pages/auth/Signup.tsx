import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'client' | 'pro' | null>(null);
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-2xl p-10 md:p-16 rounded-[4rem] border-none bg-white/40 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.04)] relative z-10 overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-surface-container-low overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-700 ease-out" 
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        {step === 1 ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface italic">Join the Hive.</h1>
              <p className="text-sm text-on-surface-variant font-medium">Choose how you'll be using the platform today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setRole('client')}
                className={cn(
                  "p-8 rounded-[3rem] border-2 cursor-pointer transition-all duration-500 relative group",
                  role === 'client' ? "border-primary bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]" : "border-transparent bg-white/50 text-on-surface hover:bg-white hover:shadow-xl"
                )}
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all", role === 'client' ? "bg-white/20" : "bg-primary/5 text-primary group-hover:scale-110")}>
                  <User className="w-8 h-8" />
                </div>
                {role === 'client' && <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-primary" /></div>}
                <h3 className="text-xl font-black italic tracking-tight mb-2">Household </h3>
                <p className="text-[0.75rem] font-bold opacity-70 leading-relaxed uppercase tracking-widest mb-4">Requesting Care</p>
                <p className={cn("text-xs font-medium leading-relaxed", role === 'client' ? "opacity-80" : "text-on-surface-variant")}>
                  Manage your home, schedule sessions, and connect with elite local experts.
                </p>
              </div>

              <div 
                onClick={() => setRole('pro')}
                className={cn(
                  "p-8 rounded-[3rem] border-2 cursor-pointer transition-all duration-500 relative group",
                  role === 'pro' ? "border-primary bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]" : "border-transparent bg-white/50 text-on-surface hover:bg-white hover:shadow-xl"
                )}
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all", role === 'pro' ? "bg-white/20" : "bg-primary/5 text-primary group-hover:scale-110")}>
                  <ShieldCheck className="w-8 h-8" />
                </div>
                {role === 'pro' && <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-primary" /></div>}
                <h3 className="text-xl font-black italic tracking-tight mb-2">Professional</h3>
                <p className="text-[0.75rem] font-bold opacity-70 leading-relaxed uppercase tracking-widest mb-4">Providing Care</p>
                <p className={cn("text-xs font-medium leading-relaxed", role === 'pro' ? "opacity-80" : "text-on-surface-variant")}>
                  Grow your business, access verified clients, and manage your digital workspace.
                </p>
              </div>
            </div>

            <Button 
              disabled={!role}
              onClick={() => setStep(2)}
              className="w-full h-16 primary-gradient text-white rounded-[2rem] font-black text-[0.8rem] uppercase tracking-widest shadow-xl shadow-primary/20 group overflow-hidden relative active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue to Details
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface italic">Tell us about you.</h1>
              <p className="text-sm text-on-surface-variant font-medium uppercase tracking-widest">{role === 'client' ? 'Household Profile' : 'Professional Application'}</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 font-medium" />
                <Input placeholder="Last Name" className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 font-medium" />
              </div>
              <Input placeholder="Email Address" type="email" className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 font-medium" />
              <Input placeholder="Create Password" type="password" className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 font-medium" />
              
              <div className="pt-4">
                <p className="text-[0.65rem] text-on-surface-variant text-center opacity-60 leading-relaxed font-bold uppercase tracking-widest">
                  By joining, you agree to the CareHive terms of precision and privacy protocols.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <Button 
                  onClick={() => navigate(role === 'client' ? '/household' : '/worker-dashboard')} 
                  className="w-full h-16 primary-gradient text-white rounded-[2rem] font-black text-[0.85rem] uppercase tracking-widest shadow-xl shadow-primary/20 group relative overflow-hidden"
                >
                  Complete Registration
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost" onClick={() => setStep(1)} className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-40 hover:opacity-100">
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center border-t border-border/10 pt-8">
           <p className="text-sm text-on-surface-variant font-medium">
            Already have an account? {' '}
            <button onClick={() => navigate('/login')} className="text-primary font-bold italic hover:underline">Sign in instead</button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
