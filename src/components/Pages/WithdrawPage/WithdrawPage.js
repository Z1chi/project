import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAtom } from '@reatom/react';

import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';
import { InfoCard } from '../../Molecules/InfoCard/InfoCard';
import { WithdrawCard } from '../../Molecules/WithdrawCard/WithdrawCard';
import { Filter } from '../../Organisms/Filter/Filter';
import { Table } from '../../Organisms/Table/Table';
import { Drawer } from '../../Organisms/Drawer/Drawer';
import { Button } from '../../Atoms/Button/Button';
import { drawerAtom } from '../../../store/Drawer';
import { modalAtom } from '../../../store/Modal';
import { alertAtom } from "../../../store/Alert";

import request from '../../../api/request';

import { statistics, filters, table, drawers, modalWithdraw } from './data';

import { convertToQueryString } from '../../../helpers/convertToQueryString';

import './withdrawPage.scss';

export const WithdrawPage = () => {

    const [pageIndex, setPageIndex] = useState(0);
    const [tableData, setTableData] = useState({ table: [], last_page: null});

    const [alertData, alertActions] = useAtom(alertAtom);

    const [drawerData, drawerActions] = useAtom(drawerAtom)
    const [modalData, modalActions] = useAtom(modalAtom);

    const withdrawQuery = useQuery(['withdraw-table', pageIndex], () => {
        if(!filtersData || !filtersData.fields || filtersData.fields.every(item=>!item)) {
            return request(`withdraw/get-withdraws`).then(res => res.data);
        }
        return request(`withdraw/get-withdraws?${convertToQueryString(filtersData.fields)}`,).then(res => { return res && setTableData({
            ...res.data,
            table: [
                ...tableData.table,
                ...res.data.table,
            ]
        })})
    })

    const statusFilterQuery = useQuery(['withdraw-statuses'], () => {
        return request('withdraw/get-statuses').then(res => res.data);
    })

    const filtersData = [
        [], 
        [], 
        statusFilterQuery.data || [],
    ];

    console.log('d', withdrawQuery.data)

    return (
        <div className='withdrawPage'>
            <PageTemplate 
                renderPage={({ width })=>{
                    return (
                        <div className='withdrawPage__content'>
                            <div className='withdrawPage__statistics'>
                                <div className='withdrawPage__cards'>
                                {
                                    statistics.map( item => {
                                        return (
                                            <div className='withdrawPage__cardsItem'>
                                                <InfoCard {...item} />
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                <div className='withdrawPage__withdraw'>
                                    <Button onClick={()=>{
                                        request('/withdraw/get-address-info').then(res => {
                                            drawerActions.open(drawers.withdraw({
                                                available: res.data.balance,
                                                minWithdraw: res.data.minWithdraw,
                                                walletAddress: res.data.walletAddress,
                                                onClick: (data) => {
                                                    const amount = Number(data.amount);
                                                    if(amount > res.data.balance) {
                                                        alertActions.open({
                                                            message: 'Insufficient funds',
                                                            type: 'ALERT/ERROR',
                                                        })
                                                        return;
                                                    } else if(amount < res.data.minWithdraw) {
                                                        alertActions.open({
                                                            message: `Min withdraw is at least ${res.data.minWithdraw}`,
                                                            type: 'ALERT/ERROR',
                                                        })
                                                        return;
                                                    }
                                                    modalActions.open(
                                                        modalWithdraw({
                                                            data,
                                                            onClose: modalActions.close,
                                                            onSubmit: (queryData) => {
                                                                
                                                                request('/withdraw/create', { method: 'post', queryData }).then((res) => {
                                                                    drawerActions.close();
                                                                    setPageIndex(pageIndex)
                                                                    return res.data;
                                                                })
                                                            },
                                                        })
                                                    )
                                                }
                                            }))
                                        })
                                    }}>
                                        Withdraw
                                    </Button>
                                </div>
                            </div>
                            <div className='withdrawPage__filters'>
                                <Filter filters={filters} 
                                    data={filtersData} 
                                    onSave={
                                        ()=>{
                                            setPageIndex(pageIndex)
                                        }
                                    }
                                />
                            </div>
                            {   
                                (withdrawQuery.data && withdrawQuery.data.table) &&
                                ( width > 480
                                ? <div className='withdrawPage__table'>
                                    <Table {...table} 
                                        hasMore={tableData.last_page===null || tableData.last_page > pageIndex}
                                        fetchMore={()=>{
                                            setPageIndex(pageIndex+1)
                                        }}
                                        data={withdrawQuery.data.table} 
                                    />
                                </div>
                                : <div>
                                    {
                                        withdrawQuery.data.table.map( item => {
                                            return (
                                                <div className='withdrawPage__tableCard'  style={{width}}>
                                                    <WithdrawCard fields={item} config={table.tableConfig} />
                                                </div>
                                            )
                                        })
                                    }
                                </div> )
                            }                            
                        </div>
                    )
                }}
            />
            {drawerData && drawerData.isOpened && <Drawer {...drawerData} onClose={drawerActions.close} data={{}} />}
        </div>
    )
}