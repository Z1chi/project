import axios from 'axios';
import config from '../configApi';
import {getToken,urlHasParams} from '../helpers/lib';

const instance = axios.create({
    baseURL: config.apiUrl,
    validateStatus(status) {
        return status >= 200 && status < 300 && status !== 206;
    },
});

export default function request(url, {method = 'get', params, data, headers} = {}) {
    console.log('request', data)
    const fullHeaders = {...headers, ...getToken(),  };
    let urWithParams = urlHasParams(url);

    return instance
        .request({
            url: urWithParams,
            method,
            params,
            data,
            headers: {...fullHeaders, },
        })
        .then(response => new Promise(resolve => resolve(response.data)));
    // .then(
    //   response => new Promise(resolve => resolve(response.data)),
    //   error => {
    //     console.log(`RequestError. API returned: ${error}.`);
    //     return new Promise(resolve =>
    //       resolve({
    //         error: true,
    //         message: error,
    //       })
    //     );
    //   }
    // );
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
