import React, { useEffect, useState } from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './input.scss';

export const Input = ({ required, type = 'text', value, hasError, error, placeholder, isNotChangeable=false, onChange=()=>{}, onChangeValue=(value)=>value, canCopy, onCopy, fieldData={},}) => {

    const [inputValue, setInputValue] = useState('');

    useEffect( ()=>{
        setInputValue(value)
    }, [value])
    
    return (
        <div className={`customInput ${required && !inputValue ? ' customInput--required':''}`}>
            <div className='customInput__field'>
                <input
                    className='customInput__input'
                    type={type}
                    placeholder={placeholder}
                    disabled={isNotChangeable}
                    value={inputValue}
                    {...fieldData}
                    onChange={e => {
                        const res = onChangeValue(e.target.value);
                        setInputValue(res);
                        fieldData.onChange && fieldData.onChange({...e, target: {...e.target, value: res}})
                    }}
                    onBlur={(e)=>{
                        onChange(inputValue)
                        fieldData.onBlur && fieldData.onBlur(e)
                    }}
                />
                {
                    canCopy && <div className='customInput__copy' onClick={()=>{
                        navigator.clipboard.writeText(inputValue)
                        onCopy();
                    }}>
                        <SVG src={images.copyIcon}/>
                    </div>
                }
            </div>
            {
                hasError && error && <div className='customInput__error'>
                    {error}
                </div>
            }
        </div>
    )
};