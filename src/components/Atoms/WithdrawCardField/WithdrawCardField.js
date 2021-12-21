import React from 'react';

import './withdrawCardField.scss';

export const WithdrawCardField = ({ field, configItem }) => {

    return (
        <div className='withdrawCardField'>
            <div className='withdrawCardField__name'>
                {configItem.columnName}:
            </div>
            <div className='withdrawCardField__value'>
                {configItem.renderRowItem ? configItem.renderRowItem(field) : field }
            </div>
        </div>
    )
}