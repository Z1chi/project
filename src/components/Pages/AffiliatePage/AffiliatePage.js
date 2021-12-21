import React from 'react';
import { InfoCard } from '../../Molecules/InfoCard/InfoCard';
import { Filter } from '../../Organisms/Filter/Filter';
import { Table } from '../../Organisms/Table/Table';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';
import { ReferalPage } from '../ReferalPage/ReferalPage';

import './affiliatePage.scss';
import { statistics, filters, table } from './data';

export const AffiliatePage = () => {
    return (
        <div className='affiliatePage'>
            <PageTemplate 
                renderPage={({ width })=>{
                    return (
                        <div className='affiliatePage__content'>
                            <div className='affiliatePage__statistics'>
                            {
                                statistics.map( item => {
                                    return (
                                        <div className='affiliatePage__statisticsItem'>
                                            <InfoCard {...item} isMobile={width<768} />
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div className='affiliatePage__filters'>
                                <Filter filters={filters} />
                            </div>
                            <div className='affiliatePage__table'>
                                <Table {...table} />
                            </div>
                            <div className='affiliatePage__referal'>
                                <ReferalPage />
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}