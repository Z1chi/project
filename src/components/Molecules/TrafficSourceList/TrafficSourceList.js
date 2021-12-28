import React, {useState} from 'react';
import SVG from 'react-inlinesvg';

import {SelectionItem} from "../../Atoms/SelectionItem/SelectionItem";

import arrow from './images/arrowIcon.svg'

import './trafficSourceList.scss';


export const TrafficSourceList = ({sources, width}) => {

    const [openList, setOpenList] = useState(false);

    const allowedSourceArray = sources.filter(({statusId}) => statusId === 10);
    const restrictedSourceArray = openList ? sources.filter(({statusId}) => statusId === 20) : [];
    const sortSourceArray = [...allowedSourceArray, ...restrictedSourceArray];

    return (
        <div className='trafficSourceList'>
            <div className={`trafficSourceList__showList${width < 511 ? ' trafficSourceList__showList--isMobile' : ''}`}>
                {sortSourceArray && sortSourceArray.map(({title, statusId}, key) =>
                    <div className='trafficSourceList__item'>
                        <SelectionItem
                            key={`selectionItem${key}`}
                            title={title}
                            isSelected={statusId === 10}/>
                    </div>
                )}
            </div>

            <div
                className='trafficSourceList__showButton'
                onClick={() => setOpenList(!openList)}
            >
                <p>{ openList ? 'Show less' : 'Show restricted traffic source' }</p>
                <SVG src={arrow}
                     className={`trafficSourceList__arrowIcon${openList ? ' trafficSourceList__arrowIcon--open' : ''}`}/>
            </div>
        </div>
    )
};