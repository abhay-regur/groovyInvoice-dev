import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getCountries = async () => {
    try {
        return await httpService.get('countries');
    } catch (error) {
        throw error;
    }
}

export const putCountry = async (data) => {
    try {
        return await httpService.post('countries', data);
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

export const getCountry = async (id) => {
    try {
        return await httpService.get('countries/' + id);
    } catch (error) {
        throw error;
    }
}

export const getIndianStates = async () => {
    try {
        return await httpService.get('states');
    } catch (error) {
        throw error;
    }
}

export const getState = async (id) => {
    try {
        return await httpService.get('states/' + id);
    } catch (error) {
        throw error
    }
}

export const addState = async (data) => {
    try {
        return await httpService.post('states', data);
    } catch (error) {
        throw error;
    }
}

