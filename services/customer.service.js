import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const createCustomer = async (data) => {
    try {
        return await httpService.post('customers/', data);
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

export const addContactPerson = async (custId, data) => {
    try {
        return await httpService.post(`customers/${custId}/contact-person`, data);
    } catch (error) { throw error; }
}

export const listContactPersonDetails = async (custId) => {
    try {
        return await httpService.get(`customers/${custId}/contact-person`);
    } catch (error) { throw error }
}

export const updateContactPersonDetails = async (id, custId, data) => {
    try {
        return await httpService.put('customers/' + custId + '/contact-person/' + id, data);
    } catch (error) { throw error }
}

export const deleteContactPersonDetails = async (id, custId) => {
    try {
        return await httpService.delete('customers/' + custId + '/contact-person/' + id);
    } catch (error) { throw error }
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


