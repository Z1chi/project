import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useQuery} from 'react-query';

import {Backdrop} from '../../Atoms/Backdrop/Backdrop';
import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {CreativesCategory} from '../../Atoms/CreativesCategory/CreativesCategory';
import {CreativesCard} from '../../Molecules/CreativesCard/CreativesCard'
import {CreativesModalTemplate} from '../../Templates/CreativesModalTemplate/CreativesModalTemplate';

import linkIcon from './images/link.svg';
import downloadIcon from './images/download.svg';

import {creativesCategories, creativesModalData} from './data';

import request from '../../../api/request';

import {useAtom} from '@reatom/react';
import {creativesAtom} from '../../../store/Creatives';

import './creativesSinglePage.scss';

export const CreativesSinglePage = () => {

    const [filtersIdSelected, setFiltersIdSelected] = useState([])
    const [creativesModal, setCreativesModal] = useState(null);
    const [creativesData, creativesActions] = useAtom(creativesAtom)
    const {id} = useParams();

    const creativesCategoriesQuery = useQuery(['creatives-categories',], () => {
        return request(`creative/get-categories-filters?project_id=${id}${filtersIdSelected.length>0?`&category=${filtersIdSelected.join(',')}`:''}`).then(res => res.data);
    });

    const creativesItemQuery = useQuery(['creatives-item', creativesData.filterIds,], () => {
        return request(`creative/get-assets?project_id=${id}${creativesData.filterIds.length > 0 ? `&category=${creativesData.filterIds.join(',')}` : ''}`).then(res => res.data);
    });

    return (
        <div className='creativesSinglePage'>
            <PageTemplate
                renderPage={({width}) =>
                    <>
                        <div className='creativesSinglePage__categoryList'>

                            {
                                creativesCategoriesQuery.data &&
                                Object.entries(creativesCategoriesQuery.data)
                                    .map(([name, item], key) =>
                                        <div
                                            className='creativesSinglePage__categoryListItem'
                                            key={`creativesSinglePage__categoryListItem${key}`}
                                            onClick={() => creativesActions.setFilterIds({id: item.category_id})}
                                        >
                                            <CreativesCategory
                                                {...item}
                                                name={name}
                                                countLimit={creativesCategories.countLimit}
                                                isSelected={creativesData.filterIds.some(filterId => filterId === item.category_id)}
                                            />
                                        </div>
                                    )
                            }
                        </div>
                        <div className='creativesSinglePage__separator'/>
                        <div className='creativesSinglePage__cardList'>
                            {
                                creativesItemQuery.data &&
                                creativesItemQuery.data.table &&
                                creativesItemQuery.data.table.map((item, key) => {
                                        return (
                                            <div
                                                className={`creativesSinglePage__cardListItem${width < 600 ? ' creativesSinglePage__cardListItem--isMobile' : ''}`}
                                                key={`creativesSinglePage__cardListItem${key}`}>

                                                <CreativesCard

                                                    {...item}
                                                    width={width}
                                                    modalData={creativesModalData}
                                                    moreButton={{
                                                        icon: linkIcon,
                                                        onClick: () =>
                                                            request(`creative/get-asset?project_asset_id=${item.id}`)
                                                                .then(res => {
                                                                    setCreativesModal({
                                                                        isOpened: true,
                                                                        ...res.data
                                                                    })
                                                                }),
                                                    }}
                                                    downloadButton={{
                                                        icon: downloadIcon,
                                                        onClick: () => {
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        request(`creative/get-asset?project_asset_id=${item.id}`)
                                                            .then(res => {
                                                                setCreativesModal({
                                                                    isOpened: true,
                                                                    ...res.data
                                                                })
                                                            })
                                                    }
                                                />
                                            </div>)
                                    }
                                )
                            }
                        </div>
                        {
                            creativesModal && creativesModal.isOpened && (
                                <div className='creativesSinglePage__modal'>
                                    <Backdrop onClose={() =>
                                        setCreativesModal(null)
                                    }/>
                                    <CreativesModalTemplate
                                        {...creativesModal}
                                        onClose={() => setCreativesModal(null)}
                                    />
                                </div>
                            )
                        }
                    </>
                }
            />
        </div>
    )
};