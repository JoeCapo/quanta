// src/components/layout/MainLayout.tsx

import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const MainLayout = ({
  children,
  isAuthenticated = false,
  onLogout = () => {},
}: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className="flex-1 page-transition">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
