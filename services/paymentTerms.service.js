import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getPaymentTerms = async () => {
    try {
        return await httpService.get('payments-term');
    } catch (error) { throw error; }
}

export const createPaymentTerms = async (data) => {
    try {
        return await httpService.post('payments-term', data);
    } catch (error) {
        throw error;
    }
}

export const updatePaymentTerms = async (id, data) => {
    try {
        return await httpService.put('payments-term/' + id, data);
    } catch (error) {
        throw error;
    }
}

export const deletePaymentTerms = async (id) => {
    try {
        return await httpService.delete('payments-term/' + id);
    } catch (error) {
        throw error;
    }
}