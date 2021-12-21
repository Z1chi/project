import React from 'react';
import {Link} from "react-router-dom";

import './aItem.scss';

export const AItem = ({link, backgroundImage, isMobile}) => {


    return (
        <Link to={link} className={`aItem${isMobile ? ' aItem--isMobile' : ""}`}>
            <div className='aItem__background'>
                <img src={backgroundImage} alt=''/>
            </div>
        </Link>
    )
};