import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TopAppBar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md shadow-sm border-b border-border/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="font-black italic text-xl">CH</span>
            </div>
            <span className="text-primary font-black tracking-tighter text-2xl hidden sm:block">CareHive</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Button variant="ghost" onClick={() => navigate('/listing')} className="font-bold text-on-surface/70 hover:text-primary transition-colors uppercase tracking-widest text-[0.65rem]">Services</Button>
            <Button variant="ghost" onClick={() => navigate('/household')} className="font-bold text-on-surface/70 hover:text-primary transition-colors uppercase tracking-widest text-[0.65rem]">My Home</Button>
            <Button variant="ghost" onClick={() => navigate('/worker-dashboard')} className="font-bold text-on-surface/70 hover:text-primary transition-colors uppercase tracking-widest text-[0.65rem]">Dashboard</Button>
            <Button variant="ghost" onClick={() => navigate('/earnings')} className="font-bold text-on-surface/70 hover:text-primary transition-colors uppercase tracking-widest text-[0.65rem]">Financials</Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-on-surface/70 hover:text-primary rounded-full md:bg-surface-container-low md:w-12 md:h-12">
            <Bell className="w-6 h-6" />
          </Button>
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border/20">
             <Button 
               variant="ghost" 
               onClick={() => navigate('/login')}
               className="font-bold text-on-surface-variant hover:text-primary uppercase tracking-widest text-[0.6rem]"
             >
               Sign In
             </Button>
             <Button 
               onClick={() => navigate('/signup')}
               className="primary-gradient text-white font-bold uppercase tracking-widest text-[0.6rem] px-6 h-10 rounded-xl shadow-lg shadow-primary/10 active:scale-95 transition-transform"
             >
               Join CareHive
             </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
