import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';

import './multiSelectOption.scss';

export const MultiSelectOption = ({ option, renderOption=option=>option }) => {
    return (
        <div className='multiSelectOption'>
            <div className='multiSelectOption__checkbox'>
                <Checkbox />
            </div>
            <div className='multiSelectOption__text'>
                {renderOption(option)}
            </div>
        </div>
    )
}