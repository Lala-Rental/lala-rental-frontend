import React from 'react';
import Spinner from '../loaders/spinner.tsx';

interface AuthButtonProps {
  text: string;
  isLoading: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text, isLoading, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border-none rounded-md bg-gradient-to-r from-[#6ca943] to-[#03783d] focus:outline-none hover:opacity-80 focus:opacity-80 ${className}`}
      disabled={isLoading}
    >
      {isLoading && (
        <div className='absolute bg-gray-200/50 w-full h-full rounded-md flex items-center justify-center'>
          <Spinner color="white" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>{text}</span>
    </button>
  );
};

export default AuthButton;