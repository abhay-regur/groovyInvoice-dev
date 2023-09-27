import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getInvoice = async (id) => {
    try {
        return await httpService.get('invoice/' + id);
    } catch (error) { throw error; }
}

export const saveInvoice = async (data) => {
    try {
        return await httpService.post('invoice', data);
    } catch (error) { throw error; }
}