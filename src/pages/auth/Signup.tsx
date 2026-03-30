import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowRight, Check, Sparkles, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'client' | 'pro' | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.firstName) {
      toast.error('Required fields missing.');
      return;
    }

    if (role === 'pro' && formData.gender !== 'female') {
      toast.error('CareHive currently only accepts female professionals.');
      return;
    }

    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions to continue.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          role: role,
          gender: formData.gender
        }
      }
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success('Registration successful. Welcome to CareHive.');
      setTimeout(() => navigate(role === 'client' ? '/household' : '/worker-dashboard'), 1000);
    }
  };

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
                  "p-8 rounded-[3rem] border-2 cursor-pointer transition-all duration-500 relative group overflow-hidden",
                  role === 'pro' ? "border-primary bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]" : "border-transparent bg-white/50 text-on-surface hover:bg-white hover:shadow-xl"
                )}
              >
                <div className="absolute -top-2 -right-4 w-24 h-10 bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center rotate-12 group-hover:rotate-6 transition-transform">
                  <span className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-secondary">Female Only</span>
                </div>
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all", role === 'pro' ? "bg-white/20" : "bg-primary/5 text-primary group-hover:scale-110")}>
                  <ShieldCheck className="w-8 h-8" />
                </div>
                {role === 'pro' && <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-primary" /></div>}
                <h3 className="text-xl font-black italic tracking-tight mb-2">Female Professional</h3>
                <p className="text-[0.75rem] font-bold opacity-70 leading-relaxed uppercase tracking-widest mb-4">Providing Care</p>
                <p className={cn("text-xs font-medium leading-relaxed", role === 'pro' ? "opacity-80" : "text-on-surface-variant")}>
                  Join our exclusive community of female experts. Grow your business and manage your digital workspace.
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
          <form onSubmit={handleSignup} className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface italic">Tell us about you.</h1>
              <p className="text-sm text-on-surface-variant font-medium uppercase tracking-widest">{role === 'client' ? 'Household Profile' : 'Professional Application'}</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name" 
                  className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 font-medium" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                <Input 
                  placeholder="Last Name" 
                  className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 font-medium" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <Input 
                placeholder="Email Address" 
                type="email" 
                className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 font-medium" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />

              {role === 'pro' && (
                <div className="space-y-2">
                  <Select onValueChange={(val: string) => setFormData({...formData, gender: val})}>
                    <SelectTrigger className="h-14 rounded-2xl bg-surface-container-low border-none shadow-sm focus:ring-2 focus:ring-primary/10 px-6 font-medium">
                      <SelectValue placeholder="Identify your Gender" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl z-[1001]">
                      <SelectItem value="female">Female Professional</SelectItem>
                      <SelectItem value="male">Male (Not currently supported)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[0.6rem] text-primary font-bold px-2 uppercase tracking-tight text-left">Professional service is exclusive to females.</p>
                </div>
              )}
              <div className="relative group">
                <Input 
                  placeholder="Create Password" 
                  type={showPassword ? "text" : "password"} 
                  className="h-14 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all px-6 pr-12 font-medium w-full" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="pt-2 flex items-start gap-3 group cursor-pointer" onClick={() => setTermsAccepted(!termsAccepted)}>
                <div className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all mt-0.5",
                  termsAccepted ? "bg-primary border-primary text-white" : "border-outline group-hover:border-primary/50"
                )}>
                  {termsAccepted && <Check className="w-3 h-3 stroke-[4]" />}
                </div>
                <p className="text-[0.65rem] text-on-surface-variant leading-relaxed font-bold uppercase tracking-widest text-left">
                  I agree to the <button onClick={(e) => { e.stopPropagation(); navigate('/trust'); }} className="text-primary hover:underline italic">Terms of Precision</button> and <button onClick={(e) => { e.stopPropagation(); navigate('/trust'); }} className="text-primary hover:underline italic">Privacy Protocols</button>.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <Button 
                  disabled={loading}
                  type="submit"
                  className="w-full h-16 primary-gradient text-white rounded-[2rem] font-black text-[0.85rem] uppercase tracking-widest shadow-xl shadow-primary/20 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                    ) : (
                      <>Complete Registration <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </span>
                </Button>
                <Button variant="ghost" onClick={() => setStep(1)} className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant opacity-40 hover:opacity-100">
                  Go Back
                </Button>
              </div>
            </div>
          </form>
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
