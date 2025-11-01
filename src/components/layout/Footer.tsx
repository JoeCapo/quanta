// src/components/layout/Footer.tsx

import { Link } from 'react-router-dom';
import { APP_INFO, ROUTES } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border bg-dark-surface mt-auto">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <span className="text-lg font-bold text-white">Q</span>
              </div>
              <span className="text-lg font-bold glow-text">Quanta</span>
            </div>
            <p className="text-sm text-dark-text-secondary">
              {APP_INFO.TAGLINE}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-dark-text">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.ABOUT} className="link text-sm">
                  About
                </Link>
              </li>
              <li>
                <a href="#features" className="link text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="link text-sm">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-dark-text">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={APP_INFO.GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#docs" className="link text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#support" className="link text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-dark-text">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="link text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="link text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="link text-sm">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-dark-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-dark-text-secondary">
              © {currentYear} {APP_INFO.NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-secondary hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href={APP_INFO.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-secondary hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-lg border border-dark-border bg-dark-elevated p-4">
          <p className="text-xs text-dark-text-secondary text-center">
            <strong>Disclaimer:</strong> Quanta provides educational content and AI-powered analysis. 
            This is not financial advice. We do not manage money or execute trades. 
            Always consult a licensed financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
