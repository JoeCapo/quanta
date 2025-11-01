// src/components/common/Card.tsx

import { forwardRef, type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  elevated?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  elevated = false,
  className = '',
  onClick,
}, ref) => {
  const baseStyles = elevated ? 'card-elevated' : 'card';
  const clickableStyles = onClick ? 'cursor-pointer hover:scale-[1.02]' : '';

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
