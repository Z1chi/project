import React, { useState } from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './select.scss';

export const Select = ({ options, onChange, renderItem=option=>option, mobileConfig }) => {
    
    const [indexSelected, setIndexSelected] = useState(null)

    return (
        <div className='select'>
            <div className='select__mobileHeader'>
                <div className='select__mobileTitle'>
                    {mobileConfig.title}
                </div>
                <div className='select__mobileBack' onClick={mobileConfig.onClose}>
                    <SVG src={images.backIcon} />
                </div>
            </div>
            <div className='select__options'>
            {
                options.map( (option, index) => {
                    return (
                        <div className={`select__optionsItem${index === indexSelected?' select__optionsItem--selected':''}`} 
                            onClick={()=>{onChange(option);setIndexSelected(index)}}
                        >
                            {renderItem(option)}
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}