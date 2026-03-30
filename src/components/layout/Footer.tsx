import { MessageSquare, Share2, Globe, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-low border-t border-border/10 pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand & Ethos */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="font-black italic text-lg">CH</span>
            </div>
            <span className="text-primary font-black tracking-tighter text-xl">CareHive</span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed opacity-60">
            The standard in high-end household management. Precise, seamless, and deeply personal.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h4 className="font-extrabold text-[0.65rem] text-on-surface-variant uppercase tracking-widest">Platform</h4>
          <ul className="space-y-4">
            <li><button onClick={() => navigate('/listing')} className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">Discovery</button></li>
            <li><button onClick={() => navigate('/subscription-plans')} className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">Memberships</button></li>
            <li><button onClick={() => navigate('/verification-trust')} className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">Trust & Safety</button></li>
            <li><button onClick={() => navigate('/worker-dashboard')} className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">For Professionals</button></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h4 className="font-extrabold text-[0.65rem] text-on-surface-variant uppercase tracking-widest">Resources</h4>
          <ul className="space-y-4">
            <li><button className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">Corporate Benefits</button></li>
            <li><button className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">Help Centre</button></li>
            <li><button className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">Privacy Policy</button></li>
            <li><button className="text-sm font-bold text-on-surface hover:text-primary transition-colors italic">Terms of Service</button></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h4 className="font-extrabold text-[0.65rem] text-on-surface-variant uppercase tracking-widest">Global HQ</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm font-bold text-on-surface italic">24 Cantonments Rd, Accra, GH</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm font-bold text-on-surface italic">concierge@carehive.space</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm font-bold text-on-surface italic">+233 50 123 4567</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">
          © {year} CareHive Technologies Inc. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/5 rounded-xl border border-secondary/10">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span className="text-[0.55rem] font-bold text-secondary uppercase tracking-widest">End-to-End Encryption Enabled</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
