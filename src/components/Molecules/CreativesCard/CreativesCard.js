import React from 'react';

import SVG from 'react-inlinesvg';

import './creativesCard.scss';

export const CreativesCard = ({ onClick, modalData, logo, category, moreButton, downloadButton, }) => {
    return (
        <div className='creativesCard' onClick={() => onClick({ creativesData: modalData })}>
            <div className='creativesCard__logo'>
                <img src={logo} alt='' />
            </div>
            <div className='creativesCard__footer'>
                <div className='creativesCard__category'>
                    {category}
                </div>
                <div className='creativesCard__more' onClick={moreButton.onClick} >
                    <SVG src={moreButton.icon} />
                </div>
                <div className='creativesCard__download' onClick={downloadButton.onClick} >
                    <SVG src={downloadButton.icon} />
                </div>
            </div>
        </div>
    )
}