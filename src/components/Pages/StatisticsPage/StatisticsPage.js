import React from 'react';
import {useQuery} from "react-query";
import request from "../../../api/request";

import {Table} from '../../Organisms/Table/Table';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';

import {table} from './data';

import './statisticsPage.scss';


export const StatisticsPage = () => {

    const statisticQuery = useQuery('statistics', () => {
        return request('/statistic/get-statistic').then(res => res.data)
    });


    return (
        <div className='statisticsPage'>
            <PageTemplate
                renderPage={() => {
                    return (
                        <div className='statisticsPage__content'>

                            <Table
                                {...table}
                                data={statisticQuery?.data?.table}
                                emptyTable={table.emptyTable}
                            />
                        </div>
                    )
                }}
            />
        </div>
    )
};