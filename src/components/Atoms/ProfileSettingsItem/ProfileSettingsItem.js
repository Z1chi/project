import React from 'react';

import './profileSettingsItem.scss'

export const ProfileSettingsItem = ({info: {title, description}}) => {
    return (
        <div className='profileSettingsItem'>
            <p className='profileSettingsItem__title'>{title}</p>
            <p className='profileSettingsItem__description'>{description}</p>
        </div>
    )
};