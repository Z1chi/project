import { createStore } from '@reatom/core';

import { alertAtom } from './Alert';
import { drawerAtom } from './Drawer';
import { modalAtom } from './Modal';
import { sidebarAtom } from './Sidebar';

import { creativesAtom } from './Creatives';
import { profileSettingsAtom } from './ProfileSettings';

export const store = createStore({
    alertData: alertAtom,
    drawerData: drawerAtom,
    modalData: modalAtom,
    sidebarData: sidebarAtom,

    creativesData: creativesAtom,
    profileSettingsData: profileSettingsAtom,
});