import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getCompanyDetails = async () => {
    try {
        return await httpService.get('companies');
    } catch (error) { throw error; }
}

export const setupCompanyDetails = async (data) => {
    try {
        return await httpService.put('companies/setup', data);
    } catch (error) { throw error; }
}

export const updateCompanyDetails = async (data) => {
    try {
        return await httpService.put('companies', data);
    } catch (error) { throw error; }
}

export const deleteCurrentLogo = async () => {
    try {
        return await httpService.delete('companies/logo');
    } catch (error) { throw error; }
}

