import React from 'react';

import { Dropdown } from '../../Molecules/Dropdown/Dropdown';

import './tableHeadItem.scss';

export const TableHeadItem = ({ item, isGroup }) => {
    return (
        <div className={`tableHeadItem${isGroup?' tableHeadItem--group':''}`} style={{minWidth: item.columnWidth, width: '100%'}}>
            <div className='tableHeadItem__text'>
                {item.columnName}
            </div>
            {
                item.info
                && (
                    <div className='tableHeadItem__info'>
                        <div className='tableHeadItem__message'>
                            {item.info.message}
                        </div>
                        {item.info.message?'i':''}
                    </div>
                )
            }
        </div>
    )
};