import React from 'react';
import { useQuery } from 'react-query';
import AutoSizer from 'react-virtualized-auto-sizer';

import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';
import { InfoCard } from '../../Molecules/InfoCard/InfoCard';
import { WithdrawCard } from '../../Molecules/WithdrawCard/WithdrawCard';
import { Filter } from '../../Organisms/Filter/Filter';
import { Table } from '../../Organisms/Table/Table';

import request from '../../../api/request';

import { statistics, filters, table } from './data';

import './withdrawPage.scss';

export const WithdrawPage = () => {

    const withdrawQuery = useQuery(['withdraw-table'], () => {
        return request('withdraw/get-withdraws').then(res => res.data);
    })

    const statusFilterQuery = useQuery(['withdraw-statuses'], () => {
        return request('withdraw/get-statuses').then(res => res.data);
    })

    const filtersData = [
        [], 
        [], 
        statusFilterQuery.data || [],
    ]

    return (
        <div className='withdrawPage'>
            <PageTemplate 
                renderPage={({ width })=>{
                    return (
                        <div className='withdrawPage__content'>
                            <div className='withdrawPage__statistics'>
                                <div className='withdrawPage__cards'>
                                {
                                    statistics.map( item => {
                                        return (
                                            <div className='withdrawPage__cardsItem'>
                                                <InfoCard {...item} />
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                <div className='withdrawPage__withdraw'>
                                    <button>Withdraw</button>
                                </div>
                            </div>
                            <div className='withdrawPage__filters'>
                                <Filter filters={filters} data={filtersData} />
                            </div>
                            {   
                                (withdrawQuery.data && withdrawQuery.data.table) &&
                                ( width > 480
                                ? <div className='withdrawPage__table'>
                                    <Table {...table} data={withdrawQuery.data.table} />
                                </div>
                                : <div>
                                    {
                                        withdrawQuery.data.table.map( item => {
                                            return (
                                                <div className='withdrawPage__tableCard'  style={{width}}>
                                                    <WithdrawCard fields={item} config={table.tableConfig} />
                                                </div>
                                            )
                                        })
                                    }
                                </div> )
                            }                            
                        </div>
                    )
                }}
            />
        </div>
    )
}