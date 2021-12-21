import React from 'react';

import SVG from 'react-inlinesvg'
import styled from "styled-components";

import logOut from './images/logOutSvg.svg'

import './logoutButton.scss'

const StyledLogoutButton = styled.div`
 display: ${({sidebar}) => (sidebar ? 'none' : 'block')};
        @media (max-width: 480px) {
        display: block;
       }
`;

export const LogoutButton = ({sidebar}) => {
    return (
        <StyledLogoutButton sidebar={sidebar} className='logoutButton'>
            <div>
                <SVG src={logOut}/>
                <p>Log out</p>
            </div>
        </StyledLogoutButton>
    )
};