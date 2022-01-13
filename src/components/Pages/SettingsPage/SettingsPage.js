import React, {useState} from 'react';
import {useAtom} from "@reatom/react";
import SVG from 'react-inlinesvg';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {Avatar} from "../../Atoms/Avatar/Avatar";
import {SettingsItem} from "../../Molecules/SettingsItem/SettingsItem";
import {Modal} from "../../Organisms/Modal/Modal";
import {AvatarEditor} from "../../Molecules/AvatarEditor/AvatarEditor";

import i from '../../Molecules/ManagerSidebarCard/images/i.jpeg';
import avatarUpdateIcon from './images/avatarUpdateIcon.svg'

import {profileSettingsConfig, profileSettingsFieldTypeList} from './data'
import {profileSettingsAtom} from "../../../store/ProfileSettings";

import './settingsPage.scss';

export const SettingsPage = () => {

    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);
    const [modalAvatar, setModalAvatar] = useState(false);

    return (
        <div className='settingsPage'>
            <PageTemplate
                renderPage={({width}) => {
                    return (
                        <div
                            className={`settingsPage__content${width < 480 ? ' settingsPage__content--isMobile' : ''}`}>
                            <h3>Personal Settings</h3>
                            <div onClick={() => setModalAvatar(true)} className='settingsPage__contentAvatar'>
                                {
                                    profileSettingsData.fields.img &&
                                    profileSettingsData.fields.img[profileSettingsFieldTypeList.current] &&
                                    <Avatar
                                        size={width > 480 ? '165px' : '175px'}
                                        imageSrc={process.env.MEDIA_URL +
                                        profileSettingsData.fields.img[profileSettingsFieldTypeList.current]}/>
                                }
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
            {modalAvatar &&
            <Modal onClose={() => setModalAvatar(false)}>
                {
                    profileSettingsData.fields.img &&
                    <AvatarEditor onClose={setModalAvatar}/>
                }
            </Modal>}
        </div>
    )
};