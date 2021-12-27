import React from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { FilterItem } from '../../Molecules/FilterItem/FilterItem';
import { FilterMobile } from '../FilterMobile/FilterMobile';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './filter.scss';

export const Filter = ({ filters, data, }) => {

    const {width, height, ref} = useResizeDetector();
    const isMobile = width <= 768;

    return (
        <div className='filter' ref={ref}>
        {
            isMobile
            ? (
                <FilterMobile filters={filters} data={data} />
            )
            : (
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
                <div className='filter__reset'>
                    <div className='filter__resetIcon'>
                        <SVG src={images.resetIcon} />
                    </div>
                    <div className='filter__resetTitle'>
                        Reset
                    </div>
                </div>
                </>
            )
        }
        </div>
    )
};