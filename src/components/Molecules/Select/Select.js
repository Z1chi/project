import React, { useState, useEffect } from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './select.scss';

export const Select = ({ options, onChange, renderItem=option=>option, mobileConfig }) => {
    
    const [optionsSelectable, setOptionsSelectable] = useState(options)

    useEffect( () => {
        options && options.length > 0 && setOptionsSelectable(options.map( option => {
            return {
                isSelected: false,
                ...option,
            }
        }))
    }, [options,])

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
                optionsSelectable.map( (option, index) => {
                    return (
                        <div className={`select__optionsItem${option.isSelected?' select__optionsItem--selected':''}`} 
                            onClick={()=>{
                                const selectResult = optionsSelectable.map((optionsSelectableItem, innerIndex) => {
                                    return index===innerIndex ? {
                                        ...optionsSelectableItem,
                                        isSelected: !optionsSelectableItem.isSelected,
                                    } : {
                                        ...optionsSelectableItem,
                                        isSelected: false,
                                    }
                                });
                                setOptionsSelectable(selectResult);
                                onChange(selectResult)
                            }}
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