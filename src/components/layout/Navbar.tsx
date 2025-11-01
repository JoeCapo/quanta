// src/components/layout/Navbar.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import Button from '../Button';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar = ({ isAuthenticated, onLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-dark-border bg-dark-surface/95 backdrop-blur-lg">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
              <span className="text-xl font-bold text-white">Q</span>
            </div>
            <span className="text-xl font-bold glow-text">Quanta</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {isAuthenticated ? (
              <>
                <Link to={ROUTES.DASHBOARD} className="link">
                  Dashboard
                </Link>
                <Link to={ROUTES.CHAT} className="link">
                  AI Chat
                </Link>
                <Link to={ROUTES.PROFILE} className="link">
                  Profile
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.ABOUT} className="link">
                  About
                </Link>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-dark-elevated"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-dark-border py-4 md:hidden animate-slide-down">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to={ROUTES.CHAT}
                  className="link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Chat
                </Link>
                <Link
                  to={ROUTES.PROFILE}
                  className="link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to={ROUTES.ABOUT}
                  className="link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="primary" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
