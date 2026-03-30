import { Landmark, TrendingUp, Download, ArrowUpRight, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TRANSACTIONS = [
  { id: 1, type: 'Payment Received', amount: '+₵180.00', date: 'Mar 24, 2026', customer: 'Kofi Mensah', status: 'Completed', color: 'text-green-600' },
  { id: 2, type: 'Withdrawal', amount: '-₵500.00', date: 'Mar 22, 2026', customer: 'Bank Transfer', status: 'Processing', color: 'text-on-surface' },
  { id: 3, type: 'Payment Received', amount: '+₵120.00', date: 'Mar 20, 2026', customer: 'Abena Sarfo', status: 'Completed', color: 'text-green-600' },
];

const Earnings = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight italic">Financials.</h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wide">Manage your revenue and withdrawals</p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-[0.65rem] uppercase tracking-widest border-border/10">
                <Download className="w-3.5 h-3.5 mr-2" />
                Statement
           </Button>
           <Button className="h-11 px-7 primary-gradient text-white rounded-xl font-bold text-[0.65rem] uppercase tracking-widest shadow-lg shadow-primary/10">
                <Landmark className="w-3.5 h-3.5 mr-2" />
                Withdraw Funds
           </Button>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Balance & Stats */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-on-surface p-10 rounded-[3rem] text-white space-y-6 shadow-[0_40px_80px_rgba(0,0,0,0.1)] relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div>
                 <p className="text-[0.65rem] font-bold opacity-40 uppercase tracking-widest mb-2">Available Balance</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold tracking-tight leading-none italic">₵1,850</span>
                    <span className="text-xl font-bold opacity-40 italic">.40</span>
                 </div>
              </div>
             <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                   <p className="text-[0.55rem] font-black opacity-30 uppercase tracking-[0.2em] mb-1">Total Payouts</p>
                   <p className="text-xl font-black italic">₵12.4k</p>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                   <TrendingUp className="w-6 h-6 text-primary" />
                </div>
             </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 rounded-[2rem] bg-surface-container-low border-none shadow-none space-y-3">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <DollarSign className="w-5 h-5 text-primary" />
               </div>
               <div>
                  <p className="text-[0.6rem] font-black text-on-surface-variant uppercase tracking-widest">Avg. per Job</p>
                  <p className="text-xl font-black text-on-surface">₵210</p>
               </div>
            </Card>
            <Card className="p-6 rounded-[2rem] bg-surface-container-low border-none shadow-none space-y-3">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
               </div>
               <div>
                  <p className="text-[0.6rem] font-black text-on-surface-variant uppercase tracking-widest">Peak Growth</p>
                  <p className="text-xl font-black text-on-surface">+14%</p>
               </div>
            </Card>
          </div>

          <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[0.7rem] font-black text-primary uppercase tracking-widest">Next Payout</span>
             </div>
             <p className="text-on-surface font-bold text-sm leading-relaxed">
                Your next scheduled withdrawal is on <span className="font-black">Friday, March 27</span>.
             </p>
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between pb-2">
              <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Transaction History</h3>
              <div className="flex gap-2">
                 <Badge className="bg-surface-container-high text-on-surface-variant border-none font-bold text-[0.6rem] px-3 py-1">ALL ACTIVITY</Badge>
                 <Badge className="bg-white border-border/10 text-on-surface-variant font-bold text-[0.6rem] px-3 py-1">MARCH 2026</Badge>
              </div>
           </div>

           <div className="space-y-4">
              {TRANSACTIONS.map((t) => (
                <Card 
                  key={t.id} 
                  className="p-8 rounded-[2.5rem] bg-surface-container-lowest border border-transparent hover:border-border/10 shadow-xl shadow-black/5 flex items-center justify-between group transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-[1.25rem] flex items-center justify-center transition-all group-hover:scale-110 shadow-sm",
                      t.amount.startsWith('+') ? "bg-green-50 text-green-600" : "bg-slate-100 text-on-surface"
                    )}>
                      <ArrowUpRight className={cn("w-7 h-7", !t.amount.startsWith('+') && "rotate-90")} />
                    </div>
                    <div>
                       <h4 className="font-extrabold text-base text-on-surface tracking-tight mb-1">{t.type}</h4>
                       <p className="text-[0.7rem] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">
                          {t.customer} • {t.date}
                       </p>
                    </div>
                  </div>

                  <div className="text-right">
                     <p className={cn("text-xl font-extrabold leading-none mb-2 italic", t.color)}>
                        {t.amount}
                     </p>
                     <Badge className={cn(
                       "text-[0.55rem] font-bold uppercase tracking-widest px-2 py-0.5 border-none",
                       t.status === 'Completed' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                     )}>
                        {t.status}
                     </Badge>
                  </div>
                </Card>
              ))}
           </div>

           <Button variant="ghost" className="w-full h-16 rounded-[2rem] border-2 border-dashed border-border/10 text-on-surface-variant font-black text-[0.7rem] uppercase tracking-[0.2em] hover:bg-surface-container-low">
              Load Previous Activity
           </Button>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
