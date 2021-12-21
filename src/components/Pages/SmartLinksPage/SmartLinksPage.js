import React, {useState} from 'react';
import { useQuery } from 'react-query';

import { TableEmpty } from '../../Molecules/TableEmpty/TableEmpty';
import { SmartLinksCard } from '../../Molecules/SmartLinksCard/SmartLinksCard';
import {Drawer} from '../../Organisms/Drawer/Drawer';
import {Filter} from '../../Organisms/Filter/Filter'
import {Table} from '../../Organisms/Table/Table';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';

import request from '../../../api/request';
import {filters, table, drawers, modalDelete} from './data';

import { useAtom } from '@reatom/react';
import { drawerAtom } from '../../../store/Drawer';
import { modalAtom } from '../../../store/Modal';

import './smartLinksPage.scss';

export const SmartLinksPage = () => {
    const [drawerData, drawerActions] = useAtom(drawerAtom);
    const [modalData, modalActions] = useAtom(modalAtom);
    const smartLinksQuery = useQuery(['smartlinks'], async () => {
        return request('smartlink').then((res) => res.data);
    })
    return (
        <div className='smartLinksPage'>
            <PageTemplate
                renderPage={({ width }) => {
                    return (
                        <div className='smartLinksPage__content'>
                            {
                                smartLinksQuery.data && smartLinksQuery.data.table && smartLinksQuery.data.table.length === 0
                                ? (
                                    <TableEmpty {...table.emptyTable} 
                                        button={{ 
                                            ...table.emptyTable.button, 
                                            onClick: () => {
                                                drawerActions.open(drawers.create({
                                                    onCreate: () => {
                                                        request('smartlink/create', drawerData.fields).then((res) => res.data);
                                                    }
                                                }))
                                            }
                                        }} 
                                    />
                                )
                                : smartLinksQuery.data && (
                                    <>
                                    <div className='smartLinksPage__header'>
                                        <div className='smartLinksPage__filters'>
                                            <Filter filters={filters}/>
                                        </div>
                                        <div className='smartLinksPage__create'>
                                            <button onClick={
                                                () => drawerActions.open(drawers.create({
                                                    onCreate: () => {
                                                        request('smartlink/create', drawerData.fields).then((res) => res.data);
                                                    }
                                                }))
                                            }>Create Smartlink</button>
                                        </div>
                                    </div>
                                    {
                                        width < 480
                                        ? <div className='smartLinksPage__table--cards'>
                                            {
                                                smartLinksQuery.data && smartLinksQuery.data.table && smartLinksQuery.data.table.map( item => {
                                                    return (
                                                        <SmartLinksCard config={table.getTableConfig()} data={item} />
                                                    )
                                                })
                                            }
                                        </div>
                                        : <div className='smartLinksPage__table'>
                                            <Table {...table} tableConfig={table.getTableConfig({
                                                onEditOpen: ({ id }) => drawerActions.open(drawers.edit({
                                                    onEdit: () => {
                                                        request('smartlink/edit', { id, ...drawerData.fields}).then((res) => res.data);
                                                    },
                                                    onDelete: () => {
                                                        modalActions.open(
                                                            modalDelete({
                                                                onSubmit: () => {},
                                                            })
                                                        )
                                                    }
                                                })),
                                                onDeleteOpen: ({ id }) => modalActions.open(
                                                    modalDelete({
                                                        onSubmit: () => {},
                                                    })
                                                ),
                                            })} data={smartLinksQuery.data ? smartLinksQuery.data.table : []} />
                                        </div>
                                    }
                                    </>
                                )
                            }
                            
                        </div>
                    )
                }}
            />
            {drawerData && drawerData.isOpened && <Drawer {...drawerData} onClose={drawerActions.close} />}
        </div>
    )
}