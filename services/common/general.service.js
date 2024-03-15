import UserHTTPService from '../user-http.service'
const httpService = new UserHTTPService('user');

export const validateInput = async (fieldName, value) => {
    try {
        return await httpService.get('validate-company-data?field=' + fieldName + '&value=' + value);
    } catch (error) { throw error; }
}

export const getCurrencies = async () => {
    try {
        return await httpService.get('currencies');
    } catch (error) { throw error; }
}

export const getCurrencyById = async (id) => {
    try {
        return await httpService.get('currencies/' + id);
    } catch (error) { throw error; }
}

export const getTimeZonesList = async () => {
    try {
        return await httpService.get('timezone');
    } catch (error) {
        throw error;
    }
}