import React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';

import { FlowCard } from '../../Molecules/FlowCard/FlowCard';
import { BarChart } from '../../Organisms/BarChart/BarChart';
import { History } from '../../Organisms/History/History';
import { Table } from '../../Organisms/Table/Table';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import './dashboardPage.scss';

import { statistics, table, } from './data';

export const DashboardPage = () => {
    return (
        <div className='dashboardPage'>
            <PageTemplate 
                renderPage={()=>{
                    return (
                        <div className='dashboardPage__content'>
                            <div className='dashboardPage__balance'>
                                <div className='dashboardPage__header'>
                                    <div className='dashboardPage__title'>
                                        Balance Overview
                                    </div>
                                    <div className='dashboardPage__calendar'>
                                    
                                    </div>
                                </div>
                                <div className='dashboardPage__statistics'>
                                {
                                    statistics.map( (item,key) => {
                                        return (
                                            <div key={key} className='dashboardPage__statisticsItem'>
                                                <FlowCard {...item} />
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                <div className='dashboardPage__chart'>
                                    <BarChart />
                                </div>
                            </div>
                            <AutoSizer>
                                {({height, width}) => {
                                    return (
                                        <div className='dashboardPage__table' style={{ height, width }}>
                                        {
                                            width > 480
                                            ? <Table {...table} />
                                            : <History historyList={table.data} />
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
};