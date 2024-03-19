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

export const paymentInfoForInvoice = async (id) => {
    try {
        return await httpService.get(`payments/invoice-info/${id}`);
    } catch (error) { throw error; }
}

export const savePaymentForInvoice = async (data) => {
    try {
        return await httpService.post(`payments`, data)
    } catch (error) { throw error; }
}

export const getPaymentHistoryForInvoice = async (id) => {
    try {
        return await httpService.get(`payments/invoice-history/${id}`)
    } catch (error) { throw error; }
}
