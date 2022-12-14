import React from 'react';

import './tableCell.scss';

export const TableCell = ({ rowId, item, columnWidth, renderRowItem = (item => item), isGroupEnd}) => {
    return (
        <div className={`tableCell${isGroupEnd ? " tableCell--last" : ""}`} style={{ minWidth: columnWidth,}}>
        {
            <div>{renderRowItem(item, rowId)}</div>
        }
        </div>
    )
};