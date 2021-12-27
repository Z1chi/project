import React from 'react';

import SVG from 'react-inlinesvg';
import selected from './images/success.svg'
import notSelected from './images/notSelected.svg'

import './selectionItem.scss';

export const SelectionItem = ({title, isSelected, styles = {}}) => {
    return (
        <div className='selectionItem' style={styles}>
            <div className='selectionItem__status'>
                <SVG src={isSelected ? selected : notSelected}/>
            </div>
            <div className='selectionItem__title'>
                {title}
            </div>
        </div>
    )
};