import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {useAtom} from '@reatom/react';
import {useResizeDetector} from "react-resize-detector";
import {validate} from 'bitcoin-address-validation';
import request from '../../../api/request';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {InfoCard} from '../../Molecules/InfoCard/InfoCard';
import {WithdrawCard} from '../../Molecules/WithdrawCard/WithdrawCard';
import {Filter} from '../../Organisms/Filter/Filter';
import {Table} from '../../Organisms/Table/Table';
import {Drawer} from '../../Organisms/Drawer/Drawer';
import {Button} from '../../Atoms/Button/Button';
import {Loader} from '../../Atoms/Loader/Loader';
import {TableEmpty} from '../../Molecules/TableEmpty/TableEmpty';

import {drawerAtom} from '../../../store/Drawer';
import {modalAtom} from '../../../store/Modal';
import {alertAtom} from "../../../store/Alert";
import {filterAtom} from '../../../store/Filter';

import {statistics, filters, filterFormators, table, drawers, modalWithdraw} from './data';
import emptyTableIcon from "./images/emptyTable.svg";

import {convertToQueryString} from '../../../helpers/lib';

import './withdrawPage.scss';


export const WithdrawPage = () => {

    const [operationIndex, setOperationIndex] = useState(0);
    const [pushTableData, setPushTableData] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [tableData, setTableData] = useState(null);

    const [, alertActions] = useAtom(alertAtom);
    const [filterData, filterActions] = useAtom(filterAtom);

    const [drawerData, drawerActions] = useAtom(drawerAtom);
    const [, modalActions] = useAtom(modalAtom);

    const {width, ref} = useResizeDetector();

    useEffect(() => {
        filterActions.reset();
    }, []);

    const withdrawQuery = useQuery(['withdraw-table', cursor, operationIndex], () => {
        const filterQueryData = {};
        for (const filterFieldId in filterData.fields) {
            const filterFieldValue = filterFormators[filterFieldId](filterData.fields[filterFieldId]);
            if (filterFieldValue) {
                filterQueryData[filterFieldId] = filterFieldValue
            }
        }
        return request(`withdraw/get-withdraws?${convertToQueryString({cursor, ...filterQueryData})}`,).then(res => {
            if (res) {
                setTableData({
                    ...res.data,
                    table: pushTableData ?
                        [
                            ...tableData.table,
                            ...res.data.table,
                        ]
                        : res.data.table
                })
            }

            return res.data
        })
    });

    const statusFilterQuery = useQuery(['withdraw-statuses'], () => {
        return request('withdraw/get-statuses').then(res => res.data);
    });

    const filtersData = [
        [],
        [],
        statusFilterQuery.data || [],
    ];
    const isMobile = width < 600;

    return (
        <div className='withdrawPage'>
            <PageTemplate
                renderPage={({width, contentData, profileQuery}) => {
                    return (
                        <div className='withdrawPage__content'>
                            <div className='withdrawPage__statistics'>
                                <div className='withdrawPage__cards'>
                                    {
                                        statistics.map((item, key) => {
                                            return (
                                                <div key={key} className='withdrawPage__cardsItem'>
                                                    <InfoCard {...item}
                                                              title={contentData.data.withdraw.totalBalance}
                                                              renderSubtitle={(value) => {
                                                                  return <>
                                                                      <span>{value.amount}</span>
                                                                      <span className='withdrawPage__userCurrency'>
                                                                          {value.balance_in_user_currency}
                                                                      </span>
                                                                  </>
                                                              }}
                                                              value={{
                                                                  amount: `${(profileQuery.data && profileQuery.data.balance) ? profileQuery.data.balance : 0} ₿`,
                                                                  balance_in_user_currency:
                                                                      `${(profileQuery.data && profileQuery.data.balance_in_user_currency) ? ` ~ ${profileQuery.data.balance_in_user_currency.amount} ${profileQuery.data.balance_in_user_currency.symbol}` : 0}`
                                                              }}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='withdrawPage__withdraw'>
                                    <Button onClick={() => {
                                        request('/withdraw/get-address-info').then(res => {
                                            drawerActions.open(drawers.withdraw({
                                                title: contentData.data.withdraw.drawer.title,
                                                subtitle: contentData.data.withdraw.drawer.subtitle,
                                                withdrawButton: contentData.data.withdraw.drawer.button,
                                                available: res.data.balance,
                                                minWithdraw: res.data.minWithdraw,
                                                walletAddress: res.data.walletAddress,
                                                onClick: (data) => {
                                                    const amount = Number(data.amount);
                                                    // if (amount > res.data.balance) {
                                                    //     alertActions.open({
                                                    //         message: contentData.data.withdraw.drawer.insufficientFunds,
                                                    //         type: 'ALERT/ERROR',
                                                    //     });
                                                    //     return;
                                                    // } else
                                                    if (amount < res.data.minWithdraw) {
                                                        alertActions.open({
                                                            message: `${contentData.data.withdraw.drawer.min} ${res.data.minWithdraw}`,
                                                            type: 'ALERT/ERROR',
                                                        });
                                                        return;
                                                    }
                                                    if (!validate(data.walletAddress)) {
                                                        alertActions.open({
                                                            message: `${contentData.data.withdraw.drawer.walletAddress} ${data.walletAddress}`,
                                                            type: 'ALERT/ERROR',
                                                        });
                                                        return;
                                                    }
                                                    modalActions.open(
                                                        modalWithdraw({
                                                            data,
                                                            onClose: modalActions.close,
                                                            onSubmit: (queryData) => {
                                                                request('/withdraw/create', {
                                                                    method: 'post',
                                                                    data: queryData,
                                                                }).then((res) => {
                                                                    if (res.exception) {
                                                                        alertActions.open({
                                                                            message: res.message,
                                                                            type: 'ALERT/ERROR',
                                                                        });
                                                                    } else if (!res.success) {
                                                                        alertActions.open({
                                                                            message: res.data.amount,
                                                                            type: 'ALERT/ERROR',
                                                                        });
                                                                    } else {
                                                                        drawerActions.close();
                                                                        setOperationIndex(operationIndex + 1);
                                                                        return res.data;
                                                                    }
                                                                })
                                                            },
                                                        })
                                                    )
                                                }
                                            }))
                                        })
                                    }}>
                                        {contentData.data.withdraw.drawer.button}
                                    </Button>
                                </div>
                            </div>
                            <div ref={ref} className='withdrawPage__filters'>
                                <Filter filters={filters}
                                        isMobile={isMobile}
                                        data={filtersData}
                                        onSave={
                                            () => {
                                                setCursor(null);
                                                setOperationIndex(operationIndex + 1);
                                                setPushTableData(false);
                                            }
                                        }
                                />
                            </div>
                            {
                                width > 480
                                    ? <div className='withdrawPage__table'>
                                        {
                                            tableData
                                                ? <Table {...table}
                                                         emptyTable={{
                                                             icon: emptyTableIcon,
                                                             text: contentData.data.withdraw.emptyTable,
                                                             button: {
                                                                 text: 'Explore offers',
                                                                 link: '/offers',
                                                             }
                                                         }}
                                                         hasMore={tableData.has_more_pages}
                                                         isFetching={withdrawQuery.isFetching}
                                                         fetchMore={() => {
                                                             setCursor(tableData.next_page_cursor_param);
                                                             setPushTableData(true)
                                                         }}
                                                         data={tableData.table}
                                                />
                                                : <TableEmpty loader={Loader}/>
                                        }
                                    </div>
                                    : <div>
                                        {
                                            tableData && tableData.table.map((item, key) => {
                                                return (
                                                    <div className='withdrawPage__tableCard' key={key} style={{width}}>
                                                        <WithdrawCard fields={item} config={table.tableConfig}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>
                    )
                }}
            />
            {drawerData && drawerData.isOpened && <Drawer {...drawerData} onClose={drawerActions.close} data={{}}/>}
        </div>
    )
};