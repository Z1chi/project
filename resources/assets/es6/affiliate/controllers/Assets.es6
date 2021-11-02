import {Controller} from "../../core/Controller";
import $ from "jquery";

export class Assets extends Controller {
    init ()
    {
        super.init();
        super.initFilters();


        $('.asset-preview').on('click', (event) => {
            $(event.currentTarget).parents('.asset-block').find('.tooltip').fadeIn(60, function () {
                setTimeout(() => {
                    $(this).fadeOut()
                }, 10000)
            });
        })
    }
}