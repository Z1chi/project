import React from 'react';

import './tableHeadItem.scss';

export const TableHeadItem = ({ item, isGroup, info }) => {
    return (
        <div className={`tableHeadItem${isGroup?' tableHeadItem--group':''}`} style={{width: item.columnWidth}}>
            <div className='tableHeadItem__text'>
                {item.columnName}
            </div>
            {
                item.info
                && (
                    <div className={`tableHeadItem__info${info.notification? 'tableHeadItem__info--highlited':''}`}>
                        <p>{info.notification?'!':'i'}</p>
                    </div>
                )
            }
        </div>
    )
}