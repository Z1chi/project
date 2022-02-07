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


export const ActionLogsPage = () => {

    const [filterData, filterActions] = useAtom(filterAtom);
    const [operationIndex, setOperationIndex] = useState(0);
    const [pushTableData, setPushTableData] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [tableData, setTableData] = useState({table: [], last_page: null});

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

    return (
        <div className='actionLogsPage'>
            <PageTemplate
                renderPage={() => {
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
                                <div className='actionLogsPage__tableFilter'>
                                    <Filter filters={filters} data={filtersData} onSave={
                                        () => {
                                            setPageIndex(1);
                                            setOperationIndex(operationIndex + 1);
                                            setPushTableData(false)
                                        }
                                    }/>
                                </div>
                                <div className='actionLogsPage__tableData'>
                                    {
                                        <Table
                                            hasMore={tableData.last_page === null || tableData.last_page > pageIndex}
                                            fetchMore={() => {
                                                setPageIndex(pageIndex + 1);
                                                setPushTableData(true)
                                            }}
                                            {...table}
                                            data={tableData.table}
                                            emptyTable={table.emptyTable}
                                        />
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
