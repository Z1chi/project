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
                    <div key={key} className='tableHead__group' style={{minWidth: groupItem.width, width: '100%'}}>
                        <div className='tableHead__groupName'>
                            <TableHeadItem item={{columnName: groupItem.id}} info={groupItem.info} isGroup={true} />
                        </div>
                        <div className='tableHead__groupItems'>
                        {
                            tableConfig.filter(headItem => headItem.groupId === groupItem.id).map(headItem => {
                                return (
                                    // <div className='tableHead__item'>
                                        <TableHeadItem item={headItem} info={info && info[headItem.columnId]} />
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