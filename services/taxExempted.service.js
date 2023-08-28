import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getTaxExemptionReason = async () => {
    try {
        return await httpService.get('exemption-reasons');
    } catch (error) { throw error; }
}

export const createTaxExemptionReason = async (data) => {
    try {
        return await httpService.post('exemption-reasons', data);
    } catch (error) {
        throw error;
    }
}

export const updateTaxExemptionReason = async (id, data) => {
    try {
        return await httpService.put('exemption-reasons/' + id, data);
    } catch (error) {
        throw error;
    }
}

export const deleteTaxExemptionReason = async (id) => {
    try {
        return await httpService.delete('exemption-reasons/' + id);
    } catch (error) {
        throw error;
    }
}