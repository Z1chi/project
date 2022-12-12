import React, {useEffect, useState} from 'react';
import {useAtom} from '@reatom/react';
import {useQueries, useQuery} from 'react-query';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {FlowCard} from '../../Molecules/FlowCard/FlowCard';
import {Filter} from '../../Organisms/Filter/Filter';
import {Table} from '../../Organisms/Table/Table';

import {actionLogsStatisticsConfig, filterFormators, filters, table} from './data';
import {filterAtom} from '../../../store/Filter';

import {convertToQueryString} from '../../../helpers/lib';
import request from '../../../api/request';

import './actionLogsPage.scss';
import {useResizeDetector} from "react-resize-detector";
import {images} from "./images";
import {TableEmpty} from '../../Molecules/TableEmpty/TableEmpty';
import {Loader} from '../../Atoms/Loader/Loader';


export const ActionLogsPage = () => {

  const [filterData, filterActions] = useAtom(filterAtom);
  const [operationIndex, setOperationIndex] = useState(0);
  const [pushTableData, setPushTableData] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [tableData, setTableData] = useState(null);
  const {width, ref} = useResizeDetector();
  useEffect(() => {
    filterActions.reset();
  }, []);

  const actionLogsStatisticsQuery = useQuery(['action-logs/statistics',], () => {
    return request('/action-log/total').then(res => res.data);
  });

  const actionLogsTableQuery = useQuery(['action-logs/table', cursor, operationIndex], () => {
    const filterQueryData = {};


    for (const filterFieldId in filterData.fields) {
      const filterFieldValue = filterFormators[filterFieldId](filterData.fields[filterFieldId]);
      if (filterFieldValue) {
        filterQueryData[filterFieldId] = filterFieldValue
      }
    }
    return request(`/action-log/get-list?${convertToQueryString({cursor, ...filterQueryData})}`).then(res => {

      if (res) {
        setTableData({
          ...res.data,
          table: pushTableData ?
            [
              ...tableData.table,
              ...res.data.table,
            ]
            :
            res.data.table

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
                                  icon={configItem.icon}
                                  title={configItem.title}
                                  isMobile={width < 820}
                                  period={'last month'}
                        />
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
                              setOperationIndex(operationIndex + 1);
                              setPushTableData(false);
                              setCursor(null)
                            }
                          }/>
                </div>
                <div className='actionLogsPage__tableData'>
                  {
                    tableData
                      ? <Table
                        hasMore={tableData.has_more_pages}
                        fetchMore={() => {

                          setCursor(tableData.next_page_cursor_param);
                          setPushTableData(true)
                        }}
                        isFetching={actionLogsTableQuery.isFetching}
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
                      : <TableEmpty loader={Loader}/>
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
