import React, {useState} from 'react';
import { useAtom } from '@reatom/react';

import {Button} from '../../Atoms/Button/Button';
import {FormField} from '../../Molecules/FormField/FormField';

import SVG from 'react-inlinesvg';
import {images} from './images';

import { filterAtom } from '../../../store/Filter';
import { idArrayFormator, dateObjToString } from '../../../helpers/lib';
import { dropdownTypes } from '../../../constants/dropdown';

import './filterMobile.scss';

const getOnSelectFormators = ({type, matchPropName, options}) => {
    switch(type) {
        
    case dropdownTypes.SELECT:
        return {
            value: value => value,
            inputValue: () => {
                const itemSelected = options.find(item => item.isSelected)
                const res = itemSelected ? (matchPropName ? itemSelected[matchPropName] : itemSelected) : 'All';

                return res;
            }
        }

    case dropdownTypes.MULTISELECT:
        return {
            value: value => value,
            inputValue: () => {
                const items = options.filter(item => item.isSelected).length;
                const res = (items > 0 && items !== options.length) ? `Multiple (${items})` : 'All';
    
                return res;
            }
        }
            

        case dropdownTypes.DATE:
            return {
                value: dateObjToString,
                inputValue: dateObjToString,
            };
    }
}

export const FilterMobile = ({filters, data, onSave, onReset}) => {

    const [isOpened, setIsOpened] = useState(false);
    const [filterData, filterActions] = useAtom(filterAtom);

    return (
        <div className={`filterMobile${isOpened?' filterMobile--opened':''}`}>
            {
                isOpened
                    ? (
                        <>
                            <div className='filterMobile__header'>
                                <div className='filterMobile__reset' onClick={onReset}>
                                    <div className='filterMobile__resetIcon'>
                                        <SVG src={images.resetIcon}/>
                                    </div>
                                    <div className='filterMobile__resetText'>
                                        Reset
                                    </div>
                                </div>
                                <div className='filterMobile__title'>
                                    Filters
                                </div>
                                <div className='filterMobile__close' onClick={() => {
                                    setIsOpened(false)
                                }}>
                                    <SVG src={images.closeIcon}/>
                                </div>
                            </div>
                            <div className='filterMobile__fields'>
                                {
                                    filters.map((field, index) => {
                                        const onSelectFormators = getOnSelectFormators({ type: field.type, matchPropName: field.matchPropName, options: filterData.fields[field.id] })
                                        return (
                                            <div className='filterMobile__fieldsItem'>
                                                <FormField isMobile={true} {...field}
                                                value={filterData.fields[field.id] ? onSelectFormators.value(filterData.fields[field.id]) : ''}
                                                inputValue={filterData.fields[field.id] ? onSelectFormators.inputValue(filterData.fields[field.id]) : ''}
                                                options={filterData.fields[field.id] || data[index]} 
                                                onChange={(value)=>{ 
                                                    filterActions.setFieldValue({
                                                        fieldId: field.id,
                                                        fieldValue: value
                                                    });
                                                }}
                                                dateSource={filterData.fields[field.id] || null}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='filterMobile__footer'>
                                <Button onClick={onSave} styles={{width: '100%',}}>
                                    Save changes
                                </Button>
                            </div>
                        </>
                    )
                    : (
                        <div className='filterMobile__dropdown' onClick={() => {
                            setIsOpened(true)
                        }}>
                            <div className='filterMobile__text'>
                                <SVG src={images.filterIcon}/>
                                <span>Filters</span>
                            </div>
                            <div className='filterMobile__arrow'>
                                <SVG src={images.arrowIcon}/>
                            </div>
                        </div>
                    )
            }

        </div>
    )
};