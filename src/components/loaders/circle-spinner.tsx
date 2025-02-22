import React from 'react';

const CircleSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <span className="fetch-loader border"></span>
    </div>
  );
};

export default CircleSpinner;