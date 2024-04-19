import { createContext, useState, useContext } from "react"

const InvoiceDetailsContext = createContext({
    customerDetails: {
        name: '',
        panCardNumber: ''
    },
    invoiceDetails: {
        invoiceNo: '',
        unpaidAmount: 0,
        paidAmount: 0,
        currencyId: ''
    }
})
export const InvoiceDetailsProvider = ({ children }) => {
    const [invoiceDetailsContext, setInvoiceDetailsContext] = useState({
        customerDetails: {
            name: '',
            panCardNumber: ''
        },
        invoiceDetails: {
            invoiceNo: '',
            unpaidAmount: 0,
            paidAmount: 0,
            currencyId: ''
        }
    });
    return (
        <InvoiceDetailsContext.Provider value={{ invoiceDetailsContext, setInvoiceDetailsContext }}>
            {children}
        </InvoiceDetailsContext.Provider>
    );
}

export const useInvoiceDetails = () => useContext(InvoiceDetailsContext);