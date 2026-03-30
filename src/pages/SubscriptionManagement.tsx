import { CheckCircle2, Calendar, RefreshCw, ArrowUpCircle, Leaf, Key, Bell, Star, Settings, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter text-on-surface leading-tight italic">My Care Plan.</h1>
          <p className="text-on-surface-variant font-medium mt-1">Status: Elite Plus Member</p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-[0.65rem] uppercase tracking-widest border-border/10" onClick={() => navigate('/subscription-customize')}>
              <Settings className="w-4 h-4 mr-2" />
              Modify Schedule
           </Button>
           <Button className="h-11 px-8 primary-gradient text-white rounded-xl font-bold text-[0.65rem] uppercase tracking-widest shadow-lg shadow-primary/10" onClick={() => navigate('/subscription-plans')}>
              <CreditCard className="w-4 h-4 mr-2" />
              Upgrade Plan
           </Button>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Active Plan & Pro */}
        <div className="lg:col-span-8 space-y-12">
          {/* Active Plan Card */}
          <section>
            <Card className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700"></div>
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                  <Badge className="bg-white/20 text-white border-none font-black text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 mb-6">Subscription: Active</Badge>
                  <h2 className="text-[3.5rem] font-black tracking-tighter leading-none italic mb-4">Full House Care</h2>
                  <p className="text-xl font-bold opacity-70">Weekly Premium Cleaning • ₵1,200/mo</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-6 rounded-[2rem] backdrop-blur-xl border border-white/5 relative z-10">
                 <Calendar className="w-6 h-6 text-white/60" />
                 <div>
                    <p className="text-[0.7rem] font-black opacity-60 uppercase tracking-widest">Next Scheduled Visit</p>
                    <p className="text-lg font-bold">Tomorrow, March 31 • 09:00 AM - 12:00 PM</p>
                 </div>
              </div>
            </Card>
          </section>

          {/* Assigned Professional */}
          <section className="space-y-8">
            <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Your Dedicated Professional</h3>
            <Card className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-transparent hover:border-primary/10 transition-all flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                  <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-md"></div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[0.7rem] font-black text-primary uppercase tracking-[0.2em] mb-2">Verified Elite Provider</p>
                <h4 className="font-black text-[1.5rem] text-on-surface tracking-tight mb-2 italic">Mavis Appiah</h4>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    <span className="text-sm font-black text-on-surface">4.9</span>
                  </div>
                  <Badge className="bg-surface-container-high text-on-surface-variant border-none font-bold text-[0.6rem] uppercase tracking-widest px-3 py-1">124 COMPLETED JOBS</Badge>
                </div>
              </div>
              <div className="flex gap-3">
                 <Button variant="outline" className="h-12 w-12 rounded-xl border-border/20 p-0 text-on-surface-variant hover:bg-surface-container-low">
                   <Bell className="w-5 h-5" />
                 </Button>
                 <Button className="h-14 primary-gradient text-white rounded-xl font-black text-[0.7rem] uppercase tracking-widest px-8 shadow-lg shadow-primary/20">Chat with Mavis</Button>
              </div>
            </Card>
          </section>

          {/* Plan Details */}
          <section className="space-y-6">
             <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Preferences & Security</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Eco-Products Only", desc: "Using 100% biodegradable solutions for all sessions.", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-50" },
                  { title: "Smart Access Key", desc: "Temporary 48h code enabled for front gate entries.", icon: Key, color: "text-blue-500", bg: "bg-blue-50" }
                ].map((item) => (
                  <Card key={item.title} className="p-6 rounded-[2rem] border-none bg-surface-container-low flex items-start gap-5">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0", item.bg, item.color)}>
                       <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="font-black text-on-surface text-[1rem] mb-1">{item.title}</p>
                       <p className="text-[0.8rem] text-on-surface-variant font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </Card>
                ))}
             </div>
          </section>
        </div>

        {/* Right: Quick Controls & Perks */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-surface-container-low p-8 rounded-[2.5rem] border-none shadow-none space-y-8">
              <h3 className="font-black text-xs text-primary uppercase tracking-[0.3em]">Plan Controls</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Schedule', icon: RefreshCw },
                   { label: 'History', icon: Calendar },
                   { label: 'Upgrade', icon: ArrowUpCircle },
                   { label: 'Support', icon: Bell }
                 ].map((ctrl) => (
                   <Button key={ctrl.label} variant="outline" className="h-24 flex flex-col gap-2 rounded-[1.5rem] border-border/10 bg-white hover:bg-primary/5 hover:border-primary/20 transition-all group p-0">
                      <ctrl.icon className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
                      <span className="text-[0.6rem] font-black uppercase tracking-widest text-on-surface-variant">{ctrl.label}</span>
                   </Button>
                 ))}
              </div>
              <Button className="w-full h-14 rounded-2xl primary-gradient text-white font-black text-[0.7rem] uppercase tracking-widest shadow-lg shadow-primary/20">Upgrade to Elite</Button>
           </Card>

           {/* Membership Perks */}
           <Card className="bg-primary p-8 rounded-[3rem] border-none shadow-2xl shadow-primary/20 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400')] opacity-10 grayscale mix-blend-overlay"></div>
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-none font-black text-[0.5rem] tracking-[0.3em] uppercase px-3 py-1 mb-6">VIP PERKS</Badge>
                <h4 className="text-2xl font-black italic tracking-tighter mb-4">Elite Access Enabled.</h4>
                <p className="text-[0.85rem] font-bold opacity-80 leading-relaxed mb-6">You've unlocked 24/7 dedicated support and prioritized booking slots.</p>
              </div>
              <Button variant="outline" className="w-full h-14 rounded-2xl border-white/20 text-white font-black text-[0.7rem] uppercase tracking-widest hover:bg-white/10 relative z-10">
                 Explore VIP Lounge
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
