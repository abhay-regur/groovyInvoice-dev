import styles from "../styles/contactPersonTable.module.scss";
import FaCilcleEllipses from "../assets/icons/faCircleEllipses.svg";
import FaCircleXmark from '../assets/icons/faCircleXmark.svg';

const ContactPersonTable = ({ ItemsData }) => {
    return (
        <tbody>
            {ItemsData.map(function (Item, idx) {
                return (
                    <tr key={idx} className={`${styles.companyInvoiceContactPersonRow}`}>
                        <td>
                            <select className={`${styles.companyInvoiceContactPersonSelect} form-select`}>
                                <option defaultValue>Salutation</option>
                                <option value={Item.salutation.toLowerCase()}>{Item.salutation}</option>
                            </select>
                        </td>
                        <td>
                            <span>{Item.firstName}</span>
                        </td>
                        <td>
                            <span>{Item.lastName}</span>
                        </td>
                        <td>
                            <span>{Item.emailAddress}</span>
                        </td>
                        <td>
                            <span>{Item.workPhone}</span>
                        </td>
                        <td>
                            <span>{Item.mobile}</span>
                        </td>
                        <td className={`${styles.companyInvoiceContantPersonEditRow}`}>
                            <div className="d-flex">
                                <span><FaCilcleEllipses /></span>
                                <span className={`${styles.redColor}`}><FaCircleXmark /></span>
                            </div>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )

}
export default ContactPersonTable;