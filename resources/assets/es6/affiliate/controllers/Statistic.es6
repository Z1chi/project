import {Controller} from "../../core/Controller";
import $ from "jquery";
import {Util} from "../../lib/Util";

export class Statistic extends Controller {
    init ()
    {
        super.init();
        $('.js_date_range').daterangepicker({
            opens: 'right'
        }, function (start, end, label) {
            Util.insertParam('date', '' + start.format('DD.MM.YYYY') + '-' + end.format('DD.MM.YYYY') + '');
        });

        this.initFilters();
    }

}
