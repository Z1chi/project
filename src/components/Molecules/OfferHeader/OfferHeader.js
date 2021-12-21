import React, {useEffect, useState} from 'react';
import {useResizeDetector} from "react-resize-detector";
import {Link} from "react-router-dom";

import i from "../ManagerSidebarCard/images/i.jpeg";

import {OfferTags} from "../../Atoms/OfferTags/OfferTags";

import './offerHeader.scss';


export const OfferHeader = () => {

    const {width, height, ref} = useResizeDetector();
    const widthHeaderText = width < 768;

    return (
        <div ref={ref} className={`offerHeader${widthHeaderText ? ' offerHeader--column' : ""}`}>
            <div className='offerHeader__logo'>
                <img src={i} alt=""/>
            </div>

            <div className='offerHeader__info'>
                <div className='offerHeader__title'>
                    1x Games
                </div>
                <div className='offerHeader__tags'>
                    <OfferTags styled tags={['Finance', 'Popular Now', 'Editors Pick']}/>
                </div>
                <div className='offerHeader__link'>
                    <a href='www.1xgames.com'> www.1xgames.com</a>
                </div>
                <div className='offerHeader__description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <Link to='/' className='offerHeader__connect'>
                    <p>Connect</p>

                </Link>
            </div>
        </div>
    )
};