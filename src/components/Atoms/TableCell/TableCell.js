import React from 'react';

import './tableCell.scss';

export const TableCell = ({ rowId, item, columnWidth, renderRowItem = (item => item), isGroupEnd}) => {
    return (
        <div className={`tableCell${isGroupEnd ? " tableCell--last" : ""}`} style={{ minWidth: columnWidth, width: '100%' }}>
        {
            <p>{renderRowItem(item, rowId)}</p>
        }
        </div>
    )
}