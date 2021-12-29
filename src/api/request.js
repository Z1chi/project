import axios from 'axios';
import config from '../configApi';
import {getToken, urlHasParams} from '../helpers/lib';

const instance = axios.create({
    baseURL: config.apiUrl,
    validateStatus(status) {
        return status;
    },
});

export default function request(url, {method = 'get', params, data, headers} = {}) {
    const fullHeaders = {...headers, ...getToken()};
    let urWithParams = urlHasParams(url);

    console.log('req data',data)

    return instance
        .request({
            url: urWithParams,
            method,
            params,
            data,
            headers: {...fullHeaders},
        })
        .then(response => new Promise(resolve => {

            response.data.redirect || response.status === 401 ? window.location.href = "/" : "";
            return resolve(response)
        }))
        .then(response => new Promise(resolve => resolve(response.data)))
}

function RequestError(code, msg, data) {
    const description = msg ? `- ${msg}` : '';

    this.name = 'RequestError';
    this.message = `API returned: ${code}${description}.`;
    this.code = code;
    this.description = msg;
    this.data = data;
}

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;
