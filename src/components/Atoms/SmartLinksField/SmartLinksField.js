import React from 'react'; 

import './smartLinksField.scss';

export const SmartLinksField = ({ item, configItem }) => {
    return (
        <div className='smartLinksField'>
            <div className='smartLinksField__name'>
                {configItem.columnName}
            </div>
            <div className='smartLinksField__value'>
                {configItem.renderRowItem ? configItem.renderRowItem(item) : item}
            </div>
        </div>
    )
}