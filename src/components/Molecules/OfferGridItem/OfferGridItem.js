import React from 'react';
import {Link} from "react-router-dom";
import SVG from 'react-inlinesvg';

import './offerGridItem.scss';


export const OfferGridItem = ({id, icon, title, renderContent, data, width, offerQuery}) => {

    const isSlider = width < 511 && id === 'advertismentExamples';
    return (
        <div className={`offerGridItem${isSlider ? ' offerGridItem--slider' : ''}`}>
            <div className='offerGridItem__title'>
                <div className='offerGridItem__titleIcon'>
                    <SVG src={icon}/>
                </div>
                <div className='offerGridItem__titleText'>
                    <p>{title}</p>
                    {isSlider && <Link className='offerGridItem__titleLink' to={`/creatives/${offerQuery?.id}`}>Show all</Link>}
                </div>
            </div>
            <div className='offerGridItem__content'>
                {renderContent({data, width, ...offerQuery})}
            </div>
        </div>
    )
};