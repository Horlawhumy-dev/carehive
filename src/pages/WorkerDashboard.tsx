import { Wallet, TrendingUp, Clock, CheckCircle2, MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const REQUESTS = [
  {
    id: 1,
    customer: 'Kofi Mensah',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCv0FUaOBP_FIXkXxi0gS0aCWwlDbpC1iycimN63kv_DL-oeGNpL5u4M8T-ehF3_tmhm5F4sM46fAOWuQn8qEZHuGRhgzP0D_dV2kBtD4NPTwf1tQCA9DY0wlTzk76J0sJnA7haab8-Zi203odJu7Kx6rehDsHlV8YAMCKYp8APPuwOjNWlqsGb4P1da5-wjxLl-W53AI4p122eclNb1Fu6Ub-_W5bI5F31LDOZnQY6-rqT5SL2urq_uDbROIBuFv9fiYrvfEPCM',
    dist: '2.4 km away',
    price: '₵180.00',
    type: 'Deep Cleaning',
    time: '14:00 - 16:30',
    date: 'Today'
  },
  {
    id: 2,
    customer: 'Abena Sarfo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5vukOfKARgNGEiJk2rrX3M1FX_es7r90MjjoZQIaTbc3uGiGSFikEZTVrhFsaGX8-gvphuRSZ9ACvqScFqyp58tBHl0VTsiJ07QILuoUBK3hk0tRhXtwLud1IxyegLrWCegTy2uGEPWE2dVCPRY0rvqDVQxq3W2kNCvXTUamJmqYDqaiQceyfhVewUbvo6Gag-lIBJFWYSVc8O0RvnuwibJvXrvtivBtcAKbYC_CuLUKUlmtcjJo7XHLC-MQLOejMDrefghvAskA',
    dist: '5.1 km away',
    price: '₵120.00',
    type: 'Laundry Service',
    time: '09:00 - 11:00',
    date: 'Tomorrow'
  }
];

const WorkerDashboard = () => {
  return (
    <div className="min-h-screen bg-surface p-6 md:p-12">
      <div className="space-y-10 pb-20">
        {/* Header Info - Desktop Friendly */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
          <div className="flex items-center gap-5">
             <Avatar className="w-16 h-16 border-4 border-surface shadow-xl">
               <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Mavis" />
               <AvatarFallback>MA</AvatarFallback>
             </Avatar>
             <div>
               <Badge className="bg-primary/5 text-primary border-none font-black text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 mb-2">Verified Professional</Badge>
               <h1 className="text-[2.5rem] font-black tracking-tighter text-on-surface leading-none italic">Welcome, Mavis Appiah.</h1>
             </div>
          </div>
          <div className="flex items-center gap-4">
           <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-[0.65rem] uppercase tracking-widest border-border/10" onClick={() => console.log('Navigating to financials')}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Financials
           </Button>
           <Button className="h-11 px-8 primary-gradient text-white rounded-xl font-bold text-[0.65rem] uppercase tracking-widest shadow-lg shadow-primary/10" onClick={() => console.log('Go Online')}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Go Online
           </Button>
        </div>
        </section>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Earnings & Job Feed */}
          <div className="lg:col-span-8 space-y-12">
            {/* Earnings Bento Card */}
            <section>
              <Card className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden border-none group">
                <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700"></div>
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div>
                    <p className="text-[0.7rem] font-black opacity-80 uppercase tracking-[0.3em] mb-2">Revenue Dashboard</p>
                    <h2 className="text-[3.5rem] font-black tracking-tighter leading-none italic">₵4,850.00</h2>
                    <p className="text-[0.8rem] font-bold opacity-70 mt-2 tracking-wide">+12% from last month</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/10">
                    <Wallet className="w-10 h-10" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {[
                    { label: "Today's Take", val: "₵420.00", icon: TrendingUp },
                    { label: "Weekly Goal", val: "85%", icon: CheckCircle2 },
                    { label: "Hours Logged", val: "32.5h", icon: Clock },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 p-5 rounded-[1.5rem] backdrop-blur-xl border border-white/5">
                      <p className="text-[0.6rem] font-black opacity-70 tracking-widest uppercase mb-1">{item.label}</p>
                      <p className="text-xl font-black">{item.val}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Job Feed */}
            <section className="space-y-8">
              <div className="flex items-center justify-between border-b border-border/10 pb-6">
                 <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Pending Opportunities</h3>
                 <Badge className="bg-secondary text-white font-black text-[0.6rem] px-3 py-1 rounded-full uppercase tracking-widest">3 New Alerts</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REQUESTS.map((req) => (
                  <Card key={req.id} className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-transparent hover:border-primary/10 transition-all group overflow-hidden">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-4">
                        <Avatar className="w-14 h-14 rounded-2xl shadow-lg shadow-black/5">
                          <AvatarImage src={req.image} alt={req.customer} />
                          <AvatarFallback>{req.customer[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-black text-[1.1rem] text-on-surface tracking-tight">{req.customer}</h4>
                          <p className="text-on-surface-variant text-[0.7rem] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            {req.dist}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                       <div className="flex items-center justify-between py-3 border-y border-border/5">
                          <span className="text-[0.7rem] font-black text-on-surface-variant uppercase tracking-widest">Job Category</span>
                          <span className="text-[0.8rem] font-black text-primary uppercase tracking-widest">{req.type}</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-[0.7rem] font-black text-on-surface-variant uppercase tracking-widest">Schedule</span>
                          <span className="text-[0.8rem] font-bold text-on-surface">{req.time}</span>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="ghost" className="h-12 bg-surface-container-low text-on-surface-variant hover:bg-red-50 hover:text-red-500 rounded-xl font-black text-[0.7rem] uppercase tracking-widest border-none transition-colors">Decline</Button>
                      <Button className="h-12 primary-gradient text-white rounded-xl font-black text-[0.7rem] uppercase tracking-widest border-none shadow-lg shadow-primary/20">Accept Job</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Quick Stats & Activity */}
          <div className="lg:col-span-4 space-y-8">
             <Card className="bg-surface-container-low p-8 rounded-[2.5rem] border-none shadow-none space-y-8">
                <h3 className="font-black text-xs text-primary uppercase tracking-[0.3em]">Performance Insights</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Avg Rating', val: '4.9', sub: 'Last 30 days', icon: Star, color: 'text-secondary' },
                    { label: 'Reliability', val: '98%', sub: 'No cancellations', icon: CheckCircle2, color: 'text-primary' },
                    { label: 'Profile Views', val: '1.2k', sub: 'High demand', icon: TrendingUp, color: 'text-indigo-400' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4 group">
                      <div className={cn("w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", stat.color)}>
                         <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-[0.7rem] font-black text-on-surface-variant uppercase tracking-widest mb-0.5">{stat.label}</p>
                         <p className="text-[1.1rem] font-black text-on-surface leading-none">{stat.val}<span className="text-[0.7rem] font-bold ml-2 opacity-40">{stat.sub}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full h-14 rounded-2xl border-border/20 text-on-surface-variant font-black text-[0.7rem] uppercase tracking-widest hover:bg-surface-container-high">Download Tax Report</Button>
             </Card>

             <Card className="bg-surface-container-highest p-8 rounded-[2.5rem] border-none shadow-none text-white relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h3 className="font-black text-xs uppercase tracking-[0.3em] opacity-60">Elite Bonus</h3>
                  <p className="text-xl font-black italic">You are in the top 5% of providers this week!</p>
                  <div className="w-full bg-white/20 h-2 mt-4 rounded-full overflow-hidden">
                     <div className="bg-white h-full w-[92%]"></div>
                  </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
