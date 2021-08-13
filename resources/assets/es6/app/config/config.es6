import { ENV } from './env';

import { MainController } from '../controllers/MainController';
import { Default } from "../controllers/Default";

import { Home } from '../controllers/Home';

import { InputError } from '../component/InputError';

export const config = {
    debug: ENV === 'dev',
    default: {
        lang: 'en',
        controller: 'Home',
		base_path: ''
    },
    controller: {
        MainController,
        Default,
        Home
    },
    component: {
		InputError
    }
};