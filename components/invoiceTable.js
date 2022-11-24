import styles from "../styles/invoiceTable.module.scss";
import FaPen from "../assets/icons/faPen.svg";
import FaExclamationCircle from '../assets/icons/faExclamationCircle.svg';
const InvoiceTable = ({ ItemsData }) => {
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
                {ItemsData.map(function (Item, idx) {
                    return (
                        <tr key={idx} className={`${styles.comapnyInvoiceTableItemRow}`}>
                            <td>
                                <div className={`${styles.companyInvoiceTableItemWarpper}`}>
                                    <p className={`${styles.companyInvoiceTableItemName}`}>
                                        {Item.ItemDetails.ItemName}
                                    </p>
                                    <div className="d-flex">
                                        <div className={`${styles.comapnayInvoiceItemDetailsExtra}`}>{Item.ItemDetails.ItemType}</div>
                                        <div className={`${styles.comapnayInvoiceItemDetailsHSN}`}>{Item.ItemDetails.ItemHSN}</div>
                                        <div className={`${styles.comapnayInvoiceItemDetailsUpdate}`}><span className="d-flex"> Update <i><FaPen /></i></span></div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className={`${styles.companyInvoiceTableItemQuantity}`}>
                                    {Item.ItemQuantity}
                                </p>
                                <div className={`${styles.companyInvoiceTableRecentTransaction}`}>
                                    Recent Transaction
                                </div>
                            </td>
                            <td>
                                <p className={`${styles.companyInvoiceTableItemRate}`}>
                                    {Item.ItemRate}
                                </p>
                            </td>
                            <td>
                                <span className={`${styles.companyInvoiceTableTaxSelectWrapper}`}>
                                    <select className={`${styles.companyInvoiceTableTaxSelect}`}>
                                        <option defaultValue>Non-Taxable</option>
                                        <option value="tds">TDS</option>
                                        <option value="tcs">TCS</option>
                                    </select>
                                </span>
                            </td>
                            <td>
                                <p className={`${styles.companyInvoiceTableItemAmount}`}>
                                    Rs. {Item.ItemTotalAmount}
                                </p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
};

export default InvoiceTable;