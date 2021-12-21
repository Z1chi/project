import React from 'react';
import { Link } from 'react-router-dom';

import './creativesOffer.scss';

export const CreativesOffer = ({ id, logo, title, link, description, }) => {
    return (
        <div className='creativesOffer'>
            <div className='creativesOffer__logo'>
                <img src={logo} alt='' />
            </div>
            <div className='creativesOffer__info'>
                <div className='creativesOffer__title'>
                    {title}
                </div>
                <div className='creativesOffer__link'>
                    <Link to={link.to}>{link.text}</Link>
                </div>
                <div className='creativesOffer__description'>
                    {description}
                </div>
                <div className='creativesOffer__more'>
                    <Link to={`/creatives/${id}`} >See creatives</Link>
                </div>
            </div>
        </div>
    )
}