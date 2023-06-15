import UserHTTPService from './user-http.service'

const httpService = new UserHTTPService('user');

export const userActivate = async (id) => {
    try {
        return await httpService.patch('users/activate/' + id);
    } catch (error) {
        throw error;
    }
}

export const userDeactivate = async (id) => {
    try {
        return await httpService.patch('users/deactivate/' + id);
    } catch (error) {
        throw error;
    }
}
