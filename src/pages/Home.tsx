import { Sparkles, Star, LayoutDashboard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Hardcoded categories remain for now as they are static service types
const CATEGORIES = [
  { icon: '🧹', label: 'Cleaning', color: 'bg-indigo-50' },
  { icon: '👶', label: 'Nanny', color: 'bg-orange-50' },
  { icon: '🍳', label: 'Chef', color: 'bg-green-50' },
  { icon: '👴', label: 'Caregiver', color: 'bg-blue-50' },
];

const Home = () => {
  const navigate = useNavigate();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInitialData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      } else {
        setUserMetadata(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      }

      // Fetch top rated professionals
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'pro')
        .eq('is_profile_completed', true)
        .limit(3);

      if (error) throw error;

      setTopRated((data || []).map(w => ({
        ...w,
        id: w.user_id || w.id,
        name: `${w.first_name} ${w.last_name}`,
        service: w.service_type,
        exp: `${w.years_exp} yrs exp.`,
        price: `₵${w.hourly_rate}`,
        rating: '4.9',
        image: w.avatar_url || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000'
      })));
    } catch (err: any) {
      console.error('Error fetching home data:', err);
      toast.error('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Redirect to listing page with search query
    navigate('/listing', { state: { initialSearch: searchQuery } });
  };

  const isPro = userMetadata?.role === 'pro';

  return (
    <div className="space-y-12 pb-20">
      {/* Greeting & Search */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">
            {isPro ? `Ready to work, ${userMetadata?.first_name || 'Pro'}?` : `Akwaaba ${userMetadata?.first_name || ''} 👋`}
          </h2>
          <p className="text-sm text-on-surface-variant font-medium mt-1">
            {isPro ? 'Check your pending opportunities and earnings below.' : 'What can we help you with today?'}
          </p>
        </div>
        {!isPro && (
          <form onSubmit={handleAiSearch} className="relative group w-full md:max-w-md">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-focus-within:bg-primary/10 transition-all"></div>
            <div className="relative flex items-center bg-surface-container-low rounded-2xl border border-transparent focus-within:border-primary/20 transition-all shadow-sm">
              <div className="w-12 h-14 flex items-center justify-center text-outline group-focus-within:text-primary transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <Input
                className="h-14 flex-1 bg-transparent border-none rounded-none placeholder:text-outline focus:ring-0 outline-none pr-4 font-medium"
                placeholder="Ask AI for any professional..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                className="h-14 px-4 hover:bg-transparent text-primary hover:text-primary/70 font-black italic uppercase tracking-widest text-[0.6rem]"
              >
                Match
              </Button>
            </div>
          </form>
        )}
      </section>

      {isPro ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 rounded-[2.5rem] bg-surface-container-low border-none shadow-xl shadow-black/5 flex flex-col justify-between h-64 cursor-pointer hover:bg-surface-container-high transition-all" onClick={() => navigate('/worker-dashboard')}>
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black italic text-on-surface tracking-tighter">Your Dashboard</h3>
              <p className="text-sm text-on-surface-variant font-medium opacity-70">Review new jobs and update your schedule.</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[0.65rem]">
              Go to Dashboard →
            </div>
          </Card>
          <Card className="p-8 rounded-[2.5rem] bg-indigo-600 border-none shadow-xl shadow-indigo-600/20 flex flex-col justify-between h-64 cursor-pointer hover:bg-indigo-700 transition-all text-white" onClick={() => navigate('/earnings')}>
            <div className="space-y-4 text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Star className="w-7 h-7 fill-white" />
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter">Professional Earnings</h3>
              <p className="text-sm text-white/70 font-medium">Track your income and payment history.</p>
            </div>
            <div className="flex items-center gap-2 font-black uppercase tracking-[0.2em] text-[0.65rem] text-white/90">
              View Earnings →
            </div>
          </Card>
        </section>
      ) : (
        <>
          {/* Grid Layout for Featured & Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Banner */}
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
                  <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight tracking-tight italic">Professional house care <br /> at 20% off.</h3>
                  <Button size="lg" onClick={() => navigate('/listing')} className="bg-white text-primary hover:bg-slate-50 rounded-xl font-bold px-8 shadow-lg">Claim Now</Button>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-xs text-on-surface-variant uppercase tracking-widest leading-none">Categories</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.label} className="group cursor-pointer" onClick={() => navigate('/listing', { state: { initialCategory: cat.label } })}>
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
              {loading ? (
                [1, 2, 3].map((n) => (
                  <div key={n} className="h-64 rounded-[2.5rem] bg-surface-container-low animate-pulse" />
                ))
              ) : topRated.length > 0 ? (
                topRated.map((worker) => (
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
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-on-surface-variant italic font-medium">
                  No professional slots currently available.
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
