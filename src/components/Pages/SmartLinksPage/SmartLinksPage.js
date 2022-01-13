import React, {useState} from 'react';
import {useAtom} from '@reatom/react';
import {useQuery, useQueries,} from 'react-query';

import {TableEmpty} from '../../Molecules/TableEmpty/TableEmpty';
import {SmartLinksCard} from '../../Molecules/SmartLinksCard/SmartLinksCard';
import {Drawer} from '../../Organisms/Drawer/Drawer';
import {Filter} from '../../Organisms/Filter/Filter'
import {Table} from '../../Organisms/Table/Table';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';

import request from '../../../api/request';
import { convertToQueryString } from '../../../helpers/convertToQueryString';
import {filters, table, drawers, modalDelete} from './data';

import {filterAtom} from '../../../store/Filter';
import {drawerAtom} from '../../../store/Drawer';
import {modalAtom} from '../../../store/Modal';

import './smartLinksPage.scss';

export const SmartLinksPage = () => {
    const [crudActionIndex, setCrudActionIndex] = useState(0);
    const [drawerData, drawerActions] = useAtom(drawerAtom);
    const [filterData, filterActions] = useAtom(filterAtom);
    const [modalData, modalActions] = useAtom(modalAtom);

    const smartLinksQuery = useQuery(['smartlinks', crudActionIndex], async () => {
        return request(`smartlink?${convertToQueryString(filterData.fields)}`).then((res) => res.data);
    });


    const smartlinkFiltersQueryList = useQueries([
        {
            queryKey: ['smartlinkFilters', 'offers'], queryFn: () => {
                return request('/offers/get-offers-filter').then(res => res.data);
            }
        },
        {
            queryKey: ['smartlinkFilters', 'format'], queryFn: () => {
                return request('/smartlink/formats').then(res => res.data);
            }
        },
    ]);

    const filtersData = [
        smartlinkFiltersQueryList[0].data || [],
        [],
        smartlinkFiltersQueryList[1].data || []
    ];

    return (
        <div className='smartLinksPage'>
            <PageTemplate
                renderPage={({width}) => {
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
                                                                    request('smartlink/create', {
                                                                        method: 'POST',
                                                                        data: drawerData.fieldValues,
                                                                    }).then((res) => res.data);
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
                                                <Filter filters={filters}
                                                        data={filtersData}
                                                        onSave={
                                                            () => {
                                                                setCrudActionIndex(crudActionIndex + 1);
                                                            }
                                                        }
                                                />
                                            </div>
                                            <div className='smartLinksPage__create'>
                                                <button onClick={
                                                    () => drawerActions.open(drawers.create({
                                                        onCreate: (data) => {
                                                            request('smartlink/create', {
                                                                method: 'post',
                                                                data,
                                                            }).then((res) => {
                                                                drawerActions.close();
                                                                setCrudActionIndex(() => crudActionIndex + 1)
                                                                return res.data;
                                                            });
                                                        }
                                                    }))
                                                }>Create Smartlink
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            width < 480
                                                ? <div className='smartLinksPage__table--cards'>
                                                    {
                                                        smartLinksQuery.data && smartLinksQuery.data.table && smartLinksQuery.data.table.map(item => {
                                                            return (
                                                                <SmartLinksCard config={table.getTableConfig()}
                                                                                data={item}/>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                : <div className='smartLinksPage__table'>
                                                    <Table {...table} tableConfig={table.getTableConfig({
                                                        onEditOpen: ({itemId}) => {
                                                            drawerActions.open(drawers.edit({
                                                                onEdit: (data) => {
                                                                    request(`smartlink/update/${itemId}`, {
                                                                        method: 'patch',
                                                                        data: {
                                                                            title: data.stateData.title,
                                                                            project_id: data.stateData.project.id,
                                                                            format: data.stateData.format.id
                                                                        },
                                                                    }).then((res) => {
                                                                        drawerActions.close();
                                                                        setCrudActionIndex(() => crudActionIndex + 1)
                                                                        return res.data
                                                                    });
                                                                },
                                                                onDelete: () => {
                                                                    modalActions.open(
                                                                        modalDelete({
                                                                            onSubmit: () => {
                                                                                request(`smartlink/delete/${itemId}`, {method: 'delete',}).then((res) => {
                                                                                    drawerActions.close();
                                                                                    setCrudActionIndex(() => crudActionIndex + 1)
                                                                                    return res.data
                                                                                });
                                                                            },
                                                                        })
                                                                    )
                                                                }
                                                            }))
                                                            const smartlinkItem = smartLinksQuery.data.table.find(item => item.id === itemId);
                                                            drawerActions.setFieldValues(smartlinkItem)
                                                        },
                                                        onDeleteOpen: (data) => modalActions.open(
                                                            modalDelete({
                                                                onClose: modalActions.close,
                                                                onSubmit: () => {
                                                                    request(`smartlink/delete/${data.itemId}`, {method: 'delete',}).then((res) => {
                                                                        drawerActions.close();
                                                                        setCrudActionIndex(() => crudActionIndex + 1)
                                                                        return res.data
                                                                    });
                                                                },
                                                            })
                                                        ),
                                                    })} data={smartLinksQuery.data ? smartLinksQuery.data.table : []}/>
                                                </div>
                                        }
                                    </>
                                )
                            }

                        </div>
                    )
                }}
            />
            {drawerData && drawerData.isOpened && <Drawer {...drawerData} onClose={drawerActions.close} data={{
                'project_id': smartlinkFiltersQueryList[0].data || [],
                'format': smartlinkFiltersQueryList[1].data || [],
            }}/>}
        </div>
    )
}