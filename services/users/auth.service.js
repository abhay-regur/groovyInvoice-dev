import UserHTTPService from '../user-http.service'

const httpService = new UserHTTPService('user')

export const login = async (data, rememberMe) => {
  try {
    const result = await httpService.post('users/login', data)
    httpService.saveToken(result.data.access_token)
    if (rememberMe) {
      localStorage.setItem('rememberMe', rememberMe)
      httpService.saveRefreshToken(result.data.refresh_token)
    } else {
      localStorage.removeItem('rememberMe')
    }
  } catch (error) {
    throw error
  }
}

export const myProfile = async () => {
  return await httpService.get('users/myprofile')
}