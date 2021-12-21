import React, {useState} from 'react';
import {useResizeDetector} from "react-resize-detector";

import {OfferGridItem} from '../../Molecules/OfferGridItem/OfferGridItem';

import './offerGrid.scss';

export const OfferGrid = ({description, descriptionData, rows}) => {

    const {width, height, ref} = useResizeDetector();


    return (
        <div ref={ref} className={`offerGrid${width < 811 ? ' offerGrid--column' : ''}`}>
            <div className='offerGrid__description'>
                <OfferGridItem {...description} data={descriptionData}/>
            </div>
            <div className='offerGrid__content'>
                {
                    rows.map((row, rowKey) => {
                        const isSingleSlider = width < 511 && row.length === 1 && row[0].isSlider;
                        return (
                            <div key={rowKey}
                                 className={`offerGrid__row${isSingleSlider ? ' offerGrid__row--slider' : ""}`}>
                                {row.map((rowItem, rowItemKey) => {


                                        return (
                                            <div key={rowItemKey} className='offerGrid__rowItem'>
                                                <OfferGridItem {...rowItem} width={width}/>
                                            </div>)
                                    }
                                )}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};