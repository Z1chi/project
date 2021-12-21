import React from 'react';

import './referalMapMarker.scss';

export const ReferalMapMarker = () => {
    return (
        <div className='referalMapMarker'>
            <div className='referalMapMarker__info'>
                <div className='referalMapMarker__title'>

                </div>
                <div className='referalMapMarker__income'>

                </div>
            </div>
            <div className='referalMapMarker__pointer'>
                <div className='referalMapMarker__line'></div>
                <div className='referalMapMarker__circle'></div>
            </div>
        </div>
    )
}