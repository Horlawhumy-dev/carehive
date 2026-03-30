import { useState, useEffect } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const TopAppBar = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      } else {
        setUserMetadata(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getInitials = () => {
    if (!userMetadata) return 'JD';
    const first = userMetadata.first_name?.[0] || '';
    const last = userMetadata.last_name?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed out successfully.');
      setShowLogoutModal(false);
      navigate('/login');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md shadow-sm border-b border-border/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="font-black italic text-xl">CH</span>
          </div>
          <span className="text-primary font-black tracking-tighter text-2xl hidden sm:block">CareHive</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          <button
            onClick={() => navigate('/listing')}
            className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-on-surface/30 hover:text-primary transition-colors cursor-pointer"
          >
            Services
          </button>
          
          {userMetadata?.role === 'pro' ? (
            <>
              <button
                onClick={() => navigate('/worker-dashboard')}
                className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-on-surface/30 hover:text-primary transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/earnings')}
                className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-on-surface/30 hover:text-primary transition-colors cursor-pointer"
              >
                Earnings
              </button>
            </>
          ) : userMetadata?.role === 'client' ? (
            <>
              <button
                onClick={() => navigate('/household')}
                className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-on-surface/30 hover:text-primary transition-colors cursor-pointer"
              >
                My Home
              </button>
              <button
                onClick={() => navigate('/subscription-plans')}
                className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-on-surface/30 hover:text-primary transition-colors cursor-pointer"
              >
                Plan
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/trust')}
              className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-on-surface/30 hover:text-primary transition-colors cursor-pointer"
            >
              Trust
            </button>
          )}
        </nav>

        {/* Action Section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-on-surface/70 rounded-full bg-surface-container-low w-12 h-12 border-none bg-surface-container-low">
            <Bell className="w-6 h-6" />
          </Button>

          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border/20">
            {!session ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="font-bold text-on-surface-variant uppercase tracking-widest text-[0.6rem] bg-transparent"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="primary-gradient text-white font-bold uppercase tracking-widest text-[0.6rem] px-6 h-10 rounded-xl shadow-lg shadow-primary/10 active:scale-95 transition-transform"
                >
                  Join CareHive
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 pl-2">
                  <Avatar className="w-10 h-10 rounded-xl border border-primary/10 shadow-sm">
                    <AvatarImage src={userMetadata?.avatar_url} />
                    <AvatarFallback className="bg-primary/5 text-primary font-black italic text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start -space-y-1">
                    <span className="text-[0.65rem] font-black italic text-on-surface tracking-tight">
                      {userMetadata?.first_name || 'Guest'}
                    </span>
                    <span className="text-[0.55rem] font-bold text-on-surface/40 uppercase tracking-[0.15em]">
                      {userMetadata?.role === 'pro' ? 'Professional' : 'Household'}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-error/60 transition-colors rounded-full bg-error/5 w-10 h-10 border-none hover:bg-error/5"
                  title="Log Out"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
            onClick={() => setShowLogoutModal(false)}
          ></div>
          <div className="bg-white/95 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_80px_200px_rgba(0,0,0,0.15)] max-w-[400px] w-full relative z-[110] text-center space-y-8 border border-white/40 animate-in zoom-in-95 fade-in duration-300">
            <div className="w-20 h-20 rounded-[2rem] bg-error/10 flex items-center justify-center text-error mx-auto shadow-inner">
              <LogOut className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic text-on-surface tracking-tighter">Sign Out?</h3>
              <p className="text-sm text-on-surface-variant font-medium">You are about to end your current session on CareHive.</p>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={confirmLogout}
                className="w-full h-14 bg-error text-white font-black italic uppercase tracking-widest text-[0.8rem] rounded-2xl shadow-2xl shadow-error/20 active:scale-95 transition-transform"
              >
                Confirm Logout
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowLogoutModal(false)}
                className="w-full h-14 font-bold text-on-surface/40 uppercase tracking-widest text-[0.7rem] rounded-2xl transition-colors bg-surface-container-low hover:bg-surface-container-low"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopAppBar;
