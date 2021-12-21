import React from 'react';

import './backdrop.scss';

export const Backdrop = ({ onClose }) => {
    return (
        <div className='backdrop' onClick={onClose}></div>
    )
}