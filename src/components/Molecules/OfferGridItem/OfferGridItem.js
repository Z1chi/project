import React from 'react';
import SVG from 'react-inlinesvg';

import './offerGridItem.scss';
import {Link} from "react-router-dom";

export const OfferGridItem = ({id, icon, title, renderContent, data, width, kek}) => {

    const isSlider = width < 511 && id === 'advertismentExamples';
    return (
        <div className={`offerGridItem${isSlider ? ' offerGridItem--slider' : ''}`}>
            <div className='offerGridItem__title'>
                <div className='offerGridItem__titleIcon'>
                    <SVG src={icon}/>
                </div>
                <div className='offerGridItem__titleText'>
                    <p>{title}</p>
                    {isSlider && <Link className='offerGridItem__titleLink' to="/">Show all</Link>}
                </div>
            </div>
            <div className='offerGridItem__content'>
                {renderContent({data, width})}
            </div>
        </div>
    )
};