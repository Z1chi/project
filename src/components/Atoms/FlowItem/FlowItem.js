import React from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import { flowList } from '../../Molecules/FlowCard/constants/difference';

import './flowItem.scss';

const flowArrows = {
    [flowList.increase]: images.arrowUpIcon,
    [flowList.decrease]: images.arrowDownIcon,
};

export const FlowItem = ({ difference, flow }) => {
    const { increase, decrease } = flowList;
    return (
        <div className={`flowItem${flow===increase?' flowItem--up':flow===decrease?' flowItem--down':''}`}>
            <div className='flowItem__arrow'>
                <SVG src={flowArrows[flow]} />
            </div>
            <div className='flowItem__difference'>
                <p>{difference.toFixed(1)}%</p>
            </div>
        </div>
    )
}