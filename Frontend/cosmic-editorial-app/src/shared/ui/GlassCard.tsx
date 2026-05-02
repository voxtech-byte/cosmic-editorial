import { cn } from '@/shared/lib/utils';
import type { ReactNode, MouseEvent } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

/** Premium glass surface with backdrop blur and inner glow */
export function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden',
        onClick && 'cursor-pointer',
        hover && [
          'transition-transform duration-200',
          'md:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]',
          'md:hover:-translate-y-1',
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}
