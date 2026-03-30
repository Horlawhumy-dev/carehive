import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ShieldCheck, Sparkles, Briefcase, Banknote, UserRound } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onComplete: () => void;
  userMetadata: any;
  userId: string;
}

const ProfileCompletionModal = ({ isOpen, onComplete, userMetadata, userId }: ProfileModalProps) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    service_type: '',
    years_exp: '',
    hourly_rate: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (userMetadata) {
      setFormData({
        bio: userMetadata.bio || '',
        service_type: userMetadata.service_type || '',
        years_exp: userMetadata.years_exp || '',
        hourly_rate: userMetadata.hourly_rate || '',
        avatar_url: userMetadata.avatar_url || '',
      });
    }
  }, [userMetadata]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFormData({ ...formData, avatar_url: publicUrl });
      toast.success('Photo uploaded successfully!');
    } catch (error: any) {
      toast.error('Error uploading photo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bio || !formData.service_type || !formData.years_exp || !formData.hourly_rate || !formData.avatar_url) {
      toast.error('Please fill in all fields and upload a photo to activate your profile.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          ...userMetadata,
          bio: formData.bio,
          service_type: formData.service_type,
          years_exp: formData.years_exp,
          hourly_rate: formData.hourly_rate,
          avatar_url: formData.avatar_url,
          gender: 'female',
          is_profile_completed: true,
        }
      });

      if (error) throw error;

      // Also update the public profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          user_id: userId,
          role: 'pro',
          first_name: userMetadata.first_name,
          last_name: userMetadata.last_name,
          bio: formData.bio,
          service_type: formData.service_type,
          years_exp: formData.years_exp,
          hourly_rate: formData.hourly_rate,
          avatar_url: formData.avatar_url,
          is_profile_completed: true,
        }, { onConflict: 'user_id' });

      if (profileError) throw profileError;

      toast.success('Profile updated successfully!');
      onComplete();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const canClose = userMetadata?.is_profile_completed;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && canClose) onComplete();
    }}>
      <DialogContent className="sm:max-w-xl bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-[0_80px_200px_rgba(0,0,0,0.15)] border-white/40 p-8 md:p-12 gap-8 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="text-center space-y-4">
          <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto shadow-inner relative">
             <ShieldCheck className="w-10 h-10" />
             <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-secondary fill-secondary" />
          </div>
          <DialogTitle className="text-3xl font-black italic text-on-surface tracking-tighter">Complete Your Profile</DialogTitle>
          <p className="text-sm text-on-surface-variant font-medium mt-1">Tell us more about your expertise to start getting booked.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Photo Upload Section */}
            <div className="flex flex-col items-center space-y-3 pb-4">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-surface-container-low border-2 border-dashed border-outline/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
                  {formData.avatar_url ? (
                    <img src={formData.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
                  ) : (
                     <div className="text-center p-2">
                        {uploading ? (
                          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        ) : (
                          <>
                            <UserRound className="w-8 h-8 text-outline mx-auto mb-1" />
                            <span className="text-[0.5rem] font-bold uppercase tracking-widest text-outline">Upload Photo</span>
                          </>
                        )}
                     </div>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </div>
              <p className="text-[0.6rem] text-on-surface-variant font-bold uppercase tracking-widest italic">A professional photo increases bookings by 40%</p>
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <label className="text-[0.6rem] font-bold text-outline uppercase tracking-widest pl-2">Primary Service</label>
              <Select onValueChange={(val: string) => setFormData({...formData, service_type: val})}>
                <SelectTrigger className="h-14 rounded-2xl bg-surface-container-low border-none shadow-sm">
                  <SelectValue placeholder="Select your expertise" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-2xl z-[1001]">
                  <SelectItem value="Cleaning">Domestic Cleaning</SelectItem>
                  <SelectItem value="Nanny">Professional Nanny</SelectItem>
                  <SelectItem value="Chef">Personal Chef / Cook</SelectItem>
                  <SelectItem value="Caregiver">Elderly Caregiver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[0.6rem] font-bold text-outline uppercase tracking-widest pl-2">Experience (Years)</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <Input 
                    placeholder="e.g. 5" 
                    className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none shadow-sm"
                    value={formData.years_exp}
                    onChange={(e) => setFormData({...formData, years_exp: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.6rem] font-bold text-outline uppercase tracking-widest pl-2">Hourly Rate (₵)</label>
                <div className="relative">
                  <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <Input 
                    placeholder="Rate per hr" 
                    className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none shadow-sm"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.6rem] font-bold text-outline uppercase tracking-widest pl-2">Professional Biodata</label>
              <Textarea 
                placeholder="Tell us about yourself and your skills..."
                className="min-h-[100px] rounded-[2rem] bg-surface-container-low border-none shadow-sm resize-none p-6 text-sm"
                value={formData.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, bio: e.target.value})}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 primary-gradient text-white font-black italic uppercase tracking-widest text-[0.8rem] rounded-2xl shadow-2xl shadow-primary/20 active:scale-95 transition-all"
            disabled={loading}
          >
            {loading ? 'Activating Profile...' : 'Activate & Start Earning'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompletionModal;
