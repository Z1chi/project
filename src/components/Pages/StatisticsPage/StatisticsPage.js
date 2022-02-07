import React, {useEffect, useState} from 'react';
import {useAtom} from '@reatom/react';
import {useQueries, useQuery} from "react-query";
import request from "../../../api/request";

import {Table} from '../../Organisms/Table/Table';
import {Filter} from '../../Organisms/Filter/Filter';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';

import {filters, filterFormators, table} from './data';
import {filterAtom} from '../../../store/Filter';
import {convertToQueryString} from '../../../helpers/lib';

import './statisticsPage.scss';

export const StatisticsPage = () => {

    const [filterData, filterActions] = useAtom(filterAtom);
    const [operationIndex, setOperationIndex] = useState(0);
    const [pushTableData, setPushTableData] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [tableData, setTableData] = useState({table: [], last_page: null});

    useEffect(() => {
        filterActions.reset();
    }, []);

    const statisticsQuery = useQuery(['statistics', pageIndex, operationIndex,], () => {
        const filterQueryData = {};
        for (const filterFieldId in filterData.fields) {
            const filterFieldValue = filterFormators[filterFieldId](filterData.fields[filterFieldId]);
            if (filterFieldValue) {
                filterQueryData[filterFieldId] = filterFieldValue
            }
        }
        return request(`/statistic/get-statistic?${convertToQueryString({page: pageIndex, ...filterQueryData})}`).then(res => {

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

    const statisticsFiltersQueryList = useQueries([
        {
            queryKey: ['statisticsFilters', 'format'], queryFn: () => {
                return request('/smartlink/formats').then(res => res.data);
            }
        },
        {
            queryKey: ['statisticsFilters', 'country'], queryFn: () => {
                return request('/country/get-countries').then(res => res.data);
            }
        },
        {
            queryKey: ['statisticsFilters', 'smartlink'], queryFn: () => {
                return request('/smartlink/get-smartlinks-filter').then(res => res.data);
            }
        },
        {
            queryKey: ['statisticsFilters', 'offers'], queryFn: () => {
                return request('/offers/get-offers-filter').then(res => res.data);
            }
        },
    ]);

    const filtersData = [
        [],
        ...statisticsFiltersQueryList.map(filterQuery => {
            return filterQuery.data || [];
        })
    ];
    return (
        <div className='statisticsPage'>
            <PageTemplate
                renderPage={() => {
                    return (
                        <div className='statisticsPage__content'>
                            <div className='statisticsPage__filters'>
                                <Filter filters={filters} data={filtersData} onSave={
                                    () => {
                                        setPageIndex(1);
                                        setOperationIndex(operationIndex + 1);
                                        setPushTableData(false)
                                    }
                                }/>
                            </div>
                            <div className='statisticsPage__table'>
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
                            </div>

                        </div>
                    )
                }}
            />
        </div>
    )
};