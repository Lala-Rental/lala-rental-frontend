import React from 'react';

interface SpinnerProps {
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color = 'blue' }) => {
  const spinnerStyle = {
    background: `radial-gradient(circle 8px at 8px center, #fff 100%, transparent 0), radial-gradient(circle 8px at 8px center, ${color} 100%, transparent 0)`,
  };

  return (
    <div className="flex justify-center items-center">
      <span className="custom-loader" style={spinnerStyle}></span>
    </div>
  );
};

export default Spinner;