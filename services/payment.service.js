import UserHTTPService from './user-http.service';
const httpService = new UserHTTPService('user');

export const getTotalOutstandingReceivables = async () => {
    try {
        return await httpService.get('payments/total-outstanding-receivables');
    } catch (error) { throw error; }
}

export const getDueToday = async () => {
    try {
        return await httpService.get('payments/due-today');
    } catch (error) { throw error; }
}

export const getDueWithin30Days = async () => {
    try {
        return await httpService.get('payments/due-within-30-days');
    } catch (error) { throw error; }
}

export const getOverdue = async () => {
    try {
        return await httpService.get('payments/overdue');
    } catch (error) { throw error; }
}
