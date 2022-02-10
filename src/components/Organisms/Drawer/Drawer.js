import React, { useEffect } from 'react';
import { useAtom } from '@reatom/react';

import {Backdrop} from '../../Atoms/Backdrop/Backdrop';
import {FormField} from '../../Molecules/FormField/FormField';

import SVG from 'react-inlinesvg';
import {images} from './images';

import { drawerAtom } from '../../../store/Drawer';

import './drawer.scss';

export const Drawer = ({ data, onClose, logo, title, subtitle, fieldRows, }) => {
    const [drawerData, drawerActions] = useAtom(drawerAtom);
    
    useEffect( () => {
        
    },[drawerData])

    return (
        <>
        <Backdrop onClose={onClose}/>
        <div className='drawer'>
            <div className='drawer__close'>
                <SVG src={images.closeIcon} onClick={onClose} />
            </div>
            <div className='drawer__header'>
                <div className='drawer__logo'>
                    <img src={logo} alt=''/>
                </div>
                <div className='drawer__title'>
                    {title}
                </div>
                <div className='drawer__subtitle'>
                    {subtitle}
                </div>
            </div>
            <div className='drawer__form'>
                {
                    fieldRows.map( row => {
                        return (
                            <div className='drawer__formRow'>
                            {
                                row.map(field => {
                                    return (
                                        <div className='drawer__formField'>
                                            <FormField {...field}
                                                stateData={drawerData.fieldValues}
                                                options={field.id ? data[field.id] : []}
                                                fieldValue={(field.id && drawerData.fieldValues) ? drawerData.fieldValues[field.id] : ''}
                                                onChange={field.id ? (value) => drawerActions.setFieldValue({
                                                    fieldId: field.id,
                                                    fieldValue: value,
                                                }) : ()=>{} } 
                                            />
                                        </div>
                                    )
                                })
                            }
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}