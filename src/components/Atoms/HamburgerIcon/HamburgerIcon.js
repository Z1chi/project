import React, {useEffect, useState} from "react";
import {useAtom} from "@reatom/react";

import {sidebarAtom} from "../../../store/Sidebar";

import './hamburgerIcon.scss'

export const HamburgerIcon = () => {
    const [blockSidebar, setBlockSidebar] = useState(true);
    useEffect(() => {
        setBlockSidebar(window.innerWidth > 710 || window.innerWidth < 481);
    }, [window.innerWidth]);

    const [sidebarData, sidebarActions] = useAtom(sidebarAtom);
    const sidebarFn = () => {
        return sidebarData.isOpened ? sidebarActions.close() : sidebarActions.open()
    };
    return (
        <div className={`hamburgerIcon${sidebarData.isOpened ? ' open' : ''}`}
             onClick={() => blockSidebar ? sidebarFn() : ''}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
};