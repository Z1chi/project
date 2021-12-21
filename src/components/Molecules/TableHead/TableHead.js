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
                    <div key={key} className='tableHead__group'>
                        <div className='tableHead__groupName'>
                            <TableHeadItem item={groupItem} isGroup={true} />
                        </div>
                        <div className='tableHead__groupItems'>
                        {
                            tableConfig.filter(headItem => headItem.groupId === groupItem.id).map(headItem => {
                                return (
                                    <div className='tableHead__item'>
                                        <TableHeadItem item={headItem} info={info[headItem.columnId]} />
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
            })
            : tableConfig.map( (headItem, key) => {
                return (
                    <div key={key} className='tableHead__item'>
                        <TableHeadItem item={headItem} />
                    </div>
                )
            })
        }
        </div>
    )
}