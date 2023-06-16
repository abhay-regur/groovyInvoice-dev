import UserHTTPService from './user-http.service'

const httpService = new UserHTTPService('user');

export const createUser = async (data) => {
    try {
        return await httpService.post('users/create', data);
    } catch (error) {
        throw error;
    }
}
