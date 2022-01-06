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

import {profileSettingsConfig, profileSettingsFieldTypeList} from './data'
import {profileSettingsAtom} from "../../../store/ProfileSettings";

import './settingsPage.scss';

export const SettingsPage = () => {


    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);


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
                                profileSettingsConfig.map((settingsField, key) => {
                                        const inputValue = profileSettingsData.fields[settingsField.id] &&
                                            profileSettingsData
                                                .fields[settingsField.id][profileSettingsFieldTypeList.current];
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