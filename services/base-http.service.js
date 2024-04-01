import axios from 'axios'
import * as tokenService from './token.service'

export default class BaseHttpService {
  BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'
  _accessToken = null
  _accessTokenKey = null
  _accessRefreshTokenKey = null
  _headers = {}

  //constructor() {}

  async get(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .get(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => { return this._handleHttpError(error) })
  }

  async post(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => { return this._handleHttpError(error) })
  }

  async delete(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => { return this._handleHttpError(error) })
  }

  async patch(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => { return this._handleHttpError(error) })
  }

  async put(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .put(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => { return this._handleHttpError(error) })
  }

  async previousRequestRecall(request) {
    const instance = axios.create({
      baseURL: this.BASE_URL,
      options: this._getCommonOptions(),
    });
    Object.assign(request.headers, this.getHeaders());
    return instance(request);
  }

  _handleHttpErrorForRefreshToken(error) {
    const { statusCode } = error.response.data

    if (statusCode !== 401) {
      throw error
    } else {
      this.removeToken(); //remove any existing token of this user..
      throw error
    }
  }

  _handleHttpError(error) {
    const { statusCode } = error.response.data

    if (statusCode !== 401) {
      throw error
    } else {
      return this._handle401(error)
    }
  }

  async refreshAccessToken(options = {}) {

    Object.assign(options, this._getCommonRefreshTokenOptions())
    const result = await axios
      .get(`${this.BASE_URL}/users/auth/token-refresh`, options)
      .catch((error) => this._handleHttpErrorForRefreshToken(error))
    this.saveToken(result.data.access_token)
    this.saveRefreshToken(result.data.refresh_token)
    return result.data.access_token;
  }

  async _handle401(error) {
    const rememberMe = localStorage.getItem('rememberMe') === 'true'
    console.log(rememberMe)
    if (rememberMe) {
      await this.refreshAccessToken()
      return this.previousRequestRecall(error.config)
    } else {
      if (
        window.location.pathname.search('/login') > -1
      ) {
        throw error
      } else {
        this.removeToken() //remove any existing token of this user..
        if (this.userType === 'user') {
          // window.location = '/login'
        }
        // throw new Error('No user type specified in _handle401() method')
        throw error
      }
    }
  }

  _getCommonOptions() {
    const token = this.loadToken()
    if (token) {
      this.addHeader('Authorization', `Bearer ${token}`)
    }

    return {
      headers: this.getHeaders(),
    }
  }

  _getCommonRefreshTokenOptions() {
    const token = this.loadRefreshToken()
    if (token) {
      this.addHeader('Authorization', `Bearer ${token}`)
    }

    return {
      headers: this.getHeaders(),
    }
  }

  addHeader(key, value) {
    this._headers = Object.assign(this._headers, { [key]: value })
    return this
  }

  getHeaders() {
    return this._headers
  }

  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken()
  }

  saveToken(accessToken) {
    this._accessToken = accessToken
    tokenService.saveToken(this._accessTokenKey, accessToken)
  }

  loadToken() {
    const token = tokenService.getToken(this._accessTokenKey)
    this._accessToken = token
    return token
  }

  saveRefreshToken(accessRefreshToken) {
    tokenService.saveToken(this._accessRefreshTokenKey, accessRefreshToken)
  }

  loadRefreshToken() {
    const token = tokenService.getToken(this._accessRefreshTokenKey)
    return token
  }

  removeToken() {
    tokenService.removeToken(this._accessTokenKey)
  }
}
