import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export function SectionTitle({ children, className, subtitle }: SectionTitleProps) {
  return (
    <div className={cn('text-center mb-12', className)}>
      <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
