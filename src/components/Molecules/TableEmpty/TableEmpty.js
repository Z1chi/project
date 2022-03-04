import React from 'react';

import SVG from 'react-inlinesvg';
import {Link} from 'react-router-dom';
import {Button} from '../../Atoms/Button/Button';

import './tableEmpty.scss';

export const TableEmpty = ({icon, text, button, link}) => {
    return (
        <div className='tableEmpty'>
            <div className='tableEmpty__icon'>
                <SVG src={icon}/>
            </div>
            <div className='tableEmpty__text'>
                <p>{text}</p>
            </div>

            {button && <div className='tableEmpty__button'>
                {
                    button.link
                        ? <Link to={button.link}>{button.text}</Link>
                        : <Button {...button} />
                }

            </div>}
        </div>
    )
};