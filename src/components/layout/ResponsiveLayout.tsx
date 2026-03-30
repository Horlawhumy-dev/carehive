import React from 'react';
import TopAppBar from './TopAppBar';
import BottomNav from './BottomNav';
import Footer from './Footer';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center">
      {/* Universal Header - adapts to desktop/mobile via TopAppBar internal logic or CSS */}
      <TopAppBar />
      
      {/* Main Content Area - centering and responsiveness */}
      <main className="w-full max-w-7xl mx-auto flex-grow pt-20 pb-32 md:pb-0 md:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto min-h-[calc(100vh-200px)]">
          {children}
        </div>
      </main>

      {/* Navigation - Hidden on desktop, visible on mobile via internal logic or CSS */}
      <BottomNav />

      {/* Global Desktop Footer */}
      <div className="hidden md:block w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ResponsiveLayout;
