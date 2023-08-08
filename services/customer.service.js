import UserHTTPService from './user-http.service';
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

export const updateUserDetails = async (id, data) => {
    try {
        return await httpService.put('customers/' + id, data);
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

export const getGSTTreatment = async () => {
    try {
        return await httpService.get('gst-treatments/');
    } catch (error) {
        throw error;
    }
}

export const getPlaceOfSupply = async () => {
    try {
        return await httpService.get('place-of-supply/');
    } catch (error) {
        throw error;
    }
}

export const getCurrencies = async () => {
    try {
        return await httpService.get('currencies/');
    } catch (error) {
        throw error;
    }
}