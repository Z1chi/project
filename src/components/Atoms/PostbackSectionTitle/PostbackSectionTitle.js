import React from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './postbackSectionTitle.scss';

export const PostbackSectionTitle = ({ text, info }) => {
    return (
        <div className='postbackSectionTitle'>
            <div className='postbackSectionTitle__text'>
                {text}
            </div>
            {
                info && <div className='postbackSectionTitle__info'>
                    <SVG src={images.infoIcon} />
                </div>
            }
        </div>
    )
}