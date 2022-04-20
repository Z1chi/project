import React from 'react';
import SVG from 'react-inlinesvg';
import {useAtom} from '@reatom/react';

import {FilterItem} from '../../Molecules/FilterItem/FilterItem';
import {FilterMobile} from '../FilterMobile/FilterMobile';
import {Button} from '../../Atoms/Button/Button';

import {images} from './images';

import {filterAtom} from '../../../store/Filter';

import './filter.scss';
import { alertAtom } from '../../../store/Alert';
import { languageAtom } from '../../../store/language';

export const Filter = ({filters, data, onSave, isMobile}) => {

    const [filterData, filterActions] = useAtom(filterAtom);
    const [alertData, alertActions] = useAtom(alertAtom);
    const [languageData, languageActions] = useAtom(languageAtom);

    return (
        <div className={`filter ${isMobile ? 'filter--Mobile' : ''}`}>
            {
                isMobile
                    ? (
                        <FilterMobile filters={filters} data={data} onSave={()=>{
                            onSave();
                            alertActions.open({
                                message: languageData.data.common.filters.success,
                                type: 'ALERT/SUCCESS',
                            });
                        }} onReset={() => {
                            filterActions.reset();
                            onSave();
                        }} />
                    )
                    :

                    <>
                        {
                            filters.map(({maxWidth = '100%', ...item}, index) => {
                                return (
                                    <div key={`filter__item(${index})`} className='filter__item' style={{maxWidth}}>
                                        <FilterItem {...item} items={data[index]}/>
                                    </div>
                                )
                            })
                        }
                        {
                            Object.values(filterData.fields).some(field => !!field) && <>
                                <div className='filter__confirm'>
                                    <Button onClick={() => {
                                        onSave(filterData.fields)
                                        alertActions.open({
                                            message: languageData.data.common.filters.success,
                                            type: 'ALERT/SUCCESS',
                                        });
                                    }}>
                                        Save changes
                                    </Button>
                                </div>
                                <div className='filter__reset' onClick={() => {
                                    filterActions.reset();
                                    onSave();
                                }}>
                                    <div className='filter__resetIcon'>
                                        <SVG src={images.resetIcon}/>
                                    </div>
                                    <div className='filter__resetTitle'>
                                        Reset
                                    </div>
                                </div>
                            </>
                        }

                    </>

            }
        </div>
    )
};