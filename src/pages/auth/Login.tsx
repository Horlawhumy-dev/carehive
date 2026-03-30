import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Globe, Share2, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success('Access granted. Welcome back.');
      // Simulating a small delay for a premium feel
      setTimeout(() => navigate('/household'), 1000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-md p-10 rounded-[3rem] border-none bg-white/40 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.04)] relative z-10">
        <div className="space-y-8 text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[2rem] bg-primary text-white shadow-2xl shadow-primary/20 mb-4 animate-in fade-in zoom-in duration-700">
             <span className="font-black italic text-2xl">CH</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-on-surface italic">Welcome back.</h1>
            <p className="text-sm text-on-surface-variant font-medium mt-2">Enter your credentials to access your household.</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="h-14 pl-12 pr-12 rounded-2xl bg-surface-container-low border-none placeholder:text-outline focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline active:scale-95 transition-all">Forgot Password?</button>
          </div>

          <Button 
            disabled={loading}
            type="submit"
            className="w-full h-14 primary-gradient text-white rounded-2xl font-black text-[0.8rem] uppercase tracking-widest shadow-xl shadow-primary/20 group overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>Authenticating <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </span>
          </Button>
        </form>

        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/10"></div>
          </div>
          <div className="relative flex justify-center text-[0.6rem] font-black uppercase tracking-[0.3em] text-on-surface-variant">
            <span className="bg-white/40 px-4 backdrop-blur-sm">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 rounded-xl border-border/10 font-bold text-[0.65rem] uppercase tracking-widest hover:bg-surface-container-low transition-colors">
            <Globe className="w-4 h-4 mr-2" />
            Google
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-border/10 font-bold text-[0.65rem] uppercase tracking-widest hover:bg-surface-container-low transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            Twitter
          </Button>
        </div>

        <p className="text-center text-sm text-on-surface-variant font-medium pt-8">
          New to CareHive? {' '}
          <button onClick={() => navigate('/signup')} className="text-primary font-bold italic hover:underline">Create an account</button>
        </p>
      </Card>
    </div>
  );
};

export default Login;
