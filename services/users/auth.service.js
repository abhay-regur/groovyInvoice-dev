import UserHTTPService from '../user-http.service'

const httpService = new UserHTTPService('user')

export const login = async (data) => {
  try {
    const result = await httpService.post('users/login', data)
    httpService.saveToken(result.data.access_token)
  } catch (error) {
    throw error
  }
}
