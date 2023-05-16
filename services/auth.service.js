import jwt_decode from 'jwt-decode'
import * as tokenService from './token.service'

export const getTokenKey = (type) => {
  return type + 'AccessToken';
}
export const isLoggedIn = (type) => {
  if (getUserId(type)) {
    return true
  } else return false
}

export const getLoginUserInfo = (type) => {
  let tokenKey = getTokenKey(type)

  try {
    var decodedHeader = jwt_decode(tokenService.getToken(tokenKey))
    return decodedHeader
  } catch (e) {
    console.log('Invalid access token')
  }
}

export const getUserId = (type) => {
  const result = getLoginUserInfo(type)
  if (result) {
    return result.sub
  }
}

export const getUserFullName = (type) => {
  const result = getLoginUserInfo(type)
  if (result) {
    return result.fullName
  } else return ''
}

export const logout = (type) => {
  const result = getLoginUserInfo(type)
  if (result) {
    tokenService.removeToken(getTokenKey(type))
  }
}
