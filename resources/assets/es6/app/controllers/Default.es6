import {Controller} from "../../core/Controller";
import {Header} from "./Header";


// Default controller
export class Default extends Controller {
    init() {
        super.init();
        // Header.changeLanguage();
        Header.hamburger();
        this.headerModal();
        Header.initAuth();
        Header.initSignUp();
    }
}