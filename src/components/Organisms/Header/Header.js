import React from 'react';

import {Avatar} from "../../Atoms/Avatar/Avatar";
import {Dropdown} from "../../Molecules/Dropdown/Dropdown";
import {ProfileSettings} from "../ProfileSettings/ProfileSettings";

import i from '../../Molecules/ManagerSidebarCard/images/i.jpeg'
import icon from './images/headerIcon.svg'
import SVG from 'react-inlinesvg'

import './header.scss'

export const Header = () => {

    return (
        <div className='header'>

            <div className='header__profileSettings'>
                <Dropdown
                    renderSwitcher={
                        ({setIsOpened, isOpened}) => {
                            return (
                                <div className='header__profileSettingsSwitcher'
                                     onClick={() => isOpened === true ? setIsOpened(false) : setIsOpened(true)}>
                                    <Avatar imageSrc={i} size={"36px"}/>
                                    <div className='header__info'>
                                        <p className='header__infoName'>Pavel Martinov</p>
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
                                    <ProfileSettings/>
                                </div>
                            )
                        }
                    }
                />
            </div>
        </div>
    )
};