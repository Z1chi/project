import React from 'react';

export const MultiSelectOption = ({ option }) => {
    return (
        <div className='multiSelectOption'>
            <div className={`multiSelectOption__checkbox${option.isSelected?' multiSelectOption__checkbox--selected':''}`}>
            
            </div>
            <div className='multiSelectOption__text'>
                {option.text}
            </div>
        </div>
    )
}