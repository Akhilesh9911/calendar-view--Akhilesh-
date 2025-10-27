import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variantClasses = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-md active:bg-primary-700 active:scale-95',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 hover:shadow-sm active:bg-neutral-300 active:scale-95',
      outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-sm active:bg-neutral-100 active:scale-95',
      ghost: 'hover:bg-neutral-100 active:bg-neutral-200 active:scale-95',
    }
    
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    }
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
