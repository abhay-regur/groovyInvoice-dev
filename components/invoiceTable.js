import styles from "../styles/invoiceTable.module.scss";
import FaPen from "../assets/icons/faPen.svg";
import FaExclamationCircle from '../assets/icons/faExclamationCircle.svg';
const InvoiceTable = () => {
    return (
        <table className={`${styles.companyInvoiceTable} table`}>
            <thead>
                <tr>
                    <th scope="col" className="ps-3">Item Details</th>
                    <th scope="col" className="ps-5">Quantity</th>
                    <th scope="col" className="text-center">Rate</th>
                    <th scope="col" className="invoiceTableTaxHead"><span className='d-flex'> Tax <i className='d-flex align-content-center'><FaExclamationCircle /></i></span></th>
                    <th scope="col" className="text-center">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr className={`${styles.comapnyInvoiceTableItemRow}`}>
                    <td>
                        <div className={`${styles.companyInvoiceTableItemWarpper}`}>
                            <p className={`${styles.companyInvoiceTableItemName}`}>
                                Consulting & Support
                            </p>
                            <div className="d-flex">
                                <div className={`${styles.comapnayInvoiceItemDetailsExtra}`}>Goods</div>
                                <div className={`${styles.comapnayInvoiceItemDetailsHSN}`}>HSN Code</div>
                                <div className={`${styles.comapnayInvoiceItemDetailsUpdate}`}><span className="d-flex"> Update <i><FaPen /></i></span></div>

                            </div>
                        </div>
                    </td>
                    <td>
                        <p className={`${styles.companyInvoiceTableItemQuantity}`}>
                            1.00
                        </p>
                        <div className={`${styles.companyInvoiceTableRecentTransaction}`}>
                            Recent Transaction
                        </div>
                    </td>
                    <td>
                        <p className={`${styles.companyInvoiceTableItemRate}`}>
                            18
                        </p>
                    </td>
                    <td>
                        <span className={`${styles.companyInvoiceTableTaxSelectWrapper}`}>
                            <select className={`${styles.companyInvoiceTableTaxSelect}`}>
                                <option defaultValue>Non-Taxable</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                            </select>
                        </span>
                    </td>
                    <td>
                        <p className={`${styles.companyInvoiceTableItemAmount}`}>
                            Rs. 18.00
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
};

export default InvoiceTable;