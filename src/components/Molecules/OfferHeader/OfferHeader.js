import React, {useEffect, useState} from 'react';
import {useResizeDetector} from "react-resize-detector";
import {Link} from "react-router-dom";

import i from "../ManagerSidebarCard/images/i.jpeg";

import {OfferTags} from "../../Atoms/OfferTags/OfferTags";

import config from '../../../configApi'

import './offerHeader.scss';


export const OfferHeader = ({title, link, small_description, image, id}) => {

    const {width, height, ref} = useResizeDetector();
    const widthHeaderText = width < 768;

    return (
        <div ref={ref} className={`offerHeader${widthHeaderText ? ' offerHeader--column' : ""}`}>
            <div className='offerHeader__logo'>
                <img src={config.root + image} alt=""/>
            </div>

            <div className='offerHeader__info'>
                <div className='offerHeader__title'>
                    {title}
                </div>
                <div className='offerHeader__tags'>
                    <OfferTags styled tags={['Finance', 'Popular Now', 'Editors Pick']}/>
                </div>
                <div className='offerHeader__link'>
                    <a href={link}>{link}</a>
                </div>
                <div className='offerHeader__description'>
                    {small_description}
                </div>
                <Link to={`/creatives/${id}`} className='offerHeader__connect'>
                    <p>Connect</p>

                </Link>
            </div>
        </div>
    )
};