import React from 'react';

import SVG from 'react-inlinesvg';
import { images } from './images';

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