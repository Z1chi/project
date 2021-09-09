import { ENV } from './env';

import { MainController } from '../controllers/MainController';
import { Default } from '../controllers/Default';
import { Home } from '../controllers/Home';
import { Preferences } from '../controllers/Preferences';
import { Users } from '../controllers/Users';
import { Affiliates } from '../controllers/Affiliates';
import {Admins} from "../controllers/Admins";
import {Account} from "../controllers/Account";

export const config = {
    debug: ENV === 'dev',
    default: {
        lang: false,
        base_path: '/mngr'
    },
    controller: {
        MainController,
        Default,
        Home,
		Preferences,
        Users,
        Affiliates,
        Admins,
        Account
    },
    component: {

    }
};