// src/components/common/Card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  className = '',
  onClick,
}) => {
  const baseStyles = elevated ? 'card-elevated' : 'card';
  const clickableStyles = onClick ? 'cursor-pointer hover:scale-[1.02]' : '';

  return (
    <div
      className={`${baseStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
