import React from 'react';
import { useAtom } from '@reatom/react';

import { Dropdown } from '../Dropdown/Dropdown';

import SVG from 'react-inlinesvg';
import { images } from './images';

import { filterComponentsList } from '../../../constants/filter';
import { filterAtom } from '../../../store/Filter';

import { dropdownTypes } from '../../../constants/dropdown';
import { dateObjToString } from '../../../helpers/lib';

import './filterItem.scss';

const renderFilterContent = (type) => (props) => {
    const Component = filterComponentsList[type];
    return Component ? <Component {...props} /> : null;
};

const getSelectedValue = ({ type, options, matchPropName }) => {
    if(!options) {
        return 'All';
    }
    switch(type) {
        case dropdownTypes.SELECT:
            const itemSelected = options.find(item => item.isSelected)
            return itemSelected ? (matchPropName ? itemSelected[matchPropName] : itemSelected) : 'All'

        case dropdownTypes.MULTISELECT:
            const items = options.filter(item => item.isSelected).length;
            return (items > 0 && items !== options.length) ? `Multiple (${items})` : 'All';

        case dropdownTypes.DATE:
            return dateObjToString(options);
    }
}

export const FilterItem = ({ id, title, matchPropName, mobileTitle, items=[], renderItem, onSelectFormator=(item)=>item, type, }) => {

    const [filterData, filterActions] = useAtom(filterAtom);
    return (
        <div className='filterItem'>
            <Dropdown
                renderSwitcher={ ()=>{
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className='filterItem__info'>
                            <div className='filterItem__title'>
                                {title}
                            </div>
                            <div className='filterItem__selected'>
                            {
                               getSelectedValue({ type, options: filterData.fields[id], matchPropName })
                            }
                            </div>
                        </div>
                            <div className='filterItem__dropdownArrow'>
                                <SVG src={images.sortIcon} />
                            </div>
                        </div>
                    )
                }}
                renderContent={ ({ setIsOpened })=>{
                    return (
                        <div className='filterItem__dropdownContent'>
                        {
                            renderFilterContent(type)({
                                options: filterData.fields[id] || items, 
                                dateSource: filterData.fields[id] || null,
                                renderItem,
                                matchPropName,
                                onChange: (value)=>{ 
                                    filterActions.setFieldValue({
                                        fieldId: id,
                                        fieldValue: value
                                    }); 
                                    type===dropdownTypes.SELECT && setIsOpened(false);
                                    type===dropdownTypes.DATE && value.to && value.from && setIsOpened(false);
                                },
                                mobileConfig: { 
                                    title: mobileTitle,
                                    onClose: () => setIsOpened(false)
                                }
                            })
                        }
                        </div>
                    )
                }}
            />
        </div>
    )
};
