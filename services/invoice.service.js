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

export const updateInvoice = async (id, data) => {
    try {
        return await httpService.put('invoice/' + id, data);
    } catch (error) { throw error; }
}

export const sendInvoicePDFEmail = async (id) => {
    try {
        return await httpService.get('invoice/send-pdf-to-email/' + id)
    } catch (error) { throw error; }
}