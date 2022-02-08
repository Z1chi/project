import React from 'react';

import './button.scss';

export const Button = ({text, onClick, styles = {}, containerStyles = {}, children, disabled = false}) => {
    return (
        <div className='button' style={containerStyles}>
            <button onClick={onClick} style={styles} disabled={!!disabled}>
                {text || children}
            </button>
        </div>
    )
};