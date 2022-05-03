import React, {useEffect, useState} from 'react';
import {useAtom} from '@reatom/react';
import {useQuery, useQueries,} from 'react-query';
import {useResizeDetector} from "react-resize-detector";
import SVG from "react-inlinesvg"


import {SmartLinksCard} from '../../Molecules/SmartLinksCard/SmartLinksCard';
import {Drawer} from '../../Organisms/Drawer/Drawer';
import {Filter} from '../../Organisms/Filter/Filter'
import {Table} from '../../Organisms/Table/Table';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {Button} from "../../Atoms/Button/Button";

import request from '../../../api/request';
import {convertToQueryString, idSelectFormator} from '../../../helpers/lib';
import {filters, filterFormators, drawers, modalDelete, getTable} from './data';

import {filterAtom} from '../../../store/Filter';
import {drawerAtom} from '../../../store/Drawer';
import {modalAtom} from '../../../store/Modal';
import {alertAtom} from '../../../store/Alert';
import createSmartLink from '../../Organisms/Drawer/images/close.svg';

import './smartLinksPage.scss';
import {images} from "./images";
import { TableEmpty } from '../../Molecules/TableEmpty/TableEmpty';
import { LoadingTemplate } from '../../Templates/LoadingTemplate/LoadingTemplate';
import { Loader } from '../../Atoms/Loader/Loader';

export const SmartLinksPage = () => {
    const [tableData, setTableData] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [operationIndex, setOperationIndex] = useState(0);
    const [pushTableData, setPushTableData] = useState(false);
    const [drawerData, drawerActions] = useAtom(drawerAtom);
    const [filterData, filterActions] = useAtom(filterAtom);
    const [modalData, modalActions] = useAtom(modalAtom);
    const [alertData, alertActions] = useAtom(alertAtom);
    const {width, ref} = useResizeDetector();

    useEffect(() => {
        filterActions.reset();
    }, []);

    const smartLinksQuery = useQuery(['smartlinks', pageIndex, operationIndex], async () => {
        const filterQueryData = {};
        for (const filterFieldId in filterData.fields) {
            const filterFieldValue = filterFormators[filterFieldId](filterData.fields[filterFieldId]);
            if (filterFieldValue) {
                filterQueryData[filterFieldId] = filterFieldValue
            }
        }
        return request(`smartlink?${convertToQueryString({page: pageIndex, ...filterQueryData})}`).then(res => {
            if (res) {
                setTableData({
                    ...res.data,
                    table: pushTableData ? [
                        ...tableData.table,
                        ...res.data.table,
                    ] : res.data.table
                })
            }

            return res.data
        })
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
    const filterMobile = width <= 820;

    return (
        <div className='smartLinksPage'>
            <PageTemplate
                renderPage={({width, contentData}) => {
                    const table = getTable({ onCopy : () => {
                        alertActions.open({
                            type: 'ALERT/SUCCESS',
                            message: contentData.data.smartLinks.copy,
                        });
                    }})
                    const openEditDrawer = (itemId) => {
                        drawerActions.open(drawers.edit(
                            {
                                editTitle: contentData.data.smartLinks.edit,
                                editSubtitle:contentData.data.smartLinks.editSubtitle,
                                onEdit: (data) => {
                                    request(`smartlink/update/${itemId}`, {
                                        method: 'patch',
                                        data: {
                                            title: data.stateData.title,
                                            project_id: idSelectFormator({ source: data.stateData.project, propName: 'id' }),
                                            format: idSelectFormator({ source: data.stateData.format, propName: 'id' }),
                                        },
                                    }).then((res) => {
                                        alertActions.open({
                                            type: 'ALERT/SUCCESS',
                                            message: contentData.data.smartLinks.editSuccess,
                                        });
                                        drawerActions.close();
                                        setOperationIndex(operationIndex + 1);
                                        return res.data
                                    });
                                },
                                onDelete: () => {
                                    modalActions.open(
                                        modalDelete({
                                            title: contentData.data.smartLinks.delete.title,
                                            subtitle: contentData.data.smartLinks.delete.subtitle,
                                            confirm: contentData.data.smartLinks.delete.confirm,
                                            back: contentData.data.smartLinks.delete.back,
                                            onSubmit: () => {
                                                request(`smartlink/delete/${itemId}`, {method: 'delete',}).then((res) => {
                                                    drawerActions.close();
                                                    setOperationIndex(operationIndex + 1);
                                                    return res.data
                                                });
                                            },
                                        })
                                    )
                                }
                            }));
                        const smartlinkItem = smartLinksQuery.data.table.find(item => item.id === itemId);
                        drawerActions.setFieldValues(smartlinkItem)
                    }
                    return (
                        <div className='smartLinksPage__content'>
                            <div ref={ref}
                                 className={`smartLinksPage__header ${filterMobile ? "smartLinksPage__header--Mobile" : ""}`}>
                                <div
                                    className='smartLinksPage__filters'>
                                    <Filter filters={filters}
                                            data={filtersData}
                                            isMobile={filterMobile}
                                            onSave={
                                                () => {
                                                    setPageIndex(1);
                                                    setOperationIndex(operationIndex + 1);
                                                    setPushTableData(false)
                                                }
                                            }
                                    />
                                </div>
                                <div
                                    className={`smartLinksPage__create ${filterMobile ? "smartLinksPage__create--Mobile" : ""}`}>
                                    <Button onClick={
                                        () => drawerActions.open(drawers.create(
                                            {
                                                title: contentData.data.smartLinks.create,
                                                subTitle: contentData.data.smartLinks.createSubtitle,
                                            onCreate: (data) => {
                                                request('smartlink/create', {
                                                    method: 'post',
                                                    data,
                                                }).then((res) => {
                                                    drawerActions.setFieldValue({
                                                        fieldId: 'url',
                                                        fieldValue: res.data.url
                                                    });
                                                    setOperationIndex(operationIndex + 1);
                                                    return res.data;
                                                });
                                            },
                                            onCopy: () => {
                                                alertActions.open({
                                                    type: 'ALERT/SUCCESS',
                                                    message: contentData.data.smartLinks.copy,
                                                });
                                                drawerActions.close();
                                            },
                                        }))
                                    }>
                                        {
                                            filterMobile ?
                                                <SVG src={createSmartLink}/> : contentData.data.smartLinks.text
                                        }
                                    </Button>
                                </div>
                            </div>
                            {
                                width < 480
                                    ? <div className='smartLinksPage__table--cards'>
                                        {
                                            smartLinksQuery.data && smartLinksQuery.data.table && smartLinksQuery.data.table.map(item => {
                                                return (
                                                    <SmartLinksCard
                                                        config={table.getTableConfig()}
                                                        data={item}
                                                        onEdit={openEditDrawer}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                    : <div className='smartLinksPage__table'>
                                        {
                                            tableData
                                            ? <Table {...table}
                                               emptyTable={{
                                                   icon: images.emptyTableIcon,
                                                   text: contentData.data.smartLinks.emptyTable,
                                                   button: {
                                                       text: contentData.data.smartLinks.text,
                                                   }
                                               }
                                               }
                                               hasMore={tableData.last_page === null || tableData.last_page > pageIndex}
                                               fetchMore={() => {
                                                   setPageIndex(pageIndex + 1);
                                                   setPushTableData(true)
                                               }}
                                               tableConfig={table.getTableConfig({
                                                    onEditOpen: ({itemId}) => {
                                                        openEditDrawer(itemId)
                                                    },
                                                    onDeleteOpen: (data) => modalActions.open(
                                                        modalDelete({
                                                            title: contentData.data.smartLinks.delete.title,
                                                            subtitle: contentData.data.smartLinks.delete.subtitle,
                                                            confirm: contentData.data.smartLinks.delete.confirm,
                                                            back: contentData.data.smartLinks.delete.back,
                                                            onClose: modalActions.close,
                                                            onSubmit: () => {
                                                                request(`smartlink/delete/${data.itemId}`, {method: 'delete',}).then((res) => {
                                                                    drawerActions.close();
                                                                    setOperationIndex(operationIndex + 1);
                                                                    return res.data
                                                                });
                                                            },
                                                        })
                                                    ),
                                               })} data={tableData.table}
                                            />
                                            : <TableEmpty loader={Loader} />
                                        }
                                    </div>
                            }
                        </div>
                    )
                }}
            />
            {drawerData && drawerData.isOpened && <Drawer {...drawerData} onClose={drawerActions.close} data={{
                'project': smartlinkFiltersQueryList[0].data || [],
                'format': smartlinkFiltersQueryList[1].data || [],
            }}/>}
        </div>
    )
};