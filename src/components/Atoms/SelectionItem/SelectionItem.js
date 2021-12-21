import React from 'react';

import SVG from 'react-inlinesvg';
import selected from './images/success.svg'

import './selectionItem.scss'; 

export const SelectionItem = ({ title, isSelected, }) => {
    return (
        <div className='selectionItem'>
            <div className='selectionItem__status'>
                <SVG src={isSelected ? selected : ''} />
            </div>
            <div className='selectionItem__title'>
                {title}
            </div>
        </div>
    )
}