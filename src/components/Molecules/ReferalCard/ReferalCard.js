import React from 'react';

import './referalCard.scss';

export const ReferalCard = ({ value, gradient, renderTitle, renderDescription }) => {
    return (
        <div className='referalCard'>
            <div className='referalCard__circles'>
                <div className='referalCard__circle referalCard__circle--value' style={{background: gradient}}>
                    {value}
                </div>
                <div className='referalCard__circle referalCard__circle--percent' style={{background: gradient}}>
                    %
                </div>
            </div>
            <div className='referalCard__info'>
                <div className='referalCard__title'>
                {
                    renderTitle({ gradient })
                }
                </div>
                <div className='referalCard__description'>
                {
                    renderDescription({ value })
                }
                </div>
            </div>
        </div>
    )
}