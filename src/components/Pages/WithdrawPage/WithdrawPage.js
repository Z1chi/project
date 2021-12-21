import React from 'react';

import { InfoCard } from '../../Molecules/InfoCard/InfoCard';
import { Filter } from '../../Organisms/Filter/Filter';
import { Table } from '../../Organisms/Table/Table';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import AutoSizer from 'react-virtualized-auto-sizer';

import { statistics, filters, table } from './data';

import './withdrawPage.scss';
import { WithdrawCard } from '../../Molecules/WithdrawCard/WithdrawCard';

export const WithdrawPage = () => {
    return (
        <div className='withdrawPage'>
            <PageTemplate 
                renderPage={()=>{
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
                                <Filter filters={filters} />
                            </div>
                            <AutoSizer>
                                {({height, width}) => {
                                    return (
                                        width > 480
                                        ? <div className='withdrawPage__table' style={{height, width}}>
                                            <Table {...table} />
                                        </div>
                                        : <div>
                                            {
                                                table.data.map( item => {
                                                    return (
                                                        <div className='withdrawPage__tableCard'  style={{width}}>
                                                            <WithdrawCard fields={item} config={table.tableConfig} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                            }}
                            </AutoSizer>
                            
                        </div>
                    )
                }}
            />
        </div>
    )
}