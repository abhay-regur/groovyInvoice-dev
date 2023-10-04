import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getIndustryList = async () => {
    try {
        return await httpService.get('industries');
    } catch (error) {
        throw error;
    }
}

export const addIndustry = async (data) => {
    try {
        return await httpService.post('industries', data);
    } catch (error) {
        throw error;
    }
}

export const getIndustry = async (id) => {
    try {
        return await httpService.get('industries/' + id);
    } catch (error) {
        throw error;
    }
}

export const updateIndustry = async (id, data) => {
    try {
        return await httpService.patch('industries/' + id, data);
    } catch (error) {
        throw error;
    }
}

export const deleteIndustry = async (id) => {
    try {
        return await httpService.delete('industries/' + id);
    } catch (error) {
        throw error;
    }
}
