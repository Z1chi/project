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
import { TableEmpty } from '../../Molecules/TableEmpty/TableEmpty';
import { Loader } from '../../Atoms/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { images } from './images';
import { ChartCalendar } from '../../Organisms/Calendar/ChartCalendar';

export const DashboardPage = () => {
    const history = useHistory();
    const [filterData, filterActions] = useAtom(filterAtom)
    const [pushTableData, setPushTableData] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [tableData, setTableData] = useState(null);
    const [period, setPeriod] = useState(null);

    useEffect(() => {
        filterActions.reset();
    }, []);

    const dashboardQuery = useQuery(['dashboard',period], async () => {
        return request(`dashboard/get-graphics?${convertToQueryString({...period})}`).then((res) => res.data);
    });

    const dashboardTableQuery = useQuery(['dashboard-table', pageIndex,], async () => {

        return request(`/action-log/get-list?${convertToQueryString({page: pageIndex})}`).then(res => {
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
                renderPage={({width, contentData}) => {
                    return (
                        <div className='dashboardPage__content'>
                            <div className={`dashboardPage__balance${width<440?' dashboardPage__balance--isMobile':''}`}>
                                <div className='dashboardPage__period'>
                                    <ChartCalendar changeHandler={setPeriod} isMobile={width<640} />
                                </div>
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
                                                        <InfoCard {...item} value={dashboardQuery.data[item.id]} prevValue={dashboardQuery.data[item.prevId]}
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
                                        <BarChart isEmpty={dashboardQuery.data.graphics.find(item => !(item.income && item.turnover))} data={getGraphicsConfig(dashboardQuery.data.graphics)}/>
                                    </div>
                                }
                            </div>
                            {
                                <div className='dashboardPage__table'>
                                    {
                                        tableData
                                        ? <Table 
                                            hasMore={tableData.last_page === null || tableData.last_page > pageIndex}
                                            fetchMore={() => {
                                                history.push('/actionLogs')
                                            }}
                                            loadMoreText='See more'
                                            isFetching={dashboardTableQuery.isFetching}
                                            {...table}
                                            emptyTable={{
                                                icon: images.emptyTableIcon,
                                                text: contentData.data.actionLog.emptyTable,
                                                button: {
                                                    text: 'Explore offers',
                                                    link: '/offers',
                                                }
                                            }}
                                            data={tableData.table}
                                        />
                                        : <TableEmpty loader={Loader} />
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