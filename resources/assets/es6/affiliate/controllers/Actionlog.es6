import {Controller} from "../../core/Controller";

export class Actionlog extends Controller {
	init ()
	{
		super.init();

		this.initFilters();
	}

}