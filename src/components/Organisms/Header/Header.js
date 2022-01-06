import React from 'react';
import {useAtom} from "@reatom/react";

import {Avatar} from "../../Atoms/Avatar/Avatar";
import {Dropdown} from "../../Molecules/Dropdown/Dropdown";
import {ProfileSettings} from "../ProfileSettings/ProfileSettings";

import i from '../../Molecules/ManagerSidebarCard/images/i.jpeg'
import icon from './images/headerIcon.svg'
import SVG from 'react-inlinesvg'

import './header.scss'

import {profileSettingsAtom} from "../../../store/ProfileSettings";

import {profileSettingsFieldTypeList} from "../../Pages/SettingsPage/data";

import config from "../../../configApi";


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
                                <div className='header__profileSettingsSwitcher'
                                     onClick={() => isOpened === true ? setIsOpened(false) : setIsOpened(true)}>
                                    <Avatar
                                        imageSrc={supportData.img &&
                                        supportData.img[profileSettingsFieldTypeList.current].length > 1 ?
                                            config.root + supportData.img[profileSettingsFieldTypeList.current] : i}
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