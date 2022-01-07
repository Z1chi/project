import React, {useEffect} from 'react';
import {useQuery} from "react-query";
import {useAtom} from "@reatom/react";
import SVG from 'react-inlinesvg';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {Avatar} from "../../Atoms/Avatar/Avatar";
import {SettingsItem} from "../../Molecules/SettingsItem/SettingsItem";

import i from '../../Molecules/ManagerSidebarCard/images/i.jpeg';
import avatarUpdateIcon from './images/avatarUpdateIcon.svg'

import request from "../../../api/request";

import {profileSettingsConfig} from './data'
import {profileSettingsAtom} from "../../../store/ProfileSettings";

import './settingsPage.scss';

export const SettingsPage = () => {

    const profileQuery = useQuery('profile', () => {
        return request('/profile/get-data').then(res => res.data)
    });

    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);

    useEffect(() => {
        profileQuery.data && profileSettingsActions.setInitialFields(profileQuery.data);
    }, [profileQuery.data]);

    return (
        <div className='settingsPage'>
            <PageTemplate
                renderPage={({height, width}) => {
                    return (
                        <div
                            className={`settingsPage__content${width < 480 ? ' settingsPage__content--isMobile' : ''}`}>
                            <h3>Personal Settings</h3>
                            <div onClick={() => console.log('UpdateAvatar')} className='settingsPage__contentAvatar'>
                                <Avatar size={width > 480 ? '165px' : '175px'} imageSrc={i}/>
                                <div className='settingsPage__contentAvatar--Icon'>
                                    <SVG src={avatarUpdateIcon}/>
                                </div>
                            </div>
                            {
                                profileQuery.data && profileSettingsConfig.map((settingsField, key) => {
                                        const inputValue = profileQuery.data[settingsField.id];
                                        return (
                                            <div className='settingsPage__contentItem'
                                                 key={`settingsPage__contentItem${key}`}>
                                                <SettingsItem
                                                    isMobile={width < 480}
                                                    {...settingsField}
                                                    value={inputValue || ""}
                                                />
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    )
                }}
            />
        </div>
    )
};