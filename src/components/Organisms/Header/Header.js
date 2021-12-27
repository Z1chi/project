import React from 'react';
import {useQuery} from "react-query";

import {Avatar} from "../../Atoms/Avatar/Avatar";
import {Dropdown} from "../../Molecules/Dropdown/Dropdown";
import {ProfileSettings} from "../ProfileSettings/ProfileSettings";

import i from '../../Molecules/ManagerSidebarCard/images/i.jpeg'
import icon from './images/headerIcon.svg'
import SVG from 'react-inlinesvg'

import request from "../../../api/request";

import './header.scss'


export const Header = () => {

    const profileQuery = useQuery('profileDropdown', () => {
        return request('/profile/get-data').then(res => res.data)
    });

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
                                        <p className='header__infoName'>{profileQuery?.data?.name}</p>
                                        <p className='header__infoId'>id: 123456</p>
                                    </div>
                                    <div className='header__dropdownArrow'>
                                        <SVG src={profileQuery?.data?.img ? profileQuery?.data?.img : icon}/>
                                    </div>
                                </div>
                            )
                        }
                    }
                    renderContent={
                        () => {
                            return (
                                <div className='header__profileSettingsContent'>
                                    <ProfileSettings {...profileQuery.data}/>
                                </div>
                            )
                        }
                    }
                />
            </div>
        </div>
    )
};