import React from 'react';

type Variant = 'default' | 'secondary' | 'destructive' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-6 text-base',
};

export function Button({ className = '', variant = 'default', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}


