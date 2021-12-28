import React from 'react';

import {ProfileSettingsItem} from "../../Atoms/ProfileSettingsItem/ProfileSettingsItem";
import {LogoutButton} from "../../Atoms/LogoutButton/LogoutButton";

import './ProfileSettings.scss'

const setting = [
    {
        title: 'Profile',
        description: 'Important account details',
        link : '/settings'
    },
    // {
    //     title: 'Affiliate program',
    //     description: 'Invite your friends and earn rewards'
    // },
    // {
    //     title: 'Dark Mode',
    //     description: 'Switch dark/light mode'
    // },
];

export const ProfileSettings = ({email}) => {

    return (
        <div className='profileSettings'>
            <p className='profileSettings__email'>{email}</p>
            {
                setting.map((info, key) =>
                    <ProfileSettingsItem key={`profileSettingsItem${key}`} info={info}/>)
            }
            <LogoutButton/>
        </div>
    )
};