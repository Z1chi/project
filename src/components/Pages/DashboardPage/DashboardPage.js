import React from 'react';
import { useQuery } from 'react-query';

import AutoSizer from 'react-virtualized-auto-sizer';

import { FlowCard } from '../../Molecules/FlowCard/FlowCard';
import { InfoCard } from '../../Molecules/InfoCard/InfoCard';
import { BarChart } from '../../Organisms/BarChart/BarChart';
import { History } from '../../Organisms/History/History';
import { Table } from '../../Organisms/Table/Table';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import request from '../../../api/request';

import './dashboardPage.scss';

import { getGraphicsConfig, statistics, table, } from './data';

export const DashboardPage = () => {

    const dashboardQuery = useQuery(['dashboard'], async () => {
        return request(`dashboard/get-graphics`).then((res) => res.data);
    });

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
                                { dashboardQuery.data && <div className='dashboardPage__statistics'>
                                {
                                    statistics.map( (item,key) => {
                                        return (
                                            <div key={key} className='dashboardPage__statisticsItem'>
                                                {/* <FlowCard {...item} /> */}
                                                <InfoCard {...item} value={dashboardQuery.data[item.id]} />
                                            </div>
                                        )
                                    })
                                }
                                </div> }
                                { dashboardQuery.data && <div className='dashboardPage__chart'>
                                    <BarChart data={getGraphicsConfig(dashboardQuery.data.graphics)} />
                                </div> }
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