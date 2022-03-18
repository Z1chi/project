import React from 'react';
import {useAtom} from "@reatom/react";

import {ProfileSettingsItem} from "../../Atoms/ProfileSettingsItem/ProfileSettingsItem";
import {LogoutButton} from "../../Atoms/LogoutButton/LogoutButton";
import {languageAtom} from "../../../store/language";

import './ProfileSettings.scss'





export const ProfileSettings = ({email}) => {
    const [langData,] = useAtom(languageAtom);
    const setting = [
        {
            title: langData.data.common.profileMenu.profile.title,
            description: langData.data.common.profileMenu.profile.description,
            onClick: ({history}) => history.push('/settings')
        },
        {
            title: langData.data.common.profileMenu.language.title,
            onClick: ({handler}) => {
                handler()
            }
        }
    ];
    const [languageData,] = useAtom(languageAtom);
    return (
        <div className='profileSettings'>
            <p className='profileSettings__email'>{email}</p>
            {
                setting.map((info, key) =>
                    <ProfileSettingsItem key={`profileSettingsItem${key}`} info={info} contentData={langData.data}/>)
            }
            <LogoutButton logoutButton={languageData.data.common.logOut}/>
        </div>
    )
};