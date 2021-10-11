import { ENV } from './env';

import { MainController } from '../controllers/MainController';
import { Default } from '../controllers/Default';
import { Home } from '../controllers/Home';
import { Smartlinks } from '../controllers/Smartlinks';
import { Actionlog } from '../controllers/Actionlog';
import { Withdraw } from '../controllers/Withdraw';
import { Profile } from '../controllers/Profile';
import { RecoveryPassword } from '../controllers/RecoveryPassword';
import { ForgotPassword } from '../controllers/ForgotPassword';

export const config = {
    debug: ENV === 'dev',
    default: {
        lang: false,
        base_path: '/affiliate'
    },
    controller: {
        MainController,
        Default,
        Home,
        Smartlinks,
        Actionlog,
        Withdraw,
        Profile,
        RecoveryPassword,
        ForgotPassword,
    },
    component: {

    }
};