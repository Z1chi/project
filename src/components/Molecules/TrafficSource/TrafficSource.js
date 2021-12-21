import React, {useState} from 'react';

import { TrafficSourceItem } from '../../Atoms/TrafficSourceItem/TrafficSourceItem';

import SVG from 'react-inlinesvg';

import './trafficSource.scss';

export const TrafficSource = ({ items, restrictedItems }) => {
    
    const [withRestricted, setWithRestricted] = useState(null);

    return (
        <div className='trafficSource'>
            <div className='trafficSource__items'>
            {
                items.map( item => {
                    return (
                        <div className='trafficSource__item'>
                            <TrafficSourceItem {...item} />
                        </div>
                    )
                })
            }
            </div>
            <div className='trafficSource__expander'>
            {
                withRestricted
                ? <>
                    <div className='trafficSource__expanderText'>
                        Show less
                    </div>
                    <div className='trafficSource__expanderIcon'>
                        <SVG src={''} />
                    </div>
                </>
                : <>
                    <div className='trafficSource__expanderText'>
                        Show restricted traffic source
                    </div>
                    <div className='trafficSource__expanderIcon'>
                        <SVG src={''} />
                    </div>
                </>
            }
            </div>
        </div>
    )
}