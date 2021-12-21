import React from 'react';
import { Link } from 'react-router-dom';

import './offerSimilarItem.scss';

export const OfferSimilarItem = ({ logo, background }) => {
    return (
        <div className='offerSimilarItem' style={{ background }}>
            <Link to=''>
                <div className='offerSimilarItem__logo'>
                    <img src={''} />
                </div>
            </Link>
        </div>
    )
}