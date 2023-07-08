import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getCurrentUserDetails = async () => {
    try {
        return await httpService.get('users/myprofile');
    } catch (error) {
        throw error;
    }
}

export const getCountries = async () => {
    try {
        return await httpService.get('countries');
    } catch (error) {
        throw error;
    }
}

export const getStates = async (id) => {
    try {
        return await httpService.get('countries/' + id + '/states');
    } catch (error) {
        throw error;
    }
}