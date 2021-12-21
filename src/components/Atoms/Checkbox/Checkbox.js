import React from 'react';

import './checkbox.scss';

export const Checkbox = ({ size, label, isChecked, onChange }) => {
    return (
        <div className='checkbox'>
            <div className='checkbox__input' style={{ width: size, height: size }}>
                
            </div>
            {
                label && (
                    <div className='checkbox__label'>
                        {label}
                    </div>
                )
            }
        </div>
    )
}