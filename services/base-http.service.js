import axios from 'axios'
import * as tokenService from './token.service'

export default class BaseHttpService {
  BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'
  _accessToken = null
  _accessTokenKey = null
  _headers = {}

  //constructor() {}

  async get(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .get(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => this._handleHttpError(error))
  }

  async post(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error))
  }

  async delete(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => this._handleHttpError(error))
  }

  async patch(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error))
  }

  async put(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions())
    return axios
      .put(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error))
  }

  _handleHttpError(error) {
    const { statusCode } = error.response.data

    if (statusCode !== 401) {
      throw error
    } else {
      return this._handle401(error)
    }
  }

  _handle401(error) {
    if (
      window.location.pathname.search('/login') > -1
    ) {
      throw error
    } else {
      this.removeToken() //remove any existing token of this user..
      if (this.userType === 'user') {
        window.location = '/login'
      }
      throw new Error('No user type specified in _handle401() method')
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

  removeToken() {
    tokenService.removeToken(this._accessTokenKey)
  }
}
