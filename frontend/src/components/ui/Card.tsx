import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;