import React from 'react';

import { ReferalLink } from '../../Atoms/ReferalLink/ReferalLink';

import './referalHeader.scss';

export const ReferalHeader = ({ link, isMobile }) => {

    return (
        <div className={`referalHeader${isMobile?' referalHeader--isMobile':''}`}>
            <div className='referalHeader__title'>
                <h1>
                    <span className='referalHeader__getPaid'>Get Paid</span>
                    &nbsp;for Bringing People to Trafburg.
                </h1>
            </div>

            <div className='referalHeader__info'>
                <div className='referalHeader__description'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </p>
                </div>

                <div className='referalHeader__link'>
                    <ReferalLink link={link} isHighlighted={true} />
                </div>
            </div>
        </div>
    )
}