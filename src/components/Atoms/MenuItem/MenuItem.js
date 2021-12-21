import React from 'react';
import {Link} from 'react-router-dom';
import SVG from 'react-inlinesvg'
import './menuItem.scss'
import styled from "styled-components";

const StyledLink = styled.div`
    & > a {
        justify-content: ${({sidebarIsOpened}) => (sidebarIsOpened ? 'unset' : 'center')}
       }

`;


export const MenuItem = ({link, onClick, isActive, sidebarIsOpened}) => {
    return (
        <div
            onClick={onClick}
            className={`menuItem${isActive ? ' menuItem--active' : ''}${sidebarIsOpened ? '' : ' menuItem--sidebarIsClosed'}`}>
            <StyledLink  sidebarIsOpened={sidebarIsOpened}>
                <Link
                    className='menuItem__link'
                    to={link.to}>
                    <div className='menuItem__icon'>
                        <SVG src={link.icon}/>
                    </div>
                    <div className='menuItem__text'>
                        {link.text}
                    </div>
                </Link>
            </StyledLink>
        </div>
    )
};