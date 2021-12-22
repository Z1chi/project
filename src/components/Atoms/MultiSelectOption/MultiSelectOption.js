import React from 'react';

export const MultiSelectOption = ({ option, renderOption=option=>option }) => {
    return (
        <div className='multiSelectOption'>
            <div className={`multiSelectOption__checkbox${option.isSelected?' multiSelectOption__checkbox--selected':''}`}>
            
            </div>
            <div className='multiSelectOption__text'>
                {renderOption(option)}
            </div>
        </div>
    )
}