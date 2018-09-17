import Promise from 'bluebird';
import { camelizeKeys as camelize } from 'humps';
import { isPlainObject, isArray } from 'lodash';
import Axios from './Axios';


const transformServerError = (error) => {
  if (error.msg || error.message) {
    return Promise.reject(error.msg || error.message);
  }
  return Promise.reject(error);
};

const keysToCamelCase = (response) => {
  if (isPlainObject(response) || isArray(response)) {
    return camelize(response);
  }

  return response;
};

export class Api {
  /**
   * @param {!string} host
   * @param {!object} endpoints - All site consumers endpoints.
   */
  constructor(host, endpoints, app_id) {
    this.host = host;
    this.endpoints = endpoints;
    this.app_id = app_id;
    this.axios = new Axios(host);
  }

  getParamsWithAppId = (options) => {
    if (!this.app_id) return options.params;

    return {
      ...options.params,
      app_id: this.app_id,
    };
  }

  /**
   * Post request
   * @param name
   * @param data
   * @param {object} options
   */
  post = (name, data, options = {}) => {
    const reqData = (typeof data === 'string') || (data instanceof FormData) ? data : JSON.stringify(data);

    options.params = this.getParamsWithAppId(options);

    return this.axios.post(name, {
      body: reqData,
      ...options,
    }).then(keysToCamelCase).catch(transformServerError);
  };

  /**
   * Put request
   * @param name
   * @param data
   * @param {object} options
   */
  put = (name, data, options = {}) => {
    const reqData = (typeof data === 'string') || (data instanceof FormData) ? data : JSON.stringify(data);

    options.params = this.getParamsWithAppId(options);

    return this.axios.put(name, {
      body: reqData,
      ...options,
    }).then(keysToCamelCase).catch(transformServerError);
  };

  /**
   * Delete request
   * @param name
   * @param data
   * @param {object} options
   */
  delete = (name, data, options = {}) => {
    const reqData = (typeof data === 'string') || (data instanceof FormData) ? data : JSON.stringify(data);

    options.params = this.getParamsWithAppId(options);

    return this.axios.delete(name, {
      body: reqData,
      ...options,
    }).then(keysToCamelCase).catch(transformServerError);
  };

  /**
   * Get request
   * @param {string }name
   * @param {object} options
   * @returns {*|Promise|Promise.<T>}
   */
  get = (name, options = {}) => {
    options.params = this.getParamsWithAppId(options);
    return this.axios.get(name, options)
      .then(keysToCamelCase)
      .catch(transformServerError);
  }
}

export default Api;
