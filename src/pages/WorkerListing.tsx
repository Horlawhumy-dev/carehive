import { useState, useEffect } from 'react';
import { Star, ShieldCheck, Filter, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const WorkerListing = () => {
  const navigate = useNavigate();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchWorkers();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.user_metadata) {
        setUserMetadata(session.user.user_metadata);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'pro')
        .eq('is_profile_completed', true);

      if (error) {
        toast.error('Error fetching professionals: ' + error.message);
      } else {
        const mappedWorkers = (data || []).map(w => ({
          ...w,
          id: w.user_id || w.id,
          name: `${w.first_name} ${w.last_name}`,
          service: w.service_type,
          exp: `${w.years_exp} yrs exp.`,
          price: `₵${w.hourly_rate}`,
          rating: '4.9',
          verified: true,
          image: w.avatar_url || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop'
        }));
        setWorkers(mappedWorkers);
        setFilteredWorkers(mappedWorkers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredWorkers(workers);
    } else {
      setFilteredWorkers(workers.filter(w => w.service_type === activeCategory));
    }
  }, [activeCategory, workers]);

  const isPro = userMetadata?.role === 'pro';

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 pt-10 max-w-7xl mx-auto w-full">
        <div className="space-y-10 pb-20">
          {/* Header & Filter Stats */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/10 pb-10">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter text-on-surface leading-tight italic">Find a Professional</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-xl border-border/10 font-bold text-[0.65rem] uppercase tracking-widest px-5 h-10 hover:bg-surface-container-low transition-colors">
                <Filter className="w-3.5 h-3.5 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="rounded-xl border-border/10 font-bold text-[0.65rem] uppercase tracking-widest px-5 h-10 hover:bg-surface-container-low transition-colors">
                Sort: Rated
              </Button>
            </div>
          </section>

          {/* Horizontal Category Filters (Scrollable on mobile, flexible on desktop) */}
          <section className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Cleaning', 'Nanny', 'Chef', 'Caregiver', 'Pet Care'].map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                className={cn(
                  "rounded-full px-6 h-9 font-bold text-[0.65rem] uppercase tracking-widest border-none transition-all",
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-md shadow-primary/10" 
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </section>

          {/* Responsive Grid for Workers */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 rounded-[2.5rem] bg-surface-container-low animate-pulse" />
              ))}
            </div>
          ) : filteredWorkers.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorkers.map((worker) => (
                <Card key={worker.id} className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden border-none shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 transition-all group cursor-pointer border border-transparent hover:border-primary/5 flex flex-col h-full" onClick={() => navigate(`/worker/${worker.id}`)}>
                  <div className="relative h-64 overflow-hidden">
                    <img src={worker.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={worker.name} />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                        <span className="text-[0.8rem] font-black text-on-surface">{worker.rating}</span>
                      </div>
                      {worker.verified && (
                        <div className="px-3 py-1.5 rounded-xl bg-primary/95 text-white flex items-center gap-1.5 shadow-lg shadow-primary/20">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span className="text-[0.6rem] font-black uppercase tracking-widest">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-extrabold text-on-surface tracking-tight group-hover:text-primary transition-colors">{worker.name}</h3>
                        <p className="text-primary font-extrabold text-lg tracking-tighter leading-none">{worker.price}<span className="text-xs font-bold text-on-surface-variant">/hr</span></p>
                      </div>
                      <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-4 leading-none">{worker.service} • {worker.exp}</p>
                      <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic line-clamp-2 opacity-80">
                        "{worker.bio}"
                      </p>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-border/10">
                      <Button
                        className={cn(
                          "flex-1 h-11 rounded-xl font-bold text-[0.65rem] uppercase tracking-widest shadow-md transition-all active:scale-95 flex items-center justify-center gap-2",
                          isPro
                            ? "bg-on-surface/5 text-on-surface/20 cursor-not-allowed shadow-none"
                            : "bg-primary hover:bg-primary-container text-white shadow-primary/10"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isPro) navigate('/booking', { state: { workerId: worker.user_id || worker.id } });
                        }}
                        disabled={isPro}
                      >
                        {isPro && <Lock className="w-3.5 h-3.5" />}
                        {isPro ? "Restricted" : "Book Now"}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-11 h-11 p-0 rounded-xl border-border/10 text-on-surface hover:bg-surface-container-low transition-colors"
                        onClick={(e) => { e.stopPropagation(); navigate(`/worker/${worker.id}`); }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </section>
          ) : (
            <div className="text-center py-20 animate-in fade-in zoom-in duration-700">
               <div className="w-20 h-20 bg-surface-container-low rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-outline/30">
                  <Filter className="w-10 h-10" />
               </div>
                <h3 className="text-2xl font-black italic tracking-tighter text-on-surface mb-2">No professionals found.</h3>
                <p className="text-sm text-on-surface-variant font-medium mb-6">Try adjusting your filters or check back later.</p>
                <Button onClick={fetchWorkers} variant="outline" className="rounded-xl font-bold text-[0.65rem] uppercase tracking-widest border-primary/20 text-primary">Refresh Listing</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkerListing;
