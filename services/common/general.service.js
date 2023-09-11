import UserHTTPService from '../user-http.service'
const httpService = new UserHTTPService('user');

export const validateInput = async (fieldName, value) => {
    try {
        return await httpService.get('validate-company-data?field=' + fieldName + '&value=' + value);
    } catch (error) { throw error; }
}