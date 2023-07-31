import UserHTTPService from './user-http.service'
const httpService = new UserHTTPService('user');

export const createCustomer = async (data) => {
    try {
        return await httpService.post('customers/create', data);
    } catch (error) { throw error; }
}

export const getUserDetails = async (id) => {
    try {
        return await httpService.get('customers/' + id);
    } catch (error) { throw error; }
}

export const addBillingAddress = async (data, id) => {
    try {
        return await httpService.post('customers/' + id + '/address/billing-address', data);
    } catch (error) { throw error; }
}

export const addShippingAddress = async (data, id) => {
    try {
        return await httpService.post('customers/' + id + '/address/shipping-address', data);
    } catch (error) { throw error; }
}

export const addContactPerson = async (data, id) => {
    try {
        return await httpService.post('customers/' + id + '/contact-person', data);
    } catch (error) { throw error; }
}