import React from 'react';
import { useAtom } from '@reatom/react';
import { useResizeDetector } from 'react-resize-detector';

import { FilterItem } from '../../Molecules/FilterItem/FilterItem';
import { FilterMobile } from '../FilterMobile/FilterMobile';

import SVG from 'react-inlinesvg';
import { images } from './images';

import { filterAtom } from '../../../store/Filter';

import './filter.scss';
import { Button } from '../../Atoms/Button/Button';

export const Filter = ({ filters, data, onSave, }) => {

    const [filterData, filterActions] = useAtom(filterAtom);

    const {width, height, ref} = useResizeDetector();
    const isMobile = width <= 768;


    return (
        isMobile
            ? (
                <FilterMobile filters={filters} data={data} />
            )
            :
        <div className='filter' ref={ref}>
        {
             (
                <>
                {
                    filters.map( ({ width, ...item}, index) => {
                        return (
                            <div key={`filter__item(${index})`} className='filter__item' style={{ width }}>
                                <FilterItem {...item} items={data[index]} />
                            </div>
                        )
                    })
                }
                {
                    Object.values(filterData.fields).some(field => !!field) && <>
                        <div className='filter__confirm'>
                            <Button onClick={()=>onSave(filterData.fields)}>
                                Save changes
                            </Button>
                        </div>
                        <div className='filter__reset' onClick={() => { filterActions.reset(); onSave(); }}>
                            <div className='filter__resetIcon'>
                                <SVG src={images.resetIcon} />
                            </div>
                            <div className='filter__resetTitle'>
                                Reset
                            </div>
                        </div>
                    </>
                }
                
                </>
            )
        }
        </div>
    )
};