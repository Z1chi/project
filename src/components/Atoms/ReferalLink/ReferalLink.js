import React from 'react';

import SVG from 'react-inlinesvg'

import './referalLink.scss';

export const ReferalLink = ({ link, isHighlighted }) => {
    return (
        <div className='referalLink'>
            <div className='referalLink__title'>
                <h3>Your referal link:</h3>
            </div>
            <div className={`referalLink__link${isHighlighted?' referalLink__link--highlighted':''}`}>
                <div className='referalLink__text'>
                    <a href={link.to}>{link.text}</a>
                </div>
                <div className='referalLink__copy'>
                    <SVG src={''} />
                </div>
            </div>
        </div>
    )
}