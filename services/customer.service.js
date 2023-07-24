import UserHTTPService from './user-http.service'
const httpService = new UserHTTPService('user');

export const createCustomer = async (data) => {
    try {
        return await httpService.post('customers/create', data);
    } catch (error) { throw error; }
}