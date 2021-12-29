import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';

import './multiSelectOption.scss';

export const MultiSelectOption = ({ option, onChange, renderOption=option=>option }) => {
    return (
        <div className='multiSelectOption' onClick={onChange}>
            <div className='multiSelectOption__checkbox'>
                <Checkbox isChecked={option.isSelected} />
            </div>
            <div className='multiSelectOption__text'>
                {renderOption(option)}
            </div>
        </div>
    )
}