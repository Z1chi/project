import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {MenuItem} from '../../Atoms/MenuItem/MenuItem';
import './menu.scss'

export const Menu = ({links, sidebarIsOpened}) => {
    const {pathname} = useLocation();
    const [activePageLink, setActivePageLink] = useState(pathname);
    return (
        <div className='menu'>
            {
                links.map((link, key) => {
                    return (
                        <div key={key} className='menu__item'>
                            <MenuItem

                                sidebarIsOpened={sidebarIsOpened}
                                link={link}
                                onClick={() => setActivePageLink(link.to)}
                                isActive={activePageLink === link.to}
                            />
                        </div>
                    )
                })
            }

        </div>
    )
};