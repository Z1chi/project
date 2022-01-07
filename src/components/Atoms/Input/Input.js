import React, { useEffect, useState } from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './input.scss';

export const Input = ({ type = 'text', value, hasError, error, placeholder, isNotChangeable = false, onChange = () => {}, canCopy, fieldData={},}) => {

    const [inputValue, setInputValue] = useState('');

    useEffect( ()=>{
        setInputValue(value)
    }, [value])

    return (
        <div className='customInput'>
            <div className='customInput__field'>
                <input
                    className='customInput__input'
                    type={type}
                    value={inputValue}
                    placeholder={placeholder}
                    disabled={isNotChangeable}
                    {...fieldData}
                    onChange={e => {
                        setInputValue(e.target.value);
                        fieldData.onChange(e)
                    }}
                    onBlur={(e)=>{
                        onChange(inputValue)
                        fieldData.onBlur(e)
                    }}
                />
                {
                    canCopy && <div className='customInput__copy'>
                        <SVG src={images.copyIcon}/>
                    </div>
                }
            </div>
            {
                error && <div className='customInput__error'>
                    {error}
                </div>
            }
        </div>
    )
};