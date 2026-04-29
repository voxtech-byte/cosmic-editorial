import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/** Premium glass surface with backdrop blur and inner glow */
export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden',
        hover && [
          'transition-all duration-300',
          'hover:shadow-[0_12px_40px_rgb(0,0,0,0.3)]',
          'hover:-translate-y-1',
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}
