// ButtonComponent.js
import React from 'react';

const ButtonFinances = ({icon, title, onClick}) => {

  return (
      <button
          onClick={onClick}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white rounded-lg mx-3 px-3 py-3 lg:px-6 lg:py-5  shadow-md hover:bg-teal-700 transition"
      >
        {/* Icon */}
        <span className="text-2xl">{icon}</span>

        {/* Title */}
        <span className='text-xl'>{title}</span>
      </button>
  );
};

export default ButtonFinances;
