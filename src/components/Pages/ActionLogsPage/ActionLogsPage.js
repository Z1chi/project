import React from 'react';
import { useQueries, useQuery } from 'react-query';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {FlowCard} from '../../Molecules/FlowCard/FlowCard';
import {Filter} from '../../Organisms/Filter/Filter';
import {Table} from '../../Organisms/Table/Table';

import {actionLogsStatisticsConfig, filters, table} from './data';

import request from '../../../api/request';

import './actionLogsPage.scss';

export const ActionLogsPage = () => {

    const [filterData, filterActions] = useAtom(filterAtom);
    const [crudActionIndex, setCrudActionIndex] = useState(0);

    const actionLogsStatisticsQuery = useQuery(['action-logs/statistics'], () => {
        return request('/action-log/total').then(res => res.data);
    })

    const actionLogsTableQuery = useQuery(['action-logs/table', crudActionIndex], () => {
        return request('/action-log/get-list', { method: 'post', data: { filters: filterData.fields }  }).then(res => res.data);
    })

    const actionLogsFiltersQueryList = useQueries([
        { queryKey: ['actionLogFilters', 'offers'], queryFn: () => {
            return request('/offers/get-offers-filter').then(res => res.data);
        } },
        { queryKey: ['actionLogFilters', 'smartlink'], queryFn: () => {
            return request('/smartlink/get-smartlinks-filter').then(res => res.data);
        } },
        { queryKey: ['actionLogFilters', 'action'], queryFn: () => {
            return request('/action-log/get-actions-filter').then(res => res.data);
        } },
    ]);

    return (
        <div className='actionLogsPage'>
            <PageTemplate
                renderPage={() => {
                    return (
                        <div className='actionLogsPage__content'>
                            <div className='actionLogsPage__statistics'>
                                {
                                    actionLogsStatisticsQuery.data && actionLogsStatisticsConfig.map((configItem, key) => {
                                        return (
                                            <div key={key} className='actionLogsPage__statisticsItem'>
                                                <FlowCard {...actionLogsStatisticsQuery.data[configItem.id]} icon={configItem.icon} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='actionLogsPage__table'>
                                { actionLogsFiltersQueryList.length > 0 && actionLogsFiltersQueryList.every(query => query.data) && <div className='actionLogsPage__tableFilter'>
                                    <Filter filters={filters}
                                        data={actionLogsFiltersQueryList.every(filter => filter.data) ? actionLogsFiltersQueryList.map(filter => filter.data): []}
                                        mobileFilterConfig={{
                                            fields: [], 
                                            onSave: () => {console.log('saved')},
                                        }}
                                        onSave={
                                            ()=>{
                                                setCrudActionIndex(crudActionIndex+1); 
                                            }
                                        }
                                    />
                                </div>}
                                <div className='actionLogsPage__tableData'>
                                    {
                                        actionLogsTableQuery.data && <Table {...table} data={actionLogsTableQuery.data} />
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}
