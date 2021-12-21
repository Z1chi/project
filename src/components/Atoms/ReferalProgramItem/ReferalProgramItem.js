import React from 'react';

import './referalProgramItem.scss';

export const ReferalProgramItem = ({ image, stepNumber, title, description }) => {
    return (
        <div className='referalProgramItem'>
            <div className='referalProgramItem__image'>
                <img src={image} alt={''} />
            </div>
            <div className='referalProgramItem__title'>
                <div className='referalProgramItem__titleStep'>
                    {stepNumber}
                </div>
                <div className='referalProgramItem__titleText'>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className='referalProgramItem__description'>
                <p>{description}</p>
            </div>
        </div>
    )
}