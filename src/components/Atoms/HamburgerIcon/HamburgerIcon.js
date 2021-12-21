import React from "react";
import { useAtom } from "@reatom/react";

import { sidebarAtom } from "../../../store/Sidebar";

import './hamburgerIcon.scss'

export const HamburgerIcon = () => {
    const [sidebarData, sidebarActions] = useAtom(sidebarAtom);
    return (
        <div className={`hamburgerIcon${sidebarData.isOpened ? ' open' : ''}`}
             onClick={
                sidebarData.isOpened
                ? sidebarActions.close
                : sidebarActions.open
             }
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
};