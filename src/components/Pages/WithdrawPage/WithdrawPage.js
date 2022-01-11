import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAtom } from '@reatom/react';

import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';
import { InfoCard } from '../../Molecules/InfoCard/InfoCard';
import { WithdrawCard } from '../../Molecules/WithdrawCard/WithdrawCard';
import { Filter } from '../../Organisms/Filter/Filter';
import { Table } from '../../Organisms/Table/Table';
import { Drawer } from '../../Organisms/Drawer/Drawer';
import { Button } from '../../Atoms/Button/Button';

import request from '../../../api/request';

import { statistics, filters, table, drawers, modalWithdraw } from './data';
import { drawerAtom } from '../../../store/Drawer';
import { modalAtom } from '../../../store/Modal';

import './withdrawPage.scss';
import { useEffect } from 'react/cjs/react.development';
import { convertToQueryString } from '../../../helpers/convertToQueryString';

export const WithdrawPage = () => {

    const [crudActionIndex, setCrudActionIndex] = useState(0);

    const [drawerData, drawerActions] = useAtom(drawerAtom)
    const [modalData, modalActions] = useAtom(modalAtom);

    const withdrawQuery = useQuery(['withdraw-table', crudActionIndex], () => {
        return request(`withdraw/get-withdraws?${convertToQueryString(filtersData.fields)}`,).then(res => res.data);
    })

    const statusFilterQuery = useQuery(['withdraw-statuses'], () => {
        return request('withdraw/get-statuses').then(res => res.data);
    })

    const filtersData = [
        [], 
        [], 
        statusFilterQuery.data || [],
    ]  

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
                                                    console.log('d',data)
                                                    if(data.amount < res.data.minWithdraw) {
                                                        return;
                                                    }
                                                    modalActions.open(
                                                        modalWithdraw({
                                                            data,
                                                            onClose: modalActions.close,
                                                            onSubmit: (data) => {
                                                                request('/withdraw/create', { method: 'post', data }).then(res => console.log(res.data))
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
                                            setCrudActionIndex(crudActionIndex+1); 
                                        }
                                    }
                                />
                            </div>
                            {   
                                (withdrawQuery.data && withdrawQuery.data.table) &&
                                ( width > 480
                                ? <div className='withdrawPage__table'>
                                    <Table {...table} data={withdrawQuery.data.table} />
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