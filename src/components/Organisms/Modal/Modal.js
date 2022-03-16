import {useAtom} from '@reatom/react';
import React, {useEffect} from 'react';
import SVG from "react-inlinesvg";

import {modalAtom} from '../../../store/Modal';

import {Backdrop} from '../../Atoms/Backdrop/Backdrop';

import closeIcon from './images/close.svg'

import './modal.scss'

export const Modal = ({icon, title, subtitle, children, onClose}) => {

    const [, modalActions] = useAtom(modalAtom);

    const onCloseHandler = onClose || modalActions.close;

    useEffect(() =>
            document.addEventListener('keydown', (e) =>
                e.keyCode === 27 ? onCloseHandler() : ""),
        []);

    return (
        <div className='modal'>
            <div className='modal__backdrop'>
                <Backdrop onClose={onCloseHandler}/>
            </div>
            <div className='modal__window'>
                {icon && <div className='modal__icon'>
                    <SVG src={icon}/>
                </div>}
                <div className='modal__close' onClick={onCloseHandler}>
                    <SVG src={closeIcon}/>
                </div>
                <div className='modal__title'>
                    {title}
                </div>
                {subtitle && <div className='modal__subtitle'>
                    {subtitle}
                </div>}
                <div className='modal__content'>
                    {children}
                </div>
            </div>
        </div>
    )
};