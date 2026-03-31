import { useState, useEffect } from 'react';
import { Star, ShieldCheck, Filter, ChevronRight, Lock, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { groq } from '@/lib/groq';

const WorkerListing = () => {
  const navigate = useNavigate();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);

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

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredWorkers(workers);
      return;
    }

    setIsAiSearching(true);
    try {
      const workerContext = workers.map(w => ({
        id: w.id,
        name: w.name,
        service: w.service_type,
        experience: w.years_exp,
        bio: w.bio,
        rate: w.hourly_rate
      }));

      const prompt = `You are an expert matchmaking assistant for CareHive. 
      Given the following list of professional workers and a user's natural language request, return ONLY a comma-separated list of the IDs of the workers that best match the request.
      If no workers match, return "NONE".
      
      User Request: "${searchQuery}"
      
      Workers:
      ${JSON.stringify(workerContext, null, 2)}
      
      Return ONLY the IDs (e.g. "uuid1, uuid2, uuid3") or "NONE".`;

      const response = await groq.chat([
        { role: 'system', content: 'You are a precise matchmaking engine.' },
        { role: 'user', content: prompt }
      ]);

      const result = response.choices[0].message.content.trim();
      
      if (result === 'NONE') {
        setFilteredWorkers([]);
        toast.info('No direct matches found for your specific request.');
      } else {
        const matchedIds = result.split(',').map((id: string) => id.trim());
        const matched = workers.filter(w => matchedIds.includes(w.id));
        setFilteredWorkers(matched);
        toast.success(`Found ${matched.length} matches!`);
      }
    } catch (error: any) {
      toast.error('AI Search failed: ' + error.message);
    } finally {
      setIsAiSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredWorkers(activeCategory === 'All' ? workers : workers.filter(w => w.service_type === activeCategory));
  };

  const isPro = userMetadata?.role === 'pro';

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 pt-10 max-w-7xl mx-auto w-full">
        <div className="space-y-10 pb-20">
          {/* Header & Filter Stats */}
          <section className="flex flex-col gap-8 border-b border-border/10 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tighter text-on-surface leading-tight italic">Find a Professional</h1>
                <p className="text-on-surface-variant font-medium">Connect with top-tier verified professionals in Ghana.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl border-border/10 font-bold text-[0.65rem] uppercase tracking-widest px-5 h-11 hover:bg-surface-container-low transition-colors">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" className="rounded-xl border-border/10 font-bold text-[0.65rem] uppercase tracking-widest px-5 h-11 hover:bg-surface-container-low transition-colors">
                  Sort: Rated
                </Button>
              </div>
            </div>

            {/* AI Smart Search Bar */}
            <form onSubmit={handleAiSearch} className="relative group max-w-2xl">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-2xl group-focus-within:bg-primary/10 transition-all"></div>
              <div className="relative flex items-center bg-white rounded-[2rem] border border-border/10 shadow-2xl shadow-black/5 p-2 pr-4 focus-within:border-primary/30 transition-all">
                <div className="w-12 h-12 flex items-center justify-center text-primary">
                  <Sparkles className={cn("w-6 h-6", isAiSearching && "animate-pulse")} />
                </div>
                <input 
                  type="text" 
                  placeholder="Try 'I need an experienced nanny who can cook...'"
                  className="flex-1 bg-transparent border-none outline-none text-on-surface font-medium placeholder:text-on-surface-variant/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={clearSearch}
                    className="p-2 text-on-surface-variant/40 hover:text-on-surface transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <Button 
                  type="submit" 
                  disabled={isAiSearching}
                  className="h-10 px-6 rounded-full primary-gradient text-white font-black italic uppercase tracking-widest text-[0.65rem] shadow-lg shadow-primary/20 ml-2"
                >
                  {isAiSearching ? 'Matching...' : 'Smart Match'}
                </Button>
              </div>
            </form>
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
