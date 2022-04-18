import React, {useState, useEffect} from 'react';
import {useAtom} from '@reatom/react';
import {useQueries, useQuery} from 'react-query';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {FlowCard} from '../../Molecules/FlowCard/FlowCard';
import {Filter} from '../../Organisms/Filter/Filter';
import {Table} from '../../Organisms/Table/Table';

import {actionLogsStatisticsConfig, filters, filterFormators, table} from './data';
import {filterAtom} from '../../../store/Filter';

import {convertToQueryString} from '../../../helpers/lib';
import request from '../../../api/request';

import './actionLogsPage.scss';
import {useResizeDetector} from "react-resize-detector";
import {images} from "./images";
import { TableEmpty } from '../../Molecules/TableEmpty/TableEmpty';
import { Loader } from '../../Atoms/Loader/Loader';


export const ActionLogsPage = () => {

    const [filterData, filterActions] = useAtom(filterAtom);
    const [operationIndex, setOperationIndex] = useState(0);
    const [pushTableData, setPushTableData] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [tableData, setTableData] = useState(null);
    const {width, ref} = useResizeDetector();
    useEffect(() => {
        filterActions.reset();
    }, []);

    const actionLogsStatisticsQuery = useQuery(['action-logs/statistics',], () => {
        return request('/action-log/total').then(res => res.data);
    });

    const actionLogsTableQuery = useQuery(['action-logs/table', pageIndex, operationIndex], () => {
        const filterQueryData = {};
        for (const filterFieldId in filterData.fields) {
            const filterFieldValue = filterFormators[filterFieldId](filterData.fields[filterFieldId]);
            if (filterFieldValue) {
                filterQueryData[filterFieldId] = filterFieldValue
            }
        }
        return request(`/action-log/get-list?${convertToQueryString({page: pageIndex, ...filterQueryData})}`).then(res => {

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

    const actionLogsFiltersQueryList = useQueries([
        {
            queryKey: ['actionLogFilters', 'offers'], queryFn: () => {
                return request('/offers/get-offers-filter').then(res => res.data);
            }
        },
        {
            queryKey: ['actionLogFilters', 'smartlink'], queryFn: () => {
                return request('/smartlink/get-smartlinks-filter').then(res => res.data);
            }
        },
        {
            queryKey: ['actionLogFilters', 'action'], queryFn: () => {
                return request('/action-log/get-actions-filter').then(res => res.data);
            }
        },
    ]);

    const filtersData = [
        [],
        ...actionLogsFiltersQueryList.map(filterQuery => {
            return filterQuery.data || [];
        })
    ];
    const isMobile = width < 660;
    return (
        <div className='actionLogsPage'>
            <PageTemplate
                renderPage={({contentData}) => {
                    return (
                        <div className='actionLogsPage__content'>
                            <div className='actionLogsPage__statistics'>
                                {
                                    actionLogsStatisticsQuery.data &&
                                    actionLogsStatisticsConfig.map((configItem, key) => {
                                        return (
                                            <div key={key} className='actionLogsPage__statisticsItem'>
                                                <FlowCard {...actionLogsStatisticsQuery.data[configItem.id]}
                                                          icon={configItem.icon}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='actionLogsPage__table'>
                                <div ref={ref} className='actionLogsPage__tableFilter'>
                                    <Filter filters={filters}
                                            data={filtersData}
                                            isMobile={isMobile}
                                            onSave={
                                                () => {
                                                    setPageIndex(1);
                                                    setOperationIndex(operationIndex + 1);
                                                    setPushTableData(false)
                                                }
                                            }/>
                                </div>
                                <div className='actionLogsPage__tableData'>
                                    {
                                        tableData
                                        ? <Table
                                            hasMore={tableData.last_page === null || tableData.last_page > pageIndex}
                                            fetchMore={() => {
                                                setPageIndex(pageIndex + 1);
                                                setPushTableData(true)
                                            }}
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
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
};
