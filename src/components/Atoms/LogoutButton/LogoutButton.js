import React from 'react';

import SVG from 'react-inlinesvg'
import styled from "styled-components";
import request from "../../../api/request";

import logOut from './images/logOutSvg.svg'

import './logoutButton.scss'

const StyledLogoutButton = styled.div`
 display: ${({sidebar}) => (sidebar ? 'none' : 'block')};
        @media (max-width: 480px) {
        display: block;
       }
`;

export const LogoutButton = ({sidebar,logoutButton}) => {

    const logoutFn = () => {
        request('/logout', {method: 'post'});
        sessionStorage.removeItem('token');
    };

    return (
        <StyledLogoutButton
            sidebar={sidebar}
            className='logoutButton'
            onClick={() => logoutFn()}>
            <div>
                <SVG src={logOut}/>
                <p>{logoutButton}</p>
            </div>
        </StyledLogoutButton>
    )
};