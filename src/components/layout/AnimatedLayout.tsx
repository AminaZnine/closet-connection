
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevPathRef.current !== pathname && contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(10px)';
      
      // Smoothly fade in and slide up
      const timeout = setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        }
      }, 50);
      
      prevPathRef.current = pathname;
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main 
        ref={contentRef}
        className="flex-1 pt-20 pb-20 md:pb-0 px-4 transition-all duration-300"
        style={{ opacity: 1, transform: 'translateY(0)' }}
      >
        <div className="container mx-auto max-w-screen-xl">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default AnimatedLayout;
