import { Star, ShieldCheck, Filter, ChevronRight, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const WORKERS = [
  {
    id: 1,
    name: 'Akua Mensah',
    service: 'Expert Nanny',
    exp: '5 yrs exp.',
    price: '₵45',
    rating: '4.9',
    verified: true,
    bio: 'Professional nanny with certifications in early childhood care and first aid.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC5aeX-koDj6sHeiPjvWOJd9cXOqxY17hGJGBgZmb7JPHuxW25IgzpdXN3L5dQ4lkO2aE1YqYu-WmTlFGFmXMFBuYvaFI3cqgVSooM1SjYWxP_-GA6dYdAuziQhwdLWWdnzDVW1au21M_RPSNOKyaTAyTqJPnMMwXdZgWhtTkvjTcXwrfe9kRDYVxRpV3m5RGnG0d-cU1ueLsFA-jCEn3a5lZqW1IonFd0RFQQOZOyIc_NvHO7YjT94FBqtXe4Tj27-u5Ov3Mt60I'
  },
  {
    id: 2,
    name: 'Adjoa Appiah',
    service: 'Home Chef',
    exp: 'Local Delicacies',
    price: '₵60',
    rating: '4.8',
    verified: true,
    bio: 'Specializing in traditional cuisine and modern fusion for house events.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS_Ww88E7Ym0w-m46A-I-f9O7mE5A5v6M-D5O6-X-J-z=s1024'
  },
  {
    id: 3,
    price: '₵55',
    rating: '5.0',
    verified: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHryUL7PdILyEdzLQgKPwNN1WbDyhtkYoIgnOD5BotmUTM8QAvdfSAK2IKTkTcrOVsGAkPvaZqDA15LFzzE1ww9LKeADmorjObONSeT1z_IZG9PzFS1-lek9nE-RmWf1mOp1iPVKa_pIyvIOphdC9Jp3kNzfuDGA-toLZZfLPpGAcZuj2wv8Dd84amViXQH18eYIQcBosH02hU8Fl1zd5D9t4TvKmvqoI5FLqRM-4M0lf4hUcOWMK14vAlDshr_xdr0AEptlTETsY'
  }
];

const WorkerListing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-[390px] mx-auto left-0 right-0 z-50 bg-slate-50/80 backdrop-blur-md shadow-[0_10px_30px_rgba(83,65,205,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="active:scale-95 transition-transform">
              <ArrowLeft className="w-6 h-6 text-on-surface-variant" />
            </Button>
            <h1 className="font-headline font-semibold tracking-tight text-[1.25rem] text-on-surface">Find a Cleaner</h1>
          </div>
          <Button variant="ghost" size="icon" className="active:scale-95 transition-transform text-indigo-600">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 pt-24 max-w-7xl mx-auto w-full">
        <div className="space-y-10 pb-20">
          {/* Header & Filter Stats */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/10 pb-10">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight italic">Find your perfect <br/> home expert.</h1>
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
            {['All', 'Cleaning', 'Nanny', 'Chef', 'Elderly Care', 'Pet Care'].map((cat) => (
              <Button 
                key={cat} 
                variant={cat === 'All' ? 'default' : 'outline'} 
                className={`rounded-full px-6 h-9 font-bold text-[0.65rem] uppercase tracking-widest border-none transition-all ${cat === 'All' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                {cat}
              </Button>
            ))}
          </section>

          {/* Responsive Grid for Workers */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKERS.map((worker) => (
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
                      className="flex-1 bg-primary hover:bg-primary-container text-white h-11 rounded-xl font-bold text-[0.65rem] uppercase tracking-widest shadow-md shadow-primary/10 active:scale-95 transition-transform"
                      onClick={(e) => { e.stopPropagation(); navigate('/booking'); }}
                    >
                      Book Now
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
        </div>
      </main>
    </div>
  );
};

export default WorkerListing;
