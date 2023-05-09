import UserHTTPService from '../user-http.service'

const httpService = new UserHTTPService('user')

export const login = async (data, rememberMe) => {
  try {
    const result = await httpService.post('users/login', data)
    httpService.saveToken(result.data.access_token)
    if (rememberMe) {
      localStorage.setItem('username', data.username)
      localStorage.setItem('password', data.password)
      localStorage.setItem('rememberMe', rememberMe)
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      localStorage.removeItem('rememberMe')
    }
  } catch (error) {
    throw error
  }
}
