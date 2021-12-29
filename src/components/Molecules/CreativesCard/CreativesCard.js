import React from 'react';

import SVG from 'react-inlinesvg';
import config from '../../../configApi'

import './creativesCard.scss';

export const CreativesCard = ({onClick, modalData, preview_src, category, moreButton, downloadButton, width}) => {
    const isMobile = width < 600;

    return (
        <div className={`creativesCard${isMobile ? ' creativesCard--isMobile' : ''}`}>
            <div className='creativesCard__logo'
                 onClick={() => onClick({creativesData: modalData})}>
                <img src={`${config.root}${preview_src}`} alt=''/>
            </div>
            <div className='creativesCard__footer'>
                <p className='creativesCard__category'>
                    {category}
                </p>
                <div className='creativesCard__footerButtons'>
                    <div className='creativesCard__more' onClick={moreButton.onClick}>
                        <SVG src={moreButton.icon}/>
                    </div>
                    <div className='creativesCard__download' onClick={downloadButton.onClick}>
                        <SVG src={downloadButton.icon}/>
                    </div>
                </div>
            </div>
        </div>
    )
};