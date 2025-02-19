import React from 'react';

interface ContentProps {
    children?: React.ReactNode;
}

const MainContents: React.FC<ContentProps> = ({ children }) => {
  return (
    <div id="main-content" className="relative w-full h-full overflow-y-auto border border-gray-200 rounded-lg my-6 p-5 ml-5 bg-white">
        {children}
    </div>
  )
}

export default MainContents;
