import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getInvoice = async (id) => {
    try {
        return await httpService.get('invoice/' + id);
    } catch (error) { throw error; }
}