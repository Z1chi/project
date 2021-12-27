import React from 'react';

import './offerDemoAccount.scss';

export const OfferDemoAccount = ({demoAccounts}) => {
    return (
        <div className='offerDemoAccount'>
            {
                demoAccounts && demoAccounts.map(({link, password, login}, key) =>
                    <div className='offerDemoAccount__info' key={`offerDemoAccount__info${key}`}>
                        <div className='offerDemoAccount__row'>
                            <span>Login:</span>
                            <p className='offerDemoAccount__value'>{login}</p>
                        </div>
                        <div className='offerDemoAccount__row'>
                            <span>Password:</span>
                            <p className='offerDemoAccount__value'>{password}</p>
                        </div>
                        <div className='offerDemoAccount__row'>
                            <span>Link:</span>
                            <a className='offerDemoAccount__link' href={link}>{link}</a>
                        </div>
                    </div>
                )
            }
        </div>
    )
};