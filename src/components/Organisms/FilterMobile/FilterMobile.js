import React, { useState } from 'react';
import { useAtom } from '@reatom/react';
import { Button } from '../../Atoms/Button/Button';
import { FormField } from '../../Molecules/FormField/FormField';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './filterMobile.scss';

export const FilterMobile = ({ filters, onSave, }) => {

    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className='filterMobile'>
        {
            isOpened
            ? (
                <>
                <div className='filterMobile__header'>
                    <div className='filterMobile__reset'>
                        <div className='filterMobile__resetIcon'>
                            <SVG src={images.resetIcon} />
                        </div>
                        <div className='filterMobile__resetText'>
                            Reset
                        </div>
                    </div>
                    <div className='filterMobile__title'>
                        Filter
                    </div>
                    <div className='filterMobile__close' onClick={()=>{setIsOpened(false)}}>
                        <SVG src={images.closeIcon} />
                    </div>
                </div>
                <div className='filterMobile__fields'>
                {
                    filters.map( field => {
                        return (
                            <div className='filterMobile__fieldsItem'>
                                <FormField title={field.title} type={field.type} placeholder={field.placeholder} />
                            </div>
                        )
                    })
                }
                </div>
                <div className='filterMobile__footer'>
                    <Button onClick={onSave} styles={{ width: '100%', }}>
                        Save changes
                    </Button>
                </div>
                </>
            )
            : (
                <div className='filterMobile__dropdown' onClick={()=>{setIsOpened(true)}}>
                    <div className='filterMobile__text'>
                        <SVG src={images.filterIcon} />
                        <span>Filters</span>
                    </div>
                    <div className='filterMobile__arrow'>
                        <SVG src={images.arrowIcon} />
                    </div>
                </div>
            )
        }
            
            
        </div>
    )
}