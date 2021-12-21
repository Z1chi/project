import React from 'react';
import './managerSidebarCard.scss';
import i from './images/i.jpeg'
import telegram from './images/telegram.svg'
import styled from 'styled-components'
import {Avatar} from "../../Atoms/Avatar/Avatar";
import SVG from 'react-inlinesvg'

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

export const ManagerSidebarCard = ({sidebarIsOpened, managerAvatar, managerLink, telegramLink}) => {
    return (
        <ManagerSidebarCardWrapper
            sidebarIsOpened={sidebarIsOpened}
            className='managerSidebarCard'>
            {sidebarIsOpened && <h3 className='managerSidebarCard__title'>
                YOUR PERSONAL MANAGER
            </h3>}
            <ManagerSidebarCardInfo
                sidebarIsOpened={sidebarIsOpened}
                className='managerSidebarCard__info'>
                <ManagerSidebarCardLinkManager
                    sidebarIsOpened={sidebarIsOpened}
                    href='/'
                    target='_blank'
                    className='managerSidebarCard__infoItem'>
                    <Avatar
                        imageSrc={i}
                        size={'36px'}
                    />
                    {sidebarIsOpened &&
                    <p>Pavel Durov</p>}
                </ManagerSidebarCardLinkManager>
                <ManagerSidebarCardLinkTelegram
                    sidebarIsOpened={sidebarIsOpened}
                    href='/'
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