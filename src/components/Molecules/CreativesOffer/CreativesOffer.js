import React from 'react';

import {Link} from 'react-router-dom';

import './creativesOffer.scss';

export const CreativesOffer = ({id, image, title, url, small_description,contentData}) =>

    <div className='creativesOffer'>
        <div className='creativesOffer__logo'>
            <img src={process.env.MEDIA_URL + image} alt=''/>
        </div>
        <div className='creativesOffer__info'>
            <div className='creativesOffer__title'>
                {title}
            </div>

            <a className='creativesOffer__link' href={url} target='blank'>{url}</a>

            <div className='creativesOffer__description'>
                {small_description}
            </div>

        </div>
        <div className='creativesOffer__more'>
            <Link to={`/creatives/${id}`}>{contentData.button}</Link>
        </div>
    </div>;

