import React from 'react';
import {useHistory} from "react-router-dom";

import './aItem.scss';

export const AItem = ({link = "", preview_src, isMobile, handler}) => {
    const history = useHistory();

    return (
        <div onClick={()=> link  ? history.push(link) : handler ? handler() : ""  } className={`aItem${isMobile ? ' aItem--isMobile' : ""}`} >
            <div className='aItem__background'>
                <img src={process.env.MEDIA_URL + preview_src} alt=''/>
            </div>
        </div>
    )
};