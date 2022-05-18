import Cookies from 'universal-cookie';

let CookiesInstance = null;

const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const setCookiesInstance = cookiesInstance => {
    CookiesInstance = cookiesInstance || new Cookies();
};

export const getCookiesInstance = () => CookiesInstance || new Cookies();

export const setToken = () => {
    const url = new URL(window.location.href);
    const urlT = url.searchParams.get("token");
    urlT ? sessionStorage.setItem('token', 'Bearer ' + urlT) : '';
    const tParam = urlT || sessionStorage.getItem('token');
    return tParam ? {"Authorization": tParam} : false

};

export const getToken = () => {
    const tParam = sessionStorage.getItem('token');
    return tParam ? {Authorization: tParam} : {};
};

function clearCookie(str) {
    return str.replace(/[^a-z0-9!#$%&'()*+\-./:<>?@[\]^_`{|}~]/gi, '');
}

export const getCookies = () => {
    if (CookiesInstance == null) return null;
    const cookiesObject = CookiesInstance.getAll();
    return Object.entries(cookiesObject).reduce(
        (acc, [key, value]) => (typeof value === 'string' ? `${acc} ${key}=${clearCookie(value)};` : acc),
        ''
    );
};

export const urlHasParams = (url) => url.indexOf('?') > 0 ? `${url}&${window.location.search.substr(1)}` : `${url}${window.location.search}`;

export const arrayToObj = array => {
    const obj = array.reduce((acc, cur, i) => {
        if (typeof cur === 'object') {
            Object.keys(cur).forEach(key => {
                acc[`${i}~${key}`] = cur[key];
            });
        } else if (['string', 'number', 'boolean'].includes(typeof cur)) {
            acc[i] = cur;
        }
        return acc;
    }, {});
    return obj;
};

export const objToArray = obj => {
    const array = [];
    Object.keys(obj).forEach(key => {

        if (array[key] == null) {
            array[key] = {};
        }
        array[key] = obj[key];
    });
    return array;
};

export const localeString = ({value = 0, currencySymbol = 'USD', locales = 'ja-JP'}) =>
    (value).toLocaleString(locales, {style: 'currency', currency: currencySymbol});

export const getChartDate = (date) => {
    const isTime = date.match(/^\d{2}\:\d{2}$/);
    if(isTime) {
        return date;
    }
    const [year, month, day] = date.split('-');
    return `${day} ${monthArr.find((item, key) =>
        key + 1 === Number(month) ? item : '')}`
}

export const dateStringFormator = (dateTimeString) => {
    if(!dateTimeString) {
        return ''
    }

    const [date, time] = dateTimeString.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minutes] = time.split(':');
    const timeFn = () => {
        let hourFn = hour;
        if (hour > 12) {
            hourFn = hour - 12
        }
        return `${hourFn}:${minutes} ${hour > 12 ? 'PM' : 'AM'}`
    };
    return `${monthArr.find((item, key) =>
        key + 1 === Number(month) ? item : '')} ${day}, ${year} ${timeFn()}`
};

export const dateObjToString = ({ from, to }) => {
    const fromDateString = from ? `${from.month.toString().padStart(2, '0')}/${from.day.toString().padStart(2, '0')}/${from.year.toString().slice(2,4)}` : '';
    const toDateString = to ? ` - ${to.month.toString().padStart(2, '0')}/${to.day.toString().padStart(2, '0')}/${to.year.toString().slice(2,4)}` : '';

    // const fromString = from ? `${monthArr[from.month]} ${from.day.toString().padStart(2, '0')}, ${from.year}` : '';
    // const toString = to ? ` - ${monthArr[to.month]} ${to.day.toString().padStart(2, '0')}, ${to.year}` : '';

    // const fromDateString = from.replace(/\-/g, '/')
    // const toDateString = ` - ${to.replace(/\-/g, '/')}`

    return `${fromDateString}${(toDateString&&toDateString!==fromDateString)?toDateString:''}`
}

export const dateFormator = (dateObject) => {
    return {
        from: `${dateObject.from.year}-${dateObject.from.month.toString().padStart(2, '0')}-${dateObject.from.day.toString().padStart(2, '0')} 00:00:00`,
        to: `${dateObject.to.year}-${dateObject.to.month.toString().padStart(2, '0')}-${dateObject.to.day.toString().padStart(2, '0')} 23:59:59`
    }
};

const getDateObj = (date) => {
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    return {
        day,
        month,
        year
    }
}

const getDateString = (date) => {
    const {day, month, year} = getDateObj(date);
    return `${year}-${(month).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const dateObjFormator = ({ from, to }) => {
    return {
        from: getDateString(from),
        to: getDateString(to),
    }
}

export const dateToObjFormator = ({ from, to }) => {
    return {
        from: getDateObj(from),
        to: getDateObj(to),
    }
}

export const currencyFormator = (item) => `${item.symbol} ${item.amount}`;

const getPropQueryParam = (property, isProp) => {
    return isProp ? '[' + property + ']' : property
};

export const convertToQueryString = (object, currentBreadcrum = '', isProp = false) => {
    let queryString = '';

    if (!object || Object.keys(object).length === 0) {
        return '';
    }

    for (let property in object) {
        let potentialObject = object[property];

        if (typeof potentialObject === 'undefined') {
            potentialObject = '';
        } // set undefined values to an empty string

        if (typeof potentialObject === 'object') {
            queryString += convertToQueryString(potentialObject, currentBreadcrum + property, true,);
        } else {
            if (currentBreadcrum === '' && queryString === '') { // don't prepend an '&' if it's the first item in the query string
                queryString += currentBreadcrum + getPropQueryParam(property, isProp) + '=' + potentialObject;
            } else {
                queryString += '&' + currentBreadcrum + getPropQueryParam(property, isProp) + '=' + potentialObject;
            }
        }
    }

    return queryString.replace('/\&=$/', '');
};

export const idArrayFormator = (itemArray)=>itemArray.filter(item => item.isSelected).map(item => item.id).join(',');
export const idSelectFormator = ({ source, propName })=> source.find ? source.find(item => item.isSelected)[propName] : source[propName];

export const copyToClipboard = (textToCopy) => {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
    } else {
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}