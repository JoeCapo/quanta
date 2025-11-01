// src/components/layout/PageContainer.tsx

import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const PageContainer = ({
  children,
  title,
  description,
  maxWidth = 'xl',
  className = '',
}: PageContainerProps) => {
  const maxWidthStyles = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`container-custom py-8 ${className}`}>
      <div className={`mx-auto ${maxWidthStyles[maxWidth]}`}>
        {(title || description) && (
          <div className="mb-8 space-y-2">
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-dark-text md:text-4xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-dark-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
