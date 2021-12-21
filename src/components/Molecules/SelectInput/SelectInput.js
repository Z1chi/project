import React, { useState } from 'react';

import { Input } from '../../Atoms/Input/Input';
import { Select } from '../../Molecules/Select/Select';
import { Dropdown } from '../../Molecules/Dropdown/Dropdown';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './selectInput.scss'

export const SelectInput = ({ placeholder, options=[], SelectComponent = Select, mobileConfig }) => {
    return (
        <div className='selectInput'>
            <Dropdown 
                renderSwitcher={
                    () => {
                        return (
                            <div className='selectInput__input'>
                                <Input placeholder={placeholder} isNotChangeable />
                                <SVG src={images.arrowIcon} />
                            </div>
                        )
                    }
                }
                renderContent={
                    ({ setIsOpened }) => {
                        return (
                            <div className='selectInput__select'>
                                <SelectComponent options={options} mobileConfig={{...mobileConfig, onClose: ()=>setIsOpened(false)}} />
                            </div>
                        )
                    }
                }
            />
        </div>
    )
}