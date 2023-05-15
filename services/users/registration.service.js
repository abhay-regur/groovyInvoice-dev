import UserHTTPService from '../user-http.service'

const httpService = new UserHTTPService('user')

export const signUp = async (data) => {
  try {
    return await httpService.post('users/sign-up', data)
  } catch (error) {
    throw error
  }
}
