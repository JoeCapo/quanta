// src/components/common/Loading.tsx

import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  fullScreen = false,
}) => {
  const sizeStyles = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`spinner ${sizeStyles[size]}`} />
      {text && (
        <p className="text-dark-text-secondary animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
