import React from 'react';

import {Backdrop} from '../../Atoms/Backdrop/Backdrop';
import {FormField} from '../../Molecules/FormField/FormField';

import SVG from 'react-inlinesvg';
import {images} from './images';

import './drawer.scss';

export const Drawer = ({onClose, logo, title, subtitle, fieldRows, renderFooter}) => {
    return (
        <>
        <Backdrop onClose={onClose}/>
        <div className='drawer'>
            <div className='drawer__close' onClick={onClose}>
                <SVG src={images.closeIcon}/>
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
                                            <FormField {...field} />
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