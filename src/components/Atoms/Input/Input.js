import React, { useEffect, useState } from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './input.scss';


export const Input = ({ type = 'text', value, placeholder, isNotChangeable = false, onChange = () => {}, canCopy, name, validator=()=>true}) => {

    const [inputValue, setInputValue] = useState('');

    useEffect( ()=>{
        setInputValue(value)
    }, [value])

    return (
        <div className='customInput'>
            <input
                name={name}
                className='customInput__input'
                type={type}
                value={inputValue}
                placeholder={placeholder}
                onChange={e => setInputValue(e.target.value)}
                onBlur={()=>validator(inputValue) ? onChange(inputValue) : ()=>{}}
                disabled={isNotChangeable}/>

            {
                canCopy && <div className='customInput__copy'>
                    <SVG src={images.copyIcon}/>
                </div>
            }
        </div>
    )
};