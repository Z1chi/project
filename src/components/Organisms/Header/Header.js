import React from 'react';
import {useAtom} from "@reatom/react";
import SVG from 'react-inlinesvg'

import {Avatar} from "../../Atoms/Avatar/Avatar";
import {Dropdown} from "../../Molecules/Dropdown/Dropdown";
import {ProfileSettings} from "../ProfileSettings/ProfileSettings";

import i from '../../Molecules/ManagerSidebarCard/images/i.jpeg'
import icon from './images/headerIcon.svg'

import './header.scss'

import {profileSettingsAtom} from "../../../store/ProfileSettings";

import {profileSettingsFieldTypeList} from "../../Pages/SettingsPage/data";



export const Header = () => {

    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);

    const supportData = profileSettingsData.fields;
    return (
        <div className='header'>

            <div className='header__profileSettings'>
                <Dropdown
                    renderSwitcher={
                        ({setIsOpened, isOpened}) => {
                            return (
                                <div className='header__profileSettingsSwitcher'>
                                    <Avatar
                                        imageSrc={supportData.img &&
                                        supportData.img[profileSettingsFieldTypeList.current].length > 1 ?
                                            process.env.MEDIA_URL + supportData.img[profileSettingsFieldTypeList.current] : i}
                                        size={"36px"}/>
                                    <div className='header__info'>
                                        <p className='header__infoName'>{supportData.name &&
                                        supportData.name[profileSettingsFieldTypeList.current]}</p>
                                        <p className='header__infoId'>id: 123456</p>
                                    </div>
                                    <div className='header__dropdownArrow'>
                                        <SVG src={icon}/>
                                    </div>
                                </div>
                            )
                        }
                    }
                    renderContent={
                        () => {
                            return (
                                <div className='header__profileSettingsContent'>
                                    <ProfileSettings
                                        email={supportData.email ?
                                            supportData.email[profileSettingsFieldTypeList.current] : ''}/>
                                </div>
                            )
                        }
                    }
                />
            </div>
        </div>
    )
};