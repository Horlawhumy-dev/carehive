import { Search, Sparkles, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { icon: '🧹', label: 'Cleaning', color: 'bg-indigo-50' },
  { icon: '👶', label: 'Nanny', color: 'bg-orange-50' },
  { icon: '🍳', label: 'Cooking', color: 'bg-green-50' },
  { icon: '👴', label: 'Caregiver', color: 'bg-blue-50' },
];

const TOP_RATED = [
  {
    id: 1,
    name: 'Akua Mensah',
    service: 'Expert Nanny',
    exp: '5 yrs exp.',
    price: '₵45',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC5aeX-koDj6sHeiPjvWOJd9cXOqxY17hGJGBgZmb7JPHuxW25IgzpdXN3L5dQ4lkO2aE1YqYu-WmTlFGFmXMFBuYvaFI3cqgVSooM1SjYWxP_-GA6dYdAuziQhwdLWWdnzDVW1au21M_RPSNOKyaTAyTqJPnMMwXdZgWhtTkvjTcXwrfe9kRDYVxRpV3m5RGnG0d-cU1ueLsFA-jCEn3a5lZqW1IonFd0RFQQOZOyIc_NvHO7YjT94FBqtXe4Tj27-u5Ov3Mt60I'
  },
  {
    id: 2,
    name: 'Adjoa Appiah',
    service: 'Home Chef',
    exp: 'Local Delicacies',
    price: '₵60',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS_Ww88E7Ym0w-m46A-I-f9O7mE5A5v6M-D5O6-X-J-z=s1024'
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-20">
      {/* Greeting & Search */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Welcome back, User 👋</h2>
          <p className="text-sm text-on-surface-variant font-medium mt-1">What can we help you with today?</p>
        </div>
        <div className="relative group w-full md:max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-outline" />
          </div>
          <Input 
            className="h-14 pl-12 pr-4 bg-surface-container-low border-none rounded-2xl placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-sm" 
            placeholder="Search for cleaning, nanny..." 
          />
        </div>
      </section>

      {/* Grid Layout for Featured & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Banner (Spans 2 columns on large screens) */}
        <section className="lg:col-span-2">
          <div className="relative w-full h-56 md:h-64 rounded-[2.5rem] overflow-hidden bg-primary p-8 flex flex-col justify-center shadow-2xl shadow-primary/20 group">
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden opacity-30">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
                alt="Promo"
              />
            </div>
            <div className="relative z-10 max-w-[70%] space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xl text-white text-[0.65rem] font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Featured
              </div>
              <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight tracking-tight italic">Professional house care <br/> at 20% off.</h3>
              <Button size="lg" onClick={() => navigate('/listing')} className="bg-white text-primary hover:bg-slate-50 rounded-xl font-bold px-8 shadow-lg">Claim Now</Button>
            </div>
          </div>
        </section>

        {/* Vertical Service Categories for Desktop / Horizontal for Mobile */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
             <h3 className="font-bold text-xs text-on-surface-variant uppercase tracking-widest leading-none">Categories</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
             {CATEGORIES.map((cat) => (
               <div key={cat.label} className="group cursor-pointer" onClick={() => navigate('/listing')}>
                 <div className="aspect-square rounded-[2rem] bg-surface-container-low flex flex-col items-center justify-center gap-3 transition-all group-hover:bg-primary/5 group-hover:shadow-lg active:scale-95 border border-transparent group-hover:border-primary/10">
                   <div className="text-4xl transform group-hover:scale-110 transition-transform">
                     {cat.icon}
                   </div>
                   <span className="text-[0.7rem] font-bold text-on-surface-variant group-hover:text-primary uppercase tracking-widest">{cat.label}</span>
                 </div>
               </div>
             ))}
           </div>
        </section>
      </div>

      {/* Top Rated Grid */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-on-surface uppercase italic">Elite Professionals</h2>
            <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-widest">Top-rated cleaners & nannies nearby</p>
          </div>
          <Button variant="link" onClick={() => navigate('/listing')} className="text-primary font-bold uppercase tracking-widest text-xs hover:no-underline">See All Experts →</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOP_RATED.map((worker) => (
            <Card key={worker.id} onClick={() => navigate(`/worker/${worker.id}`)} className="bg-surface-container-lowest rounded-[2.5rem] p-6 flex flex-col gap-6 border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(83,65,205,0.08)] transition-all group border border-transparent hover:border-primary/5 cursor-pointer">
              <div className="relative h-48 rounded-[2rem] overflow-hidden">
                <img src={worker.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={worker.name} />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  <span className="text-[0.8rem] font-black text-on-surface">{worker.rating}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-on-surface text-lg tracking-tight">{worker.name}</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wide">{worker.service} • {worker.exp}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/10">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] text-on-surface-variant uppercase font-bold tracking-widest mb-1 leading-none">Hourly Rate</span>
                    <span className="text-primary font-extrabold text-xl tracking-tighter leading-none">{worker.price}<span className="text-xs font-bold text-on-surface-variant">/hr</span></span>
                  </div>
                  <Button className="bg-primary hover:bg-primary-container text-white px-6 h-10 rounded-xl text-[0.65rem] font-bold shadow-md shadow-primary/10 active:scale-95 transition-transform uppercase tracking-widest leading-none" onClick={(e) => { e.stopPropagation(); navigate(`/worker/${worker.id}`); }}>
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
