import React from 'react';

import {useResizeDetector} from 'react-resize-detector';

import SVG from 'react-inlinesvg';

import './infoCard.scss';

export const InfoCard = (
    {
        isMobile,
        icon,
        backgroundColor,
        title,
        value,
        prevValue,
        renderSubtitle = (value) => value?.amount,
        renderConverted,
        iconSize = '50px'
    }) => {
    return (
        <div className={`infoCard${isMobile ? ' infoCard--isMobile' : ''}`}>
            <div className='infoCard__icon' style={{backgroundColor: backgroundColor, width: iconSize, height: iconSize}}>
                <SVG src={icon}/>
            </div>
            <div className='infoCard__text'>
                <div className='infoCard__title'>
                    {title}
                </div>
                <div className='infoCard__subtitle'>
                    {
                        renderSubtitle(value)
                    }
                </div>

                <div className='infoCard__converted'>
                    {
                        renderConverted && prevValue && renderConverted(prevValue)
                    }
                </div>
            </div>
        </div>
    )
};