import BaseHttpService from './base-http.service'

export default class UserHTTPService extends BaseHttpService {
  constructor(userType) {
    //this.routerStore = routerStore
    if (!userType) {
      throw new Error('No user type specified during HTTP Service initialization')
    }
    super()
    this.userType = userType
    this._accessTokenKey = this.generateTokenKeyName(this.userType)
    this._accessRefreshTokenKey = this.generateRefreshTokenKeyName(this.userType)
  }

  generateTokenKeyName(userType) {
    return userType +'AccessToken'
  }

  generateRefreshTokenKeyName(userType) {
    return userType +'AccessRefreshToken'
  }
}
