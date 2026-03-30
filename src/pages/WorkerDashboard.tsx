import { useState, useEffect } from 'react';
import {
  History,
  TrendingUp,
  Clock,
  CheckCircle2,
  XSquare,
  Search,
  Wallet,
  Star,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import ProfileCompletionModal from '@/components/dashboard/ProfileCompletionModal';

const WorkerDashboard = () => {
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; bookingId: string | null; action: 'accepted' | 'declined' | null }>({
    isOpen: false,
    bookingId: null,
    action: null
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user) {
        setUserMetadata(session.user.user_metadata);
        if (!session.user.user_metadata.is_profile_completed) {
          setShowProfileModal(true);
        }
        await fetchBookings(session.user.id);
      }
    };

    fetchInitialData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUserMetadata(session.user.user_metadata);
        if (!session.user.user_metadata.is_profile_completed) {
          setShowProfileModal(true);
        }
        fetchBookings(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchBookings = async (userId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('worker_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  const handleUpdateStatus = async (bookingId: string, status: 'accepted' | 'declined') => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (error) {
      toast.error(`Failed to ${status} booking: ` + error.message);
    } else {
      toast.success(`Booking ${status} successfully!`);
      if (session?.user) fetchBookings(session.user.id);
    }
    setConfirmDialog({ isOpen: false, bookingId: null, action: null });
  };

  const openConfirm = (bookingId: string, action: 'accepted' | 'declined') => {
    setConfirmDialog({ isOpen: true, bookingId, action });
  };

  const getInitials = () => {
    if (!userMetadata) return 'MA';
    const first = userMetadata.first_name?.[0] || '';
    const last = userMetadata.last_name?.[0] || '';
    return (first + last).toUpperCase() || 'P';
  };

  return (
    <div className="min-h-screen bg-surface p-6 md:p-12">
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
          <div className="flex items-center gap-5">
            <Avatar className="w-16 h-16 border-4 border-surface shadow-xl">
              <AvatarImage src={userMetadata?.avatar_url} alt="Profile" />
              <AvatarFallback className="bg-primary/5 text-primary font-black italic">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-[2.5rem] font-black tracking-tighter text-on-surface leading-tight italic">
                Welcome, {userMetadata?.first_name || 'Partner'}.
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-on-surface-variant font-medium">Platform Performance: Elite Core (Top 5%)</p>
                <span className="text-border/30">•</span>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-1.5 text-primary font-black text-[0.65rem] uppercase tracking-[0.1em] hover:opacity-70 transition-opacity"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-[0.65rem] uppercase tracking-widest border-border/10">
              <History className="w-4 h-4 mr-2" />
              Service History
            </Button>
            <Button className="h-11 px-8 primary-gradient text-white rounded-xl font-bold text-[0.65rem] uppercase tracking-widest shadow-lg shadow-primary/10">Go Active</Button>
          </div>
        </section>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left: Earnings & Job Feed */}
          <div className="lg:col-span-8 space-y-12">
            {/* Earnings Bento Card */}
            <section>
              <Card className="bg-on-surface p-10 rounded-[3rem] text-white shadow-2xl shadow-black/20 relative overflow-hidden border-none group">
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

            {/* Opportunities Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Pending Opportunities</h3>
                <Badge className="bg-primary/10 text-primary border-none p-0 px-4 py-1.5 rounded-full font-black text-[0.6rem] tracking-[0.2em] uppercase">SYSTEM MATCHED</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {isLoading ? (
                  <div className="col-span-2 py-20 text-center bg-surface-container-low rounded-[3rem] border-2 border-dashed border-border/20">
                    <p className="font-extrabold text-on-surface/40 italic">Syncing with dispatch...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="col-span-2 py-20 text-center bg-surface-container-low rounded-[3rem] border-2 border-dashed border-border/20">
                    <p className="font-extrabold text-on-surface/40 italic">Quiet day. No active requests yet.</p>
                  </div>
                ) : (
                  bookings.map((opp) => (
                    <Card key={opp.id} className="bg-surface-container-lowest p-10 rounded-[3.5rem] shadow-2xl shadow-black/5 border border-transparent hover:border-primary/10 transition-all space-y-10 group">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-[1.75rem] bg-primary/5 border border-primary/10 flex items-center justify-center font-black text-xl text-primary italic">
                            {opp.client_name?.[0] || 'C'}
                          </div>
                          <div>
                            <p className="text-[0.65rem] font-black text-primary uppercase tracking-[0.3em] mb-1">New Request</p>
                            <h4 className="font-black text-2xl text-on-surface tracking-tight leading-none italic">{opp.client_name || 'Client'}</h4>
                          </div>
                        </div>
                        <Badge className="bg-surface-container-high text-on-surface font-black text-[0.6rem] uppercase px-4 py-2 rounded-xl">₵{opp.total_price}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/10">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-[0.55rem] font-black text-on-surface/40 uppercase tracking-widest">Time & Date</p>
                            <p className="text-[0.8rem] font-black italic">{opp.service_date} • {opp.service_time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Search className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-[0.55rem] font-black text-on-surface/40 uppercase tracking-widest">Duration</p>
                            <p className="text-[0.8rem] font-black italic">{opp.duration} Full Hours</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          className="flex-1 h-11 rounded-xl border-border/20 font-black text-error border-error/5 uppercase tracking-widest text-[0.6rem] hover:bg-error hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                          onClick={() => openConfirm(opp.id, 'declined')}
                        >
                          <XSquare className="w-4 h-4" />
                          Decline
                        </Button>
                        <Button
                          className="flex-1 h-11 rounded-xl primary-gradient text-white font-black uppercase tracking-widest text-[0.6rem] shadow-lg shadow-primary/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                          onClick={() => openConfirm(opp.id, 'accepted')}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Accept
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
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
              <Button variant="outline" className="w-full h-11 rounded-2xl border-border/20 text-on-surface-variant font-black text-[0.7rem] uppercase tracking-widest hover:bg-surface-container-high">Download Tax Report</Button>
            </Card>

            <Card className="bg-on-surface p-8 rounded-[2.5rem] border-none shadow-none text-white relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <h3 className="font-black text-xs uppercase tracking-[0.3em] opacity-60 text-primary">Elite Bonus</h3>
                <p className="text-xl font-black italic">You are in the top 5% of providers this week!</p>
                <div className="w-full bg-white/20 h-2 mt-4 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[92%]"></div>
                </div>
              </div>
            </Card>

            <div className="mt-8 bg-surface-container-low p-8 rounded-[2rem] flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="font-black text-[0.8rem] text-on-surface italic">Trust Score: 940</p>
                <p className="text-[0.6rem] font-bold text-on-surface-variant uppercase tracking-widest">Tier 3 Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onComplete={() => setShowProfileModal(false)}
        userMetadata={userMetadata}
        userId={session?.user?.id}
      />

      {/* Confirmation Modal */}
      <Dialog
        open={confirmDialog.isOpen}
        onOpenChange={(open) => !open && setConfirmDialog({ ...confirmDialog, isOpen: false })}
      >
        <DialogContent className="max-w-md bg-white p-8 rounded-[2.5rem] border-none shadow-2xl">
          <DialogTitle className="text-2xl font-black italic tracking-tighter text-on-surface mb-4">
            {confirmDialog.action === 'accepted' ? 'Confirm Acceptance' : 'Confirm Decline'}
          </DialogTitle>
          <div className="space-y-6">
            <p className="text-on-surface-variant font-medium leading-relaxed">
              {confirmDialog.action === 'accepted'
                ? "By accepting, you commit to providing the service at the scheduled time. Are you ready to proceed?"
                : "Are you sure you want to decline this opportunity? This action cannot be undone."
              }
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-bold border-border/10 uppercase tracking-widest text-[0.7rem]"
                onClick={() => setConfirmDialog({ isOpen: false, bookingId: null, action: null })}
              >
                Go Back
              </Button>
              <Button
                className={cn(
                  "flex-1 h-12 rounded-xl text-white font-bold uppercase tracking-widest text-[0.7rem] shadow-lg",
                  confirmDialog.action === 'accepted' ? "primary-gradient shadow-primary/10" : "bg-error shadow-error/10"
                )}
                onClick={() => confirmDialog.bookingId && confirmDialog.action && handleUpdateStatus(confirmDialog.bookingId, confirmDialog.action)}
              >
                Confirm {confirmDialog.action === 'accepted' ? 'Accept' : 'Decline'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkerDashboard;
