import React from 'react';

import './profileSettingsItem.scss'
import {Link} from "react-router-dom";

export const ProfileSettingsItem = ({info: {title, description, link}}) => {
    return (
        <Link to={link} className='profileSettingsItem'>
            <p className='profileSettingsItem__title'>{title}</p>
            <p className='profileSettingsItem__description'>{description}</p>
        </Link>
    )
};