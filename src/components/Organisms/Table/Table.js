import React from 'react';

import {TableHead} from '../../Molecules/TableHead/TableHead';
import {TableRow} from '../../Molecules/TableRow/TableRow';
import {TableEmpty} from '../../Molecules/TableEmpty/TableEmpty';

import './table.scss';

export const Table = ({groups, tableConfig, data, emptyTable }) => {
    return (
        <div className='table'>
            {
                data && data.length > 0 ?
                (<div className='table__data'>
                    <div className='table__head'>
                        <TableHead tableConfig={tableConfig}/>
                    </div>
                    <div className='table__rowList'>
                        {
                            data.map((row, key) => {
                                return (
                                    <div key={key} className='table__row'>
                                        <TableRow row={row} tableConfig={tableConfig}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>) :
                    <TableEmpty {...emptyTable}/>
            }
        </div>
    )
};