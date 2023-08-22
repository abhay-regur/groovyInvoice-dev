import styles from "../styles/contactPersonTable.module.scss";
import FaCilcleEllipses from "../assets/icons/faCircleEllipses.svg";
import FaCircleXmark from '../assets/icons/faCircleXmark.svg';
import FaCircleCheck from '../assets/icons/faCircleCheck.svg';

const ContactPersonTable = ({ ItemsData }) => {
    return (
        <tbody>
            {ItemsData.map(function (item, idx) {
                return (
                    <tr key={idx} className={`${styles.companyInvoiceContactPersonRow}`}>
                        <td>
                            <span>{item.salutation}</span>
                        </td>
                        <td>
                            <span>{item.firstName}</span>
                        </td>
                        <td>
                            <span>{item.lastName}</span>
                        </td>
                        <td>
                            <span>{item.emailAddress}</span>
                        </td>
                        <td>
                            <span>{item.workPhone}</span>
                        </td>
                        <td>
                            <span>{item.mobile}</span>
                        </td>
                        <td className={`${styles.companyInvoiceContantPersonEditRow}`}>
                            {item.id == -1
                                ?
                                <div className="d-flex">
                                    <span><FaCircleCheck /></span>
                                    <span className={`${styles.redColor}`}><FaCircleXmark /></span>
                                </div>
                                :
                                <div className="d-flex">
                                    <span><FaCilcleEllipses /></span>
                                    <span className={`${styles.redColor}`}><FaCircleXmark /></span>
                                </div>
                            }
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )

}
export default ContactPersonTable;