import React from 'react';

import {useResizeDetector} from 'react-resize-detector';

import {ReferalCard} from '../../Molecules/ReferalCard/ReferalCard';
import {ReferalHeader} from '../../Molecules/ReferalHeader/ReferalHeader';
import {ReferalProgram} from '../../Molecules/ReferalProgram/ReferalProgram';
import {ReferalIncome} from '../../Organisms/ReferalIncome/ReferalIncome';

import './referalTemplate.scss';

export const ReferalTemplate = ({link, cards, program,}) => {

    const {width, height, ref} = useResizeDetector();

    const isMobile = width < 991;

    return (
        <div ref={ref} className={`referalTemplate${isMobile ? ' referalTemplate--isMobile' : ''}`}>
            <div className='referalTemplate__header'>
                <ReferalHeader isMobile={isMobile} link={link}/>
            </div>
            <div className='referalTemplate__cards'>
                {
                    cards.map(card => {
                        return <ReferalCard {...card} />
                    })
                }
            </div>
            <div className='referalTemplate__program'>
                <ReferalProgram program={program} isMobile={isMobile}/>
            </div>
            <div className='referalTemplate__income'>
                <ReferalIncome link={link}/>
            </div>
        </div>
    )
}