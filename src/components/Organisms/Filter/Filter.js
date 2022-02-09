import React from 'react';
import SVG from 'react-inlinesvg';
import {useAtom} from '@reatom/react';

import {FilterItem} from '../../Molecules/FilterItem/FilterItem';
import {FilterMobile} from '../FilterMobile/FilterMobile';
import {Button} from '../../Atoms/Button/Button';

import {images} from './images';

import {filterAtom} from '../../../store/Filter';

import './filter.scss';

export const Filter = ({filters, data, onSave, isMobile}) => {

    const [filterData, filterActions] = useAtom(filterAtom);

    return (
        <div className={`filter ${isMobile ? 'filter--Mobile' : ''}`}>
            {
                isMobile
                    ? (
                        <FilterMobile filters={filters} data={data}/>
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
                                    <Button onClick={() => onSave(filterData.fields)}>
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