import React, { useState, useEffect } from 'react';
import {useQuery} from 'react-query';
import { useAtom } from '@reatom/react';

import {InfoCard} from '../../Molecules/InfoCard/InfoCard';
import {BarChart} from '../../Organisms/BarChart/BarChart';
import {Table} from '../../Organisms/Table/Table';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';

import request from '../../../api/request';

import './dashboardPage.scss';

import {getGraphicsConfig, statistics, table,} from './data';
import { filterAtom } from '../../../store/Filter';
import {convertToQueryString} from '../../../helpers/lib';

export const DashboardPage = () => {
    const [filterData, filterActions] = useAtom(filterAtom)
    const [pushTableData, setPushTableData] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [tableData, setTableData] = useState({table: [], last_page: null});

    useEffect(() => {
        filterActions.reset();
    }, []);

    const dashboardQuery = useQuery(['dashboard'], async () => {
        return request(`dashboard/get-graphics`).then((res) => res.data);
    });

    const dashboardTableQuery = useQuery(['dashboard-table'], async () => {

        return request(`/action-log/get-list?${convertToQueryString({page: pageIndex})}`).then(res => {
            console.log('r',res)
            if (res) {
                setTableData({
                    ...res.data,
                    table: pushTableData ? [
                        ...tableData.table,
                        ...res.data.table,
                    ] : res.data.table
                })
            }

            return res.data
        })
        
    });

    return (
        <div className='dashboardPage'>
            <PageTemplate
                renderPage={({width}) => {
                    return (
                        <div className='dashboardPage__content'>
                            <div className='dashboardPage__balance'>
                                <div className='dashboardPage__header'>
                                    <div className='dashboardPage__title'>
                                        Balance Overview
                                    </div>
                                </div>
                                {
                                    dashboardQuery.data && <div className='dashboardPage__statistics'>
                                        {
                                            statistics.map((item, key) => {
                                                return (
                                                    <div key={key} className='dashboardPage__statisticsItem'>
                                                        {/* <FlowCard {...item} /> */}
                                                        <InfoCard {...item} value={dashboardQuery.data[item.id]}
                                                                  isMobile={width < 768}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    dashboardQuery.data && dashboardQuery.data.graphics &&
                                    <div className='dashboardPage__chart'>
                                        <BarChart data={getGraphicsConfig(dashboardQuery.data.graphics)}/>
                                    </div>
                                }
                            </div>
                            {
                                <div className='dashboardPage__table'>
                                    {
                                        <Table 
                                        hasMore={tableData.last_page === null || tableData.last_page > pageIndex}
                                        fetchMore={() => {
                                            setPageIndex(pageIndex + 1);
                                            setPushTableData(true)
                                        }}
                                        {...table}
                                        data={tableData.table}
                                        />
                                        // : <History historyList={dashboardTableQuery.data.table} />
                                    }
                                </div>

                            }

                        </div>
                    )
                }}
            />
        </div>
    )
};