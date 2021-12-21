import Cookies from 'universal-cookie';

let CookiesInstance = null;

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
        console.log(obj[key]);
        array[key] = obj[key];
    });
    return array;
};

export const dclare = payment => {

};

