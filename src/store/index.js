import { createStore } from '@reatom/core';

import { alertAtom } from './Alert';
import { currenciesAtom } from './Currencies';
import { drawerAtom } from './Drawer';
import { filterAtom } from './Filter';
import { modalAtom } from './Modal';
import { sidebarAtom } from './Sidebar';

import { creativesAtom } from './Creatives';
import { profileSettingsAtom } from './ProfileSettings';

export const store = createStore({
    alertData: alertAtom,
    currencyData: currenciesAtom,
    drawerData: drawerAtom,
    filterData: filterAtom,
    modalData: modalAtom,
    sidebarData: sidebarAtom,

    creativesData: creativesAtom,
    profileSettingsData: profileSettingsAtom,
});