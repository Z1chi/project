import React, { useEffect, useState } from 'react';

import { Input } from '../../Atoms/Input/Input';
import { Select } from '../../Molecules/Select/Select';
import { Dropdown } from '../../Molecules/Dropdown/Dropdown';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './selectInput.scss'

export const SelectInput = ({ value, inputValue, placeholder, options, matchPropName, renderItem, onChange, onCloseCheck, SelectComponent = Select, mobileConfig, dateSource }) => {
    useEffect(() => {
        
    }, [value, inputValue])
    return (
        <div className='selectInput'>
            <Dropdown 
                renderSwitcher={
                    () => {
                        return (
                            <div className='selectInput__input'>
                                <Input placeholder={placeholder} value={inputValue || ((value && matchPropName) ? value[matchPropName] : value)} />
                                <SVG src={images.arrowIcon} />
                            </div>
                        )
                    }
                }
                renderContent={
                    ({ setIsOpened }) => {
                        return (
                            <div className='selectInput__select'>
                                <SelectComponent options={options || []} renderItem={renderItem} 
                                dateSource={dateSource}
                                matchPropName={matchPropName}
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                    onCloseCheck && onCloseCheck(value) && setIsOpened(false)
                                }}
                                mobileConfig={{...mobileConfig, onClose: ()=>setIsOpened(false)}} 
                            />
                            </div>
                        )
                    }
                }
            />
        </div>
    )
}