import { config } from './config/config';
import { App } from '../core/App';
import { MainController } from './controllers/MainController';

document.addEventListener('DOMContentLoaded', () => {
	App.init(config, MainController);
});