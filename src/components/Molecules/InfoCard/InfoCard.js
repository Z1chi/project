import React from 'react';

import { useResizeDetector } from 'react-resize-detector';

import SVG from 'react-inlinesvg';

import './infoCard.scss';

export const InfoCard = ({ isMobile, icon, backgroundColor, title, value, renderSubtitle=(value)=>value?.amount, renderConverted }) => {
    return (
        <div className={`infoCard${isMobile?' infoCard--isMobile':''}`}>
            <div className='infoCard__icon' style={{ backgroundColor }}>
                <SVG src={icon} />
            </div>
            <div className='infoCard__text'>
                <div className='infoCard__title'>
                    {title}
                </div>
                <div className='infoCard__subtitle'>
                {
                    renderSubtitle(value)
                }
                    <span className='infoCard__converted'>
                    {
                        renderConverted && renderConverted(value)
                    }
                    </span>
                </div>
            </div>
        </div>
    )
}