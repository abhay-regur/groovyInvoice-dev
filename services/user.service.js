import UserHTTPService from './user-http.service'

const httpService = new UserHTTPService('user');

export const userActivate = async (id) => {
    try {
        return await httpService.patch('users/activate/' + id);
    } catch (error) { throw error; }
}

export const userDeactivate = async (id) => {
    try {
        return await httpService.patch('users/deactivate/' + id);
    } catch (error) { throw error; }
}

export const userDetails = async (id) => {
    try {
        return await httpService.get('users/' + id)
    } catch (error) { throw (error) }
}

export const updateUserDetails = async (id, data) => {
    try {
        return await httpService.put('users/update/' + id, data);
    } catch (error) { throw (error) }
}

export const createUser = async (data) => {
    try {
        return await httpService.post('users/create', data);
    } catch (error) {
        throw error;
    }
}
