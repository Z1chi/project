import React from 'react';
import {useQuery,} from 'react-query';

import {CreativesOffer} from '../../Molecules/CreativesOffer/CreativesOffer';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';

import request from '../../../api/request';
import {creatives} from './data';

import './creativesPage.scss';

export const CreativesPage = () => {

    const faqQuery = useQuery('creatives', async () =>
        request('creative/get-offers').then((res) => res.data));


    return (
        <div className='creativesPage'>
            <PageTemplate
                renderPage={() =>
                    <div className='creativesPage'>
                        <div className='creativesPage__title'>
                            <h2>Choose offer</h2>
                        </div>
                        <div className='creativesPage__offers'>
                            {faqQuery.data && faqQuery.data.map((item, key) => {
                                return (
                                    <div key={`creativesPage__offersItem${key}`}
                                         className='creativesPage__offersItem'>
                                        <CreativesOffer {...item} />
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                }
            />
            {/* <Calendar /> */}
        </div>
    )
};