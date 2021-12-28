import React from 'react';
import {Link} from "react-router-dom";

import './aItem.scss';
import config from "../../../configApi";

export const AItem = ({link='/', preview_src, isMobile}) => {


    return (
        <Link to={link} className={`aItem${isMobile ? ' aItem--isMobile' : ""}`}>
            <div className='aItem__background'>
                <img src={config.root + preview_src} alt=''/>
            </div>
        </Link>
    )
};