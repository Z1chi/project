import React from 'react';

import './offerPaymentParam.scss'

export const OfferPaymentParam = ({param, isMobile, styles}) => {

    const titlePaymentParam = () => param[0] === "region" ? "Region:" : param[0] === "min_deposit" ? "Minimum Deposit:" : param[0];

    return (
        <div className={`offerPaymentParam${isMobile ? ' offerPaymentParam--isMobile' : ''}`} style={styles}>
            <p className='offerPaymentParam__name'>
                {titlePaymentParam()}
            </p>
            <div className='offerPaymentParam__value'>
                {
                    param[1]
                }
            </div>
        </div>
    )
};