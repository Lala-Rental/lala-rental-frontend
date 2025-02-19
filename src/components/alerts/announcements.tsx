// AlertMessage.tsx
import React from 'react';
import { useGlobalAlert } from '../../contexts/AlertContext.tsx';

const Announcements: React.FC = () => {
  const { alertMessage, alertType } = useGlobalAlert();

  if (!alertMessage) return null;

  return (
    <div className='bg-primary/20 flex items-center justify-center py-2'>
      <p className={`bg-teal-accent-400 inline-block rounded-full ${alertType === 'success' ? 'bg-green-100 border-gray-200 text-green-900' : 'bg-red-100 border-red-200 text-red-900'} px-3 py-1 border text-sm font-semibold tracking-wider`}>{alertMessage}</p>
    </div>
  );
};

export default Announcements;