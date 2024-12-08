interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'transparent';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  name = 'button',
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded focus:outline-none transition duration-200 gap-1';

  const variantClasses = {
    primary: 'bg-rose-600 text-white hover:bg-rose-700',
    secondary: 'bg-pink-600 text-white hover:bg-pink-700',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
    transparent: 'text-gray-700 hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
    xs: 'px-2 py-1 text-xs',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={name}
      name={name}
      title={name}
    >
      {children}
    </button>
  );
};

export default Button;
