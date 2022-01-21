import React, { useState } from 'react';
import { useAtom } from '@reatom/react';
import {useQueries, useQuery} from "react-query";
import request from "../../../api/request";

import { Table } from '../../Organisms/Table/Table';
import { Filter } from '../../Organisms/Filter/Filter';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import { filters, table } from './data';
import { filterAtom } from '../../../store/Filter';
import { convertToQueryString } from '../../../helpers/convertToQueryString';

import './statisticsPage.scss';

export const StatisticsPage = () => {

    const [filterData, filterActions] = useAtom(filterAtom);
    const [operationIndex, setOperationIndex] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [tableData, setTableData] = useState({ table: [], last_page: null});

    const statisticsQuery = useQuery(['statistics', pageIndex, operationIndex], () => {
        return request(`/statistic/get-statistic?${convertToQueryString({page: pageIndex, ...filterData.fields})}`).then(res => { 

            if(res) {
                setTableData({
                    ...res.data,
                    table: [
                        ...tableData.table,
                        ...res.data.table,
                    ]
                })
            }

            return res.data
        })
    });

    const statisticsFiltersQueryList = useQueries([
        { queryKey: ['statisticsFilters', 'format'], queryFn: () => {
            return request('/smartlink/formats').then(res => res.data);
        } },
        { queryKey: ['statisticsFilters', 'country'], queryFn: () => {
            return request('/country/get-countries').then(res => res.data);
        } },
        { queryKey: ['statisticsFilters', 'smartlink'], queryFn: () => {
            return request('/smartlink/get-smartlinks-filter').then(res => res.data);
        } },
        { queryKey: ['statisticsFilters', 'offers'], queryFn: () => {
            return request('/offers/get-offers-filter').then(res => res.data);
        } },
    ]);

    const filtersData = [
        [],
        ...statisticsFiltersQueryList.map( filterQuery => {
            return filterQuery.data || [];
        })
    ]
    return (
        <div className='statisticsPage'>
            <PageTemplate
                renderPage={() => {
                    return (
                        <div className='statisticsPage__content'>
                            <div className='statisticsPage__filters'>
                                <Filter filters={filters} data={filtersData} onSave={
                                    ()=>{
                                        setOperationIndex(operationIndex+1)
                                    }
                                } />
                            </div>
                            <div className='statisticsPage__table'>
                                <Table
                                    hasMore={tableData.last_page===null || tableData.last_page > pageIndex}
                                    fetchMore={()=>{
                                        setPageIndex(pageIndex+1)
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