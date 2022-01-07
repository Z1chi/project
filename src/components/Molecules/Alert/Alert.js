import React, { useEffect } from 'react';
import { useAtom } from '@reatom/react';

import SVG from 'react-inlinesvg';
import { images } from './images';

import { alertAtom } from '../../../store/Alert';

import './alert.scss';

const getAlertIcon = ({ type }) => {
    return (
        type==='ALERT/SUCCESS'
            ? images.successIcon
            : type==='ALERT/ERROR'
                ? images.errorIcon
                : ''
    )
}

export const Alert = ({ type, message }) => {

    const [alertData, alertActions] = useAtom(alertAtom);

    useEffect( () => {
        setTimeout( () => {
            alertActions.close();
        }, 3000)
    }, [])

    return (
        <div className='alert'>
            <div className='alert__icon'>
                <SVG src={getAlertIcon({ type })} />
            </div>
            <div className='alert__message'>
                {message}
            </div>
        </div>
    )
}