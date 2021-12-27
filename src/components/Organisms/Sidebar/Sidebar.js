import React from 'react'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'

import {Menu} from '../../Molecules/Menu/Menu';
import {HamburgerIcon} from '../../Atoms/HamburgerIcon/HamburgerIcon';
import {ManagerSidebarCard} from "../../Molecules/ManagerSidebarCard/ManagerSidebarCard";
import {LogoutButton} from "../../Atoms/LogoutButton/LogoutButton";

import trafburg from './images/menu-icon-trafburg.svg'
import trafburgIcon from './images/menu-icon-trafburgMob.svg'

import {menuLinks} from "./data";

import './sidebar.scss'


const SidebarContent = styled.div`
   overflow-x: ${({sidebarIsOpened}) => (sidebarIsOpened && 'hidden')};
   overflow-y: auto;
        @media (max-width: 480px) {
        height: ${({sidebarIsOpened}) => (sidebarIsOpened ? '100vh' : '60px')};
        overflow-x: ${({sidebarIsOpened}) => (sidebarIsOpened ? 'hidden' : 'clip')};
          transition: all ease 0.3s;
        }
`;

const SidebarContentMenu = styled.div`
 padding-top: ${({sidebarIsOpened}) => (sidebarIsOpened ? '60' : '115')}px;
       @media (max-width: 480px) {
        padding-top: ${({sidebarIsOpened}) => (sidebarIsOpened ? '60' : '0')}px;
        margin-bottom: 30px;
      }
`;


export const Sidebar = ({sidebarIsOpened, setSidebarIsOpened}) => {

    return (
        <SidebarContent sidebarIsOpened={sidebarIsOpened} className={`sidebar${sidebarIsOpened ? " open" : ""}`}>
            <div className='sidebar__header'>
                <div className='sidebar__titleWrapper'>
                    <div className='sidebar__icon'>
                        <SVG src={trafburgIcon}/>
                    </div>
                    <div className='sidebar__title'>
                        <SVG src={trafburg}/>
                    </div>

                </div>
                <HamburgerIcon
                    sidebarIsOpened={sidebarIsOpened}
                    setSidebarIsOpened={setSidebarIsOpened}
                />
            </div>
            <SidebarContentMenu
                sidebarIsOpened={sidebarIsOpened}
                className='sidebar__menu'>
                <Menu
                    links={menuLinks}
                    sidebarIsOpened={sidebarIsOpened}
                />
            </SidebarContentMenu>
            {sidebarIsOpened && <LogoutButton sidebar className='menu__button'/>}
            <ManagerSidebarCard sidebarIsOpened={sidebarIsOpened}/>

        </SidebarContent>
    )
};