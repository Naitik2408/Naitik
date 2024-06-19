// src/Components/AlertPopup.jsx
import React from 'react';

const AlertPopup = ({ message, isVisible }) => {
    if (!isVisible) return null;

    return (
        <>
            <div className={` fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded shadow-lg shadow-gray-900 transition-opacity duration-500 ${isVisible ? 'opacity-100 animate-bounce' : 'opacity-0'}`} style={{ position: 'fixed', zIndex: 50 }}>
                {message}
            </div>
        </>
    );
};

export default AlertPopup;