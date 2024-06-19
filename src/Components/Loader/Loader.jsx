// Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2  border-[#685CFE]"></div>
    </div>
  );
};

export default Loader;