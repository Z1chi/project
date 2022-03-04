import React from 'react';
import {useAtom} from "@reatom/react";
import styled from 'styled-components'
import SVG from 'react-inlinesvg'

import i from './images/i.jpeg'
import telegram from './images/telegram.svg'

import {Avatar} from "../../Atoms/Avatar/Avatar";

import {profileSettingsAtom} from "../../../store/ProfileSettings";

import './managerSidebarCard.scss';


const ManagerSidebarCardWrapper = styled.div`
 margin: ${({sidebarIsOpened}) => sidebarIsOpened ? '24' : '10'}px;
 width: ${({sidebarIsOpened}) => sidebarIsOpened ? '230' : '50'}px;

   @media (max-width: 480px) {
    margin: 15px 16px 10px;
    border: ${({sidebarIsOpened}) => sidebarIsOpened ? '' : '0'};
     width: ${({sidebarIsOpened}) => sidebarIsOpened ? 'unset' : '0'};
   }
`;

const ManagerSidebarCardLinkManager = styled.a`
 margin-top: ${({sidebarIsOpened}) => sidebarIsOpened ? '0' : '8'}px;
`;

const ManagerSidebarCardLinkTelegram = styled.a`
 margin-right: ${({sidebarIsOpened}) => sidebarIsOpened ? '-13' : '0'}px;
`;

const ManagerSidebarCardInfo = styled.div`
   flex-direction: ${({sidebarIsOpened}) => sidebarIsOpened ? 'row' : 'column'};
   padding: ${({sidebarIsOpened}) => sidebarIsOpened ? '0 13px' : '0'};
   height: ${({sidebarIsOpened}) => sidebarIsOpened ? '51px' : '89px'};
`;

export const ManagerSidebarCard = ({sidebarIsOpened, contentData}) => {

    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);

    const supportData = profileSettingsData.fields.support;

    return (
        <ManagerSidebarCardWrapper
            sidebarIsOpened={sidebarIsOpened}
            className='managerSidebarCard'>
            {sidebarIsOpened && <h3 className='managerSidebarCard__title'>
                {contentData.title}
            </h3>}
            <ManagerSidebarCardInfo
                sidebarIsOpened={sidebarIsOpened}
                className='managerSidebarCard__info'>
                <ManagerSidebarCardLinkManager
                    sidebarIsOpened={sidebarIsOpened}
                    href={supportData ? supportData.link : '/'}
                    target='_blank'
                    className='managerSidebarCard__infoItem'>
                    <Avatar
                        imageSrc={supportData ? process.env.MEDIA_URL + supportData.img : i}
                        size={'36px'}
                    />
                    {sidebarIsOpened &&
                    <p>{supportData ? supportData.name : ""}</p>}
                </ManagerSidebarCardLinkManager>
                <ManagerSidebarCardLinkTelegram
                    sidebarIsOpened={sidebarIsOpened}
                    href={supportData ? supportData.link : '/'}
                    target='_blank'
                    className='managerSidebarCard__infoItem'
                >
                    {sidebarIsOpened && <span>telegram</span>}
                    <SVG className='managerSidebarCard__infoItem--telegramImg' src={telegram}/>
                </ManagerSidebarCardLinkTelegram>
            </ManagerSidebarCardInfo>
        </ManagerSidebarCardWrapper>
    )
};