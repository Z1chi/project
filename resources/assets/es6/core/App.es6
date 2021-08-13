import { $ } from '../lib/vendor'
import { Factory } from './Factory';

export class App {
    static init (config, MainController) {
        try {
            config.lang = $(document).find('body').attr('data-language') || config.default.lang;
            config.base_path = config.default.base_path;
            config.currency = $(document).find('body').attr('data-currency');

            let controllerName = $(document).find('body').attr('data-controller');
            controllerName = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);

            if (!config.controller[controllerName]) {
                if (config.debug) {
                    console.warn(`App -> Attempt to create nonexistent controller ${controllerName}`);
                }

                controllerName = 'Default';
            }

            const factory  = new Factory(config.component);

            const mainController = new MainController(factory, config);
            const pageController = new config.controller[controllerName](factory, config);

            if (config.debug) {
                console.info('Controller: "%s"', controllerName);
            }

            mainController.init();
            pageController.init();
            mainController.afterAction();

        } catch (error) {
            if (config.debug) {
                console.error(error);
            }
        }
    }
}