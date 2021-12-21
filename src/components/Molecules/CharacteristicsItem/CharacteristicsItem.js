import React from 'react';

import { Checkbox } from '../../Atoms/Checkbox/Checkbox';

export const CharacteristicsItem = ({ characteristicsVariable }) => {
    return (
        <div className='characteristicsItem'>
            <div className='characteristicsItem__checkbox'>
                <Checkbox  />
            </div>
            <div className='characteristicsItem__varName'>
                <Input type='text' 
                    placeholder={characteristicsVariable.name}
                    value={characteristicsVariable.name}
                />
            </div>
            <div className='characteristicsItem__varValue'>
                <Input type='text' 
                    placeholder={`{${characteristicsVariable.name}}`} 
                    value={characteristicsVariable.value}
                />
            </div>
            {
                characteristicsVariable.description && (
                    <div className='characteristicsItem__description'>
                        {characteristicsVariable.description}
                    </div>
                )
            }
        </div>
    )
}