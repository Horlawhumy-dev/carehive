import { Plus, MapPin, ShieldCheck, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PROPERTIES = [
  {
    id: 1,
    name: 'Main Residence',
    address: '24 Cantonments Crescent, Accra',
    type: 'Luxury Villa',
    active: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH0oI2Iu-i-nS-l9e3u7f8v7b6u5a4s3d2f1g0h9j8k7l6z5x4c3v2b1n0m9'
  },
  {
    id: 2,
    name: 'Office Space',
    address: 'Airport Residential Area, Accra',
    type: 'Modern Office',
    active: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS_Ww88E7Ym0w-m46A-I-f9O7mE5A5v6M-D5O6-X-J-z=s1024'
  }
];

const MyHousehold = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-10">
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter text-on-surface leading-tight italic">My Household.</h1>
          <div className="flex items-center gap-4 mt-4">
           <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-[0.65rem] uppercase tracking-widest border-border/10" onClick={() => console.log('Generate Report')}>
              <Download className="w-4 h-4 mr-2" />
              Service Log
           </Button>
           <Button className="h-11 px-8 primary-gradient text-white rounded-xl font-bold text-[0.65rem] uppercase tracking-widest shadow-lg shadow-primary/10" onClick={() => console.log('Add Property')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Property
           </Button>
          </div>
        </div>
      </section>

      {/* Main Grid: Properties & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Registered Properties Grid */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between px-2">
             <h3 className="font-black text-xs text-primary uppercase tracking-[0.3em]">Registered Estates</h3>
             <Badge variant="outline" className="text-[0.6rem] font-black border-primary text-primary tracking-widest px-3 py-1">2 UNITS</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROPERTIES.map((prop) => (
              <Card key={prop.id} className="bg-surface-container-lowest p-6 rounded-[2.5rem] border-none shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 transition-all group cursor-pointer overflow-hidden flex flex-col h-full">
                <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={prop.name} />
                  {prop.active && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-2 shadow-sm">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       <span className="text-[0.6rem] font-black uppercase tracking-widest text-on-surface">Active Session</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/20">
                     <Settings className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="space-y-4 flex-grow">
                   <div>
                     <h3 className="font-black text-xl text-on-surface tracking-tight leading-none mb-2">{prop.name}</h3>
                     <p className="text-[0.8rem] text-on-surface-variant font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {prop.address}
                     </p>
                   </div>
                   <div className="flex gap-2 pt-2">
                     <Badge className="bg-primary/5 text-primary text-[0.6rem] font-black tracking-widest border-none px-3 py-1">{prop.type}</Badge>
                     <Badge className="bg-surface-container-high text-on-surface-variant text-[0.6rem] font-black tracking-widest border-none px-3 py-1">Smart Key 7.0</Badge>
                   </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Security & Family */}
        <div className="lg:col-span-4 space-y-8">
           {/* Smart Access Card */}
           <Card className="bg-primary p-8 rounded-[2.5rem] border-none shadow-2xl shadow-primary/20 text-white space-y-6 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl border border-white/20">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="font-black text-lg leading-none">Smart Entry</p>
                    <p className="text-[0.6rem] font-black opacity-60 uppercase tracking-widest mt-1">Digital Concierge Access</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <Button className="w-full h-12 bg-white text-on-surface font-bold text-[0.7rem] uppercase tracking-widest rounded-xl shadow-sm border-none transition-all hover:bg-slate-50" onClick={() => console.log('Manage Smart Access')}>
                    Manage Smart Access
                 </Button>
                 <Button variant="outline" className="w-full h-12 border-white/20 text-white font-bold text-[0.7rem] uppercase tracking-widest rounded-xl hover:bg-white/5" onClick={() => console.log('Visitor Codes')}>
                    Visitor Codes
                 </Button>
              </div>
           </Card>

           {/* Household Members */}
           <Card className="bg-surface-container-low p-8 rounded-[2.5rem] border-none shadow-none space-y-6">
              <div className="flex justify-between items-center">
                 <h3 className="font-black text-xs text-on-surface-variant uppercase tracking-[0.3em]">Family Sphere</h3>
                 <Button variant="link" className="text-primary font-black text-[0.7rem] p-0 lowercase">invite member</Button>
              </div>
              <div className="space-y-4">
                 {[
                   { name: "Julian", role: "Owner" },
                   { name: "Sarah", role: "Manager" },
                   { name: "House Help", role: "Assistant" }
                 ].map((member) => (
                   <div key={member.name} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-surface-container-high border-2 border-surface shadow-sm overflow-hidden flex items-center justify-center font-black text-on-surface/30">
                           {member.name[0]}
                         </div>
                         <div>
                            <p className="font-black text-[0.9rem] text-on-surface leading-none mb-1">{member.name}</p>
                            <p className="text-[0.6rem] font-black text-on-surface-variant uppercase tracking-widest">{member.role}</p>
                         </div>
                      </div>
                      <Settings className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full h-14 rounded-2xl border border-dashed border-border/40 text-on-surface-variant font-black text-[0.7rem] uppercase tracking-widest hover:bg-white/50">
                    <Plus className="w-4 h-4 mr-2" />
                    New Guest Key
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default MyHousehold;
