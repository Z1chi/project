import React from 'react';
import { ReferalLink } from '../../Atoms/ReferalLink/ReferalLink';

import './referalIncome.scss';

export const ReferalIncome = ({ link }) => {
    return (
        <div className='referalIncome'>
            <div className='referalIncome__info'>
                <div className='referalIncome__title'>
                    <h2>Don’t hold back!</h2>
                </div>
                <div className='referalIncome__subtitle'>
                    <h3>Recommend Trafburg.com and receive passive income stress-free</h3>
                </div>
                <div className='referalIncome__link'>
                    <ReferalLink link={link} />
                </div>
            </div>
            <div className='referalIncome__map'>

            </div>
        </div>
    )
}