import FaDownload from '@/assets/icons/faDownload.svg'
import { useCurrentUserData } from '@/context/CurrentUserData.context';
import { formatDate } from '@/utils/date.utils';
import { downloadImage } from '@/utils/file.utils';

const InvoicePreviousPaymentsTable = ({ items = [], styles, totalPaidAmount=0 }) => {
    const { userInfo } = useCurrentUserData();

    return (
        <div className="row">
            <div className="col-sm-12">
                <table className={`table ${styles.companyInvoicePreviousPaymentTable}`}>
                    <thead>
                        <tr>
                            <th scope="col" colSpan={1} className="ps-3">Payment ID#</th>
                            <th scope="col" colSpan={1} className="ps-3">Reference</th>
                            <th scope="col" colSpan={1} className="ps-3">Payment Date</th>
                            <th scope="col" colSpan={1} className="ps-3">Note</th>
                            <th scope="col" colSpan={1} className="ps-3">Attachment</th>
                            <th scope="col" colSpan={1} className="ps-3">Amount Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ?
                            <>
                                {items.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className={`${styles.companyInvoicePreviousPaymentTablePaymentId}`} colSpan={1}>0{item.id}</td>
                                            <td className={`${styles.companyInvoicePreviousPaymentTableReferences}`} colSpan={1}>{item.references}</td>
                                            <td className={`${styles.companyInvoicePreviousPaymentTablePaymentDate}`} colSpan={1}>{formatDate(item.paymentDate, userInfo.datePref)}</td>
                                            <td className={`${styles.companyInvoicePreviousPaymentTableNotes}`} colSpan={1}>{item.notes}</td>
                                            <td className={`${styles.companyInvoicePreviousPaymentTableAttachment}`} colSpan={1}> {item.file ? <i onClick={() => downloadImage(item.file)}><FaDownload /></i> : ' - '}</td>
                                            <td className={`${styles.companyInvoicePreviousPaymentTableAmountRecived}`} colSpan={1}>{item.amount}</td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td className="text-start" colSpan={5}> Total paid payment</td>
                                    <td className="text-center" colSpan={1}> {totalPaidAmount}</td>
                                </tr>
                            </>
                            :
                            <tr>
                                <td className="text-center" colSpan={6}> No payments made</td>
                            </tr>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
}
export default InvoicePreviousPaymentsTable;