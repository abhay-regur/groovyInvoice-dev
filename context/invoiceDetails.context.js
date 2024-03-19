import { createContext, useState, useContext } from "react"

const InvoiceDetailsContext = createContext({
    customerDetails: {
        name: '',
        panCardNumber: ''
    },
    invoiceDetails: {
        invoiceNo: '',
        totalAmount: 0
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
            totalAmount: 0
        }
    });
    return (
        <InvoiceDetailsContext.Provider value={{ invoiceDetailsContext, setInvoiceDetailsContext }}>
            {children}
        </InvoiceDetailsContext.Provider>
    );
}

export const useInvoiceDetails = () => useContext(InvoiceDetailsContext);