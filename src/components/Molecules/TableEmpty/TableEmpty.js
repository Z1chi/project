import React from 'react';

import SVG from 'react-inlinesvg';
import { Button } from '../../Atoms/Button/Button';

import './tableEmpty.scss';

export const TableEmpty = ({ icon, text, button }) => {
    return (
        <div className='tableEmpty'>
            <div className='tableEmpty__icon'>
                <SVG src={icon} />
            </div>
            <div className='tableEmpty__text'>
                <p>{text}</p>
            </div>
            <div className='tableEmpty__button'>
                <Button {...button} />
            </div>
        </div>
    )
}