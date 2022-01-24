import React from 'react';
import { useAtom } from '@reatom/react';

import { Dropdown } from '../Dropdown/Dropdown';

import SVG from 'react-inlinesvg';
import { images } from './images';

import { filterComponentsList } from '../../../constants/filter';
import { filterAtom } from '../../../store/Filter';

import './filterItem.scss';

const renderFilterContent = (type) => (props) => {
    const Component = filterComponentsList[type];
    return Component ? <Component {...props} /> : null;
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
                            { items && items.options && <div className='filterItem__selected'>
                                {
                                    items.options[items.selectedIndex]
                                }
                            </div> }
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
                                options: items, 
                                renderItem,
                                matchPropName,
                                onChange: (value)=>{ filterActions.setFieldValue({
                                    fieldId: id,
                                    fieldValue: onSelectFormator(value),
                                })},
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
}
