import React from 'react'
import { IoCloseCircle } from 'react-icons/io5';

const DisplayProductImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      {/* Modal Container */}
      <div className='relative bg-white shadow-lg rounded-lg max-w-4xl w-[35%] mx-auto transition-transform transform ease-in-out duration-300 scale-100'>
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-300"
          onClick={onClose}
        >
          <IoCloseCircle className="w-8 h-8" />
        </button>

        {/* Image Display */}
        <div className='flex justify-center p-4'>
          <img 
            src={imgUrl} 
            alt='Error' 
            className='max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg'
          />
        </div>
      </div>
    </div>
  );
}

export default DisplayProductImage;
