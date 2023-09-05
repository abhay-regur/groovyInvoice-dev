import styles from "@/styles/contactPersonTable.module.scss";
import FaCilcleEllipses from "@/assets/icons/faCircleEllipses.svg";
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';

const AllPaymentTermsTable = ({ ItemsData, handleRemove, testNotification }) => {
    return (
        <tbody>
            {ItemsData.map(function (item, idx) {
                return (
                    <tr key={idx} className={`${styles.companyInvoiceContactPersonRow}`}>
                        <td>
                            <span>{idx + 1}</span>
                        </td>
                        <td>
                            <span>{item.label}</span>
                        </td>
                        <td>
                            <span>{item.numberOfDays}</span>
                        </td>
                        <td className={`${styles.companyInvoiceContantPersonEditRow}`}>
                            {
                                item.id > 3
                                    ? <div className="d-flex">
                                        <span className={`${styles.companyInvoicePaymentTermEdit}`} onClick={() => { testNotification() }}><FaCilcleEllipses /></span>

                                        <span className={`${styles.redColor} ${styles.companyInvoicePaymentTermRemove}`} onClick={() => { handleRemove(item.id) }}><FaCircleXmark /></span>

                                    </div>
                                    :
                                    ''
                            }
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )

}
export default AllPaymentTermsTable;