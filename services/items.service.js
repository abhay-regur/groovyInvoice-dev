import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const searchItems = async (description) => {
    try {
        return await httpService.get('items/search/list?description=' + description);
    } catch (error) { throw error; }
}