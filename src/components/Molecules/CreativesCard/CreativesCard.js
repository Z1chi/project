import React from 'react';

import SVG from 'react-inlinesvg';

import './creativesCard.scss';

export const CreativesCard = ({onClick, modalData, preview_src, category, moreButton, downloadButton, width, file}) => {
    const isMobile = width < 600;

    return (
        <div className={`creativesCard${isMobile ? ' creativesCard--isMobile' : ''}`}>
            <div className='creativesCard__logo'
                 onClick={() => onClick({creativesData: modalData})}>
                <img src={`${process.env.MEDIA_URL}${preview_src}`} alt=''/>
            </div>
            <div className='creativesCard__footer'>
                <p className='creativesCard__category'>
                    {category}
                </p>
                <div className='creativesCard__footerButtons'>
                    <div className='creativesCard__more' onClick={moreButton.onClick}>
                        <SVG src={moreButton.icon}/>
                    </div>
                    <a className='creativesCard__download' href={process.env.MEDIA_URL + file} download={file} onClick={downloadButton.onClick}>
                        <SVG src={downloadButton.icon}/>
                    </a>
                </div>
            </div>
        </div>
    )
};