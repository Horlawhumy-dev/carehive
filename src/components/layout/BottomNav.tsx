import { Home, Calendar, MessageSquare, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Bookings', path: '/booking' },
    { icon: MessageSquare, label: 'Messages', path: '/' },
    { icon: User, label: 'Profile', path: '/household' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-[390px] mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-t-[1.5rem] z-50 border-t border-slate-200/15 dark:border-slate-800/15 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] flex justify-around items-center px-4 pb-6 pt-3 md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-3 py-1 rounded-2xl",
              isActive 
                ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/50 dark:bg-indigo-900/30" 
                : "text-slate-400 dark:text-slate-500 hover:text-indigo-500"
            )
          }
        >
          <item.icon className="w-6 h-6 mb-0.5" />
          <span className="font-['Inter'] font-medium text-[0.75rem]">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
