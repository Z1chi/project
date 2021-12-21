import React from 'react';

import './contactCardField.scss';

export const ContactCardField = ({ parameter, value }) => {
    return (
        <div className='contactCardField'>
            <div className='contactCardField__parameter'>
                {parameter}:
            </div>
            <div className='contactCardField__value'>
                {value}
            </div>
        </div>
    )
}