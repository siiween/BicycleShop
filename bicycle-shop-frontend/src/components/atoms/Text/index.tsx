import React from 'react';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type TextVariant = 'primary' | 'secondary' | 'muted' | 'red' | 'white';

interface TextProps {
  size?: TextSize;
  variant?: TextVariant;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  size = 'md',
  variant = 'primary',
  as: Tag = 'p',
  children,
  className = '',
}) => {
  const baseClasses = 'font-sans';

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  const variantClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
    red: 'text-rose-500',
    white: 'text-white',
  };

  const classes = `
  ${baseClasses}
  ${sizeClasses[size]}
  ${variantClasses[variant]}
  ${className}
`;

  return <Tag className={classes}>{children}</Tag>;
};

export default Text;
