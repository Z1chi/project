import React from 'react';

import {Link} from 'react-router-dom';

import config from '../../../configApi'

import './creativesOffer.scss';

export const CreativesOffer = ({id, image, title, url, small_description,}) => {
    return (
        <div className='creativesOffer'>
            <div className='creativesOffer__logo'>
                <img src={`${config.root}${image}`} alt=''/>
            </div>
            <div className='creativesOffer__info'>
                <div className='creativesOffer__title'>
                    {title}
                </div>

                <a className='creativesOffer__link' href={url} target='blank'>{url}</a>

                <div className='creativesOffer__description'>
                    {small_description}
                </div>
                <div className='creativesOffer__more'>
                    <Link to={`/creatives/${id}`}>See creatives</Link>
                </div>
            </div>
        </div>
    )
}