import React from 'react';

import { TableHeadItem } from '../../Atoms/TableHeadItem/TableHeadItem';

import './tableHead.scss';

export const TableHead = ({ groups, tableConfig, info }) => {
    return (
        <div className='tableHead'>
        {
            groups
            ? groups.map( (groupItem, key) => {
                return (
                    <div key={key} className='tableHead__group' style={{minWidth: groupItem.width, flex: groupItem.columnCount }}>
                        <TableHeadItem item={{columnName: groupItem.id}} info={groupItem.info} isGroup={true} />
                        <div className='tableHead__groupItems'>
                        {
                            tableConfig.filter(headItem => headItem.groupId === groupItem.id).map((headItem, key) => {
                                return (
                                    // <div className='tableHead__item'>
                                        <TableHeadItem item={headItem} key={key} info={info && info[headItem.columnId]} />
                                    // </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
            })
            : tableConfig.map( (headItem, key) => {
                return (
                    // <div key={key} className='tableHead__item'>
                        <TableHeadItem key={`tableHeadItem${key}`} item={headItem} />
                    // </div>
                )
            })
        }
        </div>
    )
};