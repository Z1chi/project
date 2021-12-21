import React from 'react';

import './tableCell.scss';

export const TableCell = ({ rowId, item, columnWidth, renderRowItem = (item => item),isGroupEnd}) => {
    return (
        <div className={`tableCell${isGroupEnd ? " tableCell--last" : ""}`} style={{ width: columnWidth }}>
        {
            renderRowItem(item, rowId)
        }
        </div>
    )
}