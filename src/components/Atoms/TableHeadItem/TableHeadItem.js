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
                    <Dropdown 
                        renderSwitcher={({ isOpened })=>{
                            return (
                                <div className={`tableHeadItem__info${isOpened?' tableHeadItem__info--highlighted':''}`}>
                                    {item.info.message?'i':''}
                                </div>
                            )
                        }}
                        renderContent={()=>{
                            return (
                                <div className='tableHeadItem__message'>
                                    {item.info.message}
                                </div>
                            )
                        }}
                    />
                )
            }
        </div>
    )
};