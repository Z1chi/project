import React from 'react';

import {ProfileSettingsItem} from "../../Atoms/ProfileSettingsItem/ProfileSettingsItem";
import {LogoutButton} from "../../Atoms/LogoutButton/LogoutButton";

import './ProfileSettings.scss'

const setting = [
    {
        title: 'Profile',
        description: 'Important account details'
    },
    {
        title: 'Affiliate program',
        description: 'Invite your friends and earn rewards'
    },
    {
        title: 'Dark Mode',
        description: 'Switch dark/light mode'
    },
];

export const ProfileSettings = () => {

    return (
        <div className='profileSettings'>
            <p className='profileSettings__email'>exampleemail@gmail.com</p>
            {
                setting.map((info, key) =>
                    <ProfileSettingsItem key={key} info={info}/>)
            }
            <LogoutButton/>
        </div>
    )
};