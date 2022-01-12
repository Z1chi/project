import React from 'react';

import './creativesCategory.scss';

export const CreativesCategory = ({ name, count, countLimit, isSelected, onSelect }) => {
    console.log('i',isSelected)
    return (
        <div className={`creativesCategory${isSelected?' creativesCategory--selected':''}`} onClick={onSelect}>
            {name} ({count > countLimit ? `${countLimit}+`: count})
        </div>
    )
}