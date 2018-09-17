import Promise from 'bluebird';
import axios from 'axios';
import urlAssembler from 'url-assembler';
import offlineAdapter from 'axios-offline-adapter';
 
import { setToken, getToken } from 'Utils/user';

require('es6-promise').polyfill();

const replaceParams = (name, opts) => {
  if (!name) {
    return Promise.reject(new Error('Name param is mandatory!'));
  }

  const props = {
    ...opts,
  };

  let endpoint = urlAssembler().template(name);

  Object.keys(props).forEach(prop => {
    endpoint = endpoint.param(prop, props[prop]);
  });

  return endpoint.toString();
};

const handleError = res => {
  throw res.response;
};

const check400 = error => {
  if (error.status === 400) {
    const { data } = error;
    if (!data) {
      throw error;
    }

    if (data instanceof Array) {
      throw data;
    }

    throw new Array(data);
  }

  throw error;
};

const check401 = res => {
  // Login interface does not need to do 401 checksum
  if (res.status === 401) {

    const error = {
      token: null,
      ...res.data,
    };

    return Promise.reject(error);
  }

  throw res;
};

const check404 = res => {
  if (res && res.status === 404) {
    return Promise.reject(res);
  }

  throw res;
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status >= 300 && response.status < 303) {
    return response;
  }

  throw handleError(response);
};

const blobParse = res => {
  if (res.headers['content-type'].match(/text\/csv/gi)) {
    return res.blob();
  }

  return res;
};

const jsonParse = res => {
  return res.data;
};

export const checkToken = res => {
  if (res.token) {
    setToken(res.token);
  }

  return res;
};

export const getUrl = (host, url, params) =>
  `${host}${replaceParams(url, params)}`;


const offline = offlineAdapter({
  name: 'axios-offline',
  adapter: axios.defaults.adapter,
});

class AxiosClass {
  constructor(host) {
    if (!host) throw new Error('Host is mandatory!');

    this.instance = axios.create({
      mode: 'no-cors',
      adapter: offline,
    });

    this.instance.interceptors.request.use(({ url, params, ...config }) => ({
      ...config,
      url: getUrl(host, url, params),
    }));
  }

  get = (url, options) => this.request(url, options);

  post = (url, options) =>
    this.request(url, {
      ...options,
      method: 'POST',
    });

  put = (url, options) =>
    this.request(url, {
      ...options,
      method: 'PUT',
    });

  delete = (url, options) =>
    this.request(url, {
      ...options,
      method: 'DELETE',
    });

  request = (url, { config, ...options } = {}) => {
    const defaultOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };

    if (!(options.body instanceof FormData)) {
      defaultOptions.headers['Content-Type'] = 'application/json';
    }

    const opts = {
      ...defaultOptions,
      ...options,
    };

    const token = getToken();

    if (token) {
      opts.headers = {
        ...opts.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return this.instance
      .request({
        url,
        data: opts.body,
        headers: opts.headers,
        params: opts.params,
        method: opts.method,
        maxRedirects: 0,
        ...config,
      })
      .then(checkStatus)
      .then(blobParse)
      .then(jsonParse)
      .then(checkToken)
      .catch(checkStatus)
      .catch(check400)
      .catch(check401)
      .catch(check404);
  };
}

export default AxiosClass;
