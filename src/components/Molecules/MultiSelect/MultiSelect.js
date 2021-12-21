import React, { useState } from 'react';
import { MultiSelectOption } from '../../Atoms/MultiSelectOption/MultiSelectOption';

import SVG from 'react-inlinesvg';
import { images } from './images'

import './multiSelect.scss';

export const MultiSelect = ({ options, mobileConfig }) => {
    const [searchValue, setSearchValue] = useState('');
    const [optionsSelectable, setOptionsSelectable] = useState(options.map( option => {
        return {
            text: option,
            isSelected: false,
        }
    }));

    const searchRegexp = new RegExp(searchValue, 'g');

    return (
        <div className='multiSelect'>
            <div className='multiSelect__mobileHeader'>
                <div className='multiSelect__mobileTitle'>
                    {mobileConfig.title}
                </div>
                <div className='multiSelect__mobileBack' onClick={mobileConfig.onClose}>
                    <SVG src={images.backIcon} />
                </div>
            </div>
            <div className='multiSelect__search'>
                <div className='multiSelect__searchInput'>
                    <input type='text' placeholder='Search' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                </div>
                <div className='multiSelect__searchIcon'>
                    <SVG src={images.searchIcon} />
                </div>
            </div>
            <div className='multiSelect__options'>
            {
                optionsSelectable.filter(option => option.match(searchRegexp)).map((option, index) => {
                    return (
                        <div className='multiSelect__options' onClick={()=>setOptionsSelectable(
                            optionsSelectable.map( (_, indexToCompare)=> {
                                return index===indexToCompare ? {
                                    ...option,
                                    isSelected: !option.isSelected
                                } : option
                            })
                        )}>
                            <MultiSelectOption option={option} />
                        </div>
                    )
                })
            }
            </div>
            <div className='multiSelect__selectors'>
                <div className='multiSelect__reset'>
                    <SVG src={images.resetIcon} />
                </div>
                <div className='multiSelect__selectAll'>
                    <button>Select all</button>
                </div>
            </div>
        </div>
    )
}