import type { ReactNode } from 'react';
import { Label } from '@/components/UI/label';
import { cn } from '@/lib/utils';
type ContainerWithLabelProps = {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

const ContainerWithLabel = ({ label, htmlFor, children, className }: ContainerWithLabelProps) => {
  return (
    <div className={cn('relative rounded-md border min-w-[120px] md:min-w-[180px] mb-4', className)}>
      {' '}
      <Label htmlFor={htmlFor} className={cn('absolute font-medium left-2 top-0.5 z-10 origin-left scale-90 px-1 text-sm text-gray-500 transition-all')}>
        {label}
      </Label>
      <div>{children}</div>
    </div>
  );
};

export default ContainerWithLabel;
