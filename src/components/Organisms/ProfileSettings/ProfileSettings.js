import React from 'react';
import {useAtom} from "@reatom/react";

import {ProfileSettingsItem} from "../../Atoms/ProfileSettingsItem/ProfileSettingsItem";
import {LogoutButton} from "../../Atoms/LogoutButton/LogoutButton";
import {languageAtom} from "../../../store/language";

import './ProfileSettings.scss'



const setting = [
    {
        title: 'Profile',
        description: 'Important account details',
        onClick: ({history}) => history.push('/settings')
    },
    {
        title: 'Language',
        onClick: ({handler}) => {
            handler()
        }
    }
];

export const ProfileSettings = ({email}) => {
    const [languageData, languageActions] = useAtom(languageAtom);
    return (
        <div className='profileSettings'>
            <p className='profileSettings__email'>{email}</p>
            {
                setting.map((info, key) =>
                    <ProfileSettingsItem key={`profileSettingsItem${key}`} info={info}/>)
            }
            <LogoutButton logoutButton={languageData.data.common.logOut}/>
        </div>
    )
};