/**
 * @typedef {object} RequestObject
 * @property {string} url
 * @property {string} endpoint
 * @property {RequestInit} param
 */

class Requests {
  #handleHeaderInit() {
    if (this.request_object.param.headers == undefined)
      this.request_object.param.headers = new Headers();
  }
  /**
   * @param {string} endpoint
   */
  constructor(endpoint = "") {
    /**
     * @type {RequestObject}
     */
    this.request_object = {
      // url: "http://localhost:8080",
      url: "https://4b768640-cfb0-4023-9359-50797410da67.mock.pstmn.io",
      endpoint: endpoint,
      param: { method: "GET" },
    };
  }

  /**
   * getParam
   * @returns {RequestInit}
   */
  param() {
    return this.request_object.param;
  }

  /**
   * @param {string} url
   * @returns {Requests}
   */
  url(url) {
    this.request_object.url = url;
    return this;
  }

  /**
   * set method to 'GET'
   * @returns {Requests}
   */
  get() {
    this.request_object.param.method = "GET";
    return this;
  }

  /**
   * set method to 'POST'
   * @returns {Requests}
   */
  post() {
    this.request_object.param.method = "POST";
    return this;
  }

  /**
   * set method to 'PUT'
   * @returns {Requests}
   */
  put() {
    this.request_object.param.method = "PUT";
    return this;
  }

  /**
   * set method to 'DELETE'
   * @returns {Requests}
   */
  delete() {
    this.request_object.param.method = "DELETE";
    return this;
  }

  /**
   * set headers content-type to application/json
   * @returns {Requests}
   */
  json() {
    this.header("Content-Type", "application/json");
    return this;
  }

  /** set the body of request
   * @param {object} body
   * @returns {Requests}
   */
  body(body) {
    this.request_object.param.body = JSON.stringify(body);
    return this;
  }

  /** add header
   * @param {string} name - name of header
   * @param {string} value - value of header
   * @returns {Requests}
   */
  header(name, value) {
    this.#handleHeaderInit();
    this.request_object.param.headers.append(name, value);
    return this;
  }

  /** add headers
   * @param {Object.<string,string>} name_value_object
   * @returns {Requests}
   */
  headers(name_value_object) {
    this.#handleHeaderInit();
    for (const k in name_value_object) {
      this.request_object.param.headers.append(k, name_value_object[k]);
    }
    return this;
  }

  /** add required header for http_basic authentication
   * @param {string} username
   * @param {string} password
   * @returns {Requests}
   */
  httpBasic(username, password) {
    this.header("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
    return this;
  }

  /** execute request using fetch api
   * @returns {Promise.<Response>}
   */
  execute() {
    return fetch(
      `${this.request_object.url}${this.request_object.endpoint}`,
      this.request_object.param,
    );
  }
}

/** default url is used (change it by .url method if required)
 * @param {string} endpoint
 */
export function request(endpoint) {
  return new Requests(endpoint);
}
