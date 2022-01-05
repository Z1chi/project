import React from 'react';
import {Link} from "react-router-dom";

import './aItem.scss';

export const AItem = ({link = '', preview_src, isMobile}) => {


    return (
        <Link to={link} className={`aItem${isMobile ? ' aItem--isMobile' : ""}`} >
            <div className='aItem__background'>
                <img src={process.env.MEDIA_URL + preview_src} alt=''/>
            </div>
        </Link>
    )
};