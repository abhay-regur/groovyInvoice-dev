import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getInvoiceNumberSetting = async () => {
    try {
        return await httpService.get('settings/invoice/number');
    } catch (error) { throw error; }
}

export const saveInvoiceNumberSetting = async (data) => {
    try {
        return await httpService.post('settings/invoice/number', data);
    } catch (error) { throw error; }
}