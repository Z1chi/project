import React from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './checkbox.scss';

export const Checkbox = ({ size, label, isChecked, onChange=()=>{} }) => {
    return (
        <div className='checkbox' onClick={onChange}>
            <div className='checkbox__input' style={{ width: size, height: size }}>
                {isChecked && <SVG src={images.selectedIcon} />}
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