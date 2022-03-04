import React from 'react';

import { TableCell } from '../../Atoms/TableCell/TableCell';

import './tableRow.scss';

export const TableRow = ({ tableConfig, row }) => {
    return (
        <div className='tableRow'>
        {
            tableConfig.map( ({ columnId, columnWidth, renderRowItem, isGroupEnd }, key) => {
                return (
                    // <div key={key} className='tableRow__cell'>
                        <TableCell
                            key={`cell${row.id}${key}`}
                            rowId={row.id}
                            item={row[columnId]} 
                            columnWidth={columnWidth}
                            renderRowItem={renderRowItem}
                            isGroupEnd={isGroupEnd}
                        />
                    // </div>
                )
            })
        }
        </div>
    )
};