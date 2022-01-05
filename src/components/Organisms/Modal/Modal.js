import {useAtom} from '@reatom/react';
import React from 'react';

import SVG from "react-inlinesvg";
import {modalAtom} from '../../../store/Modal';

import {Backdrop} from '../../Atoms/Backdrop/Backdrop';

import closeIcon from './images/close.svg'

import './modal.scss'

export const Modal = ({icon, title, subtitle, content, renderContent = content => content, renderSubmitSection, onClose,}) => {

    const [modalData, modalActions] = useAtom(modalAtom);

    const closeModal = onClose ? onClose : modalActions.close;

    return (
        <div className='modal'>
            <div className='modal__backdrop'>
                <Backdrop onClose={closeModal}/>
            </div>
            <div className='modal__window'>
                {icon && <div className='modal__icon'>
                    <SVG src={icon}/>
                </div>}
                <div className='modal__close' onClick={closeModal}>
                    <SVG src={closeIcon}/>
                </div>
                <div className='modal__title'>
                    {title}
                </div>
                {subtitle && <div className='modal__subtitle'>
                    {subtitle}
                </div>}
                {content && <div className='modal__content'>
                    {renderContent({content})}
                </div>}
                <div className='modal__submit'>
                    {renderSubmitSection({onClose: closeModal, onError: content.onError, formValidator: content.formValidator, data: content.data})}
                </div>
            </div>
        </div>
    )
};