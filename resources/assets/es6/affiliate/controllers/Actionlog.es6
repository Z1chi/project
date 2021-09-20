import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";
import 'bootstrap-daterangepicker'
import 'moment'

export class Actionlog extends Controller {
    init() {
        super.init();
        $('.js_date_range').daterangepicker({
            alwaysShowCalendars: true,
            showCustomRangeLabel: false,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'This week': [moment().startOf('week'), moment().endOf('week')],
                'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'This Year': [moment().startOf('year'), moment().endOf('year')],
                'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
            }
        }, function (start, end, label) {
            Util.insertParam('date', '' + start.format('DD.MM.YYYY') + '-' + end.format('DD.MM.YYYY') + '');
        });

        this.initFilters();

    }

    initFilters() {
        const $filterSelects = $('.js_filter, .js_order');

        $filterSelects.on('change', (event) => {

            const $element = $(event.currentTarget);
            const param = $element.data('param');
            const value = $element.val();
            if (value === '') {
                var originalURL = document.location.href;
                var alteredURL = Util.removeParam(param, originalURL);

                document.location.href = alteredURL;

            } else {

                Util.insertParam(param, value);
            }
        });
    }

}