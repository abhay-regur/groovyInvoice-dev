const InvoicePreviousPaymentsTable = ({ items = [], styles }) => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <table className={`table ${styles.companyInvoicePreviousPaymentTable}`}>
                    <thead>
                        <tr>
                            <th scope="col" className="ps-3">Invoice ID#</th>
                            <th scope="col" className="ps-3">Amount Recived</th>
                            <th scope="col" className="ps-3">Status</th>
                            <th scope="col" className="ps-3">Payment Date</th>
                            <th scope="col" className="ps-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? items.map((item) => {
                            return (
                                <tr key={item.invoiceId}>
                                    <td className={`${styles.companyInvoicePreviousPaymentTableinvoiceId}`}></td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTableAmountRecived}`}></td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTableStatus}`}></td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTablePaymentDate}`}></td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTable}`}></td>
                                </tr>
                            )
                        })
                            :
                            <tr>
                                <td className="text-center" colSpan={5}> No payments mades</td>
                            </tr>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
}
export default InvoicePreviousPaymentsTable;