import React from 'react';

import SVG from 'react-inlinesvg';
import config from '../../../configApi'

import './creativesCard.scss';

export const CreativesCard = ({ onClick, modalData, preview_src, category, moreButton, downloadButton, }) => {
    return (
        <div className='creativesCard' onClick={() => onClick({ creativesData: modalData })}>
            <div className='creativesCard__logo'>
                <img src={`${config.root}${preview_src}`} alt='' />
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
};