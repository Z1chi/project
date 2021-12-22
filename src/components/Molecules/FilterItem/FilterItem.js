import React from 'react';

import { Dropdown } from '../Dropdown/Dropdown';
import { Select } from '../Select/Select';
import { MultiSelect } from '../MultiSelect/MultiSelect';

import { filterComponentsList } from '../../../constants/filter';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './filterItem.scss';

const renderFilterContent = (type) => (props) => {
    const Component = filterComponentsList[type];
    return Component ? <Component {...props} /> : null;
}

export const FilterItem = ({ title, mobileTitle, items=[], renderItem, onSelect, type, }) => {
    return (
        <div className='filterItem'>
            <div className='filterItem__info'>
                <div className='filterItem__title'>
                    {title}
                </div>
                { items && items.options && <div className='filterItem__selected'>
                    {
                        items.options[items.selectedIndex]
                    }
                </div> }
            </div>
            <div className='filterItem__dropdown'>
                <Dropdown
                    renderSwitcher={ ()=>{
                        return (
                            <div className='filterItem__dropdownArrow'>
                                <SVG src={images.sortIcon} />
                            </div>
                        )
                    }}
                    renderContent={ ({ setIsOpened })=>{
                        return (
                            <div className='filterItem__dropdownContent'>
                            {
                                renderFilterContent(type)({
                                    options: items, 
                                    renderItem,
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
        </div>
    )
}
