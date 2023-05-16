import UserHTTPService from '../user-http.service'
const httpService = new UserHTTPService('user');

export const forgotPassword = async (data) => {
    return await httpService.post('users/password-reset', data)
}

export const verifyPasswordResetToken = async (token) => {
    return await httpService.get('users/verify-password-reset/' + token)
}

export const resetPassword = async (token, data) => {
    return await httpService.post('users/password-reset/' + token, data)
}
