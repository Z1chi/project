import { $ } from './vendor';
import CONST from "./const";

export class Util {
    static generateString (length = 5) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let string =  '';

        for (let i = 0; i < length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            string += chars.substring(rnum, rnum + 1);
        }

        return string;
    }

    static getActualHeight ($element) {
        const $clone = $element.clone().appendTo($element.parent());

        $clone.css({height: 'auto'});
        const height = $clone.height();
        $clone.remove();

        return height;
    }

    static changeLocation (newLocation = '/') {
        location.href = newLocation;
    }

    static reload () {
        location.reload();
    }

    static copyObject (obj) {
        return JSON.parse( JSON.stringify(obj) );
    }

    static ajax (request = {}, onResponse = $.noop) {
        return $.ajax($.extend({
            data:      {},
            type:     'post',
            dataType: 'json',
            success:  response => onResponse(response),
            error:    response => onResponse(response)
        }, request));
    }

    static inArray (haystack, needle) {
        return haystack.indexOf(needle) !== -1;
    }

    static getBreakpoint () {
        let width = $(window).width();
        let breakpoint;

        if (width <= CONST.BREAKPOINT) {
            breakpoint = CONST.BREAKPOINT_TABLET;
        } else {
            breakpoint = CONST.BREAKPOINT_DESKTOP;
        }

        return breakpoint;
    }

	static isTouchDevice() {
		try {
			document.createEvent('TouchEvent');
			return true;
		} catch (e) {
			return false;
		}
	}

	static isMobileScreen() {
		return window.matchMedia('(max-width: 767px)').matches;
	}

	static setCkEditorValues ()
    {
		let $textAreas = $('textarea[name^="text_"]');

		for (var t of $textAreas)
		{
			const textareaName = t.name;
			const textareaValue = CKEDITOR.instances[textareaName].getData();

			$(t).val(textareaValue);
		}
    }

    // todo: separate form component

    static formHasEmptyRequired ($requestForm)
	{
		let hasErrors = false;

		$requestForm.find('input').each(function()
		{
			if ($(this).data('required') === true && $(this).val() === '')
			{
				$(this).addClass('error');
				hasErrors = true;
			}
		});

		return hasErrors;
	}

	static formRemoveErrorOnFocus ($requestForm)
	{
		$requestForm.find('input').on('focus', (event) => {
			const currentTarget = $(event.currentTarget);
			currentTarget.removeClass('error');
		});
	}

	static formSubmitOnClick ($submitButton, $requestForm)
	{
		$submitButton.on('click', (event) => {
			event.preventDefault();
			$requestForm.submit();
		});
	}

	static getUrlVars()
	{
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	static getUrlParam(parameter, defaultvalue)
	{
		var urlparameter = defaultvalue;
		if(window.location.href.indexOf(parameter) > -1){
			urlparameter = Util.getUrlVars()[parameter];
		}
		return urlparameter;
	}

	static removeQueryString ()
	{
		var uri = window.location.toString();
		if (uri.indexOf("?") > 0) {
			var clean_uri = uri.substring(0, uri.indexOf("?"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	static numberWithSpaces(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

	static insertParam(key, value) {
		key = escape(key); value = encodeURIComponent(value);

		var kvp = document.location.search.substr(1).split('&');
		if (kvp == '') {
			document.location.search = '?' + key + '=' + value;
		}
		else {

			var i = kvp.length; var x; while (i--) {
				x = kvp[i].split('=');

				if (x[0] == key) {
					x[1] = value;
					kvp[i] = x.join('=');
					break;
				}
			}

			if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

			//this will reload the page, it's likely better to store this until finished
			document.location.search = kvp.join('&');
		}
	}

	static removeParam(key, sourceURL) {
		var rtn = sourceURL.split("?")[0],
			param,
			params_arr = [],
			queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
		if (queryString !== "") {
			params_arr = queryString.split("&");
			for (var i = params_arr.length - 1; i >= 0; i -= 1) {
				param = params_arr[i].split("=")[0];
				if (param === key) {
					params_arr.splice(i, 1);
				}
			}
			rtn = rtn + "?" + params_arr.join("&");
		}
		return rtn;
	}

	// used in affiliate
	static handleBootstrapErrors ($form, response)
	{
		$form.find('input, select').on('focus', (event) => {

			const $element = $(event.currentTarget);
			$element.closest('.form-group').removeClass('has-error')

		});

		Object.keys(response.data).forEach(name => {
			const $msg = $(`<span class="help-block">${response.data[name]}</span>`);

			$form.find(`[name="${name}"]`).parent().find('.help-block').remove();

			$form
				.find(`[name="${name}"]`)
				.one('focus click change', () => {
					$msg.closest('.form-group').removeClass('has-error');
					$msg.remove();
				})
				.closest('.form-group')
				.addClass('has-error')
				.append($msg);
		});
	}

	// used in affiliate
	static handleFormErrors ($form, response)
	{
		$form.find('input, select').on('focus', (event) => {

			const $element = $(event.currentTarget);
			$element.closest('.input-data').removeClass('has-error')

		});

		Object.keys(response.data).forEach(name => {
			const $msg = $(`<span class="error-label">${response.data[name]}</span>`);

			$form.find(`[name="${name}"]`).parent().find('.error-label').remove();

			$form
				.find(`[name="${name}"]`)
				.one('focus click change', (event) => {
					const trgt = event.currentTarget;
					$(trgt).parent().find('.error-label').remove();
					$(trgt).closest('.input-data').removeClass('has-error');
				})
				.closest('.input-data')
				.addClass('has-error')
				.find('label')
				.append($msg);
		});
	}
}