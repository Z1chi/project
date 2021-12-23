import React from 'react';
import {useQueries, useQuery} from "react-query";
import request from "../../../api/request";

import { Table } from '../../Organisms/Table/Table';
import { Filter } from '../../Organisms/Filter/Filter';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import { filters, table } from './data';

import './statisticsPage.scss';

export const StatisticsPage = () => {

    const statisticsQuery = useQuery('statistics', () => {
        return request('/statistic/get-statistic').then(res => res.data)
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
                                <Filter filters={filters} data={filtersData} />
                            </div>
                            <div className='statisticsPage__table'>
                                <Table
                                    {...table}
                                    data={statisticsQuery?.data?.table}
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