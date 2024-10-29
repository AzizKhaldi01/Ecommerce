// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'main'; // Add variants as needed
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
}) => {
  const baseStyles = 'px-4 py-2 rounded transition duration-300 focus:outline-none';
  const loadingStyles = 'opacity-50 cursor-not-allowed';
  const primaryStyles = 'bg-blue-500 text-white hover:bg-blue-600';
  const secondaryStyles = 'bg-gray-500 text-white hover:bg-gray-600';
  const mainStyles = 'bg-green-500 text-white hover:bg-green-600';

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return secondaryStyles;
      case 'main':
        return mainStyles;
      case 'primary':
      default:
        return primaryStyles;
    }
  };

  return (
    <button
      onClick={isLoading || disabled ? undefined : onClick}
      className={`${baseStyles} ${getVariantStyles()} ${isLoading || disabled ? loadingStyles : ''}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <span className="loader">Loading...</span> // Add a loading indicator here
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
