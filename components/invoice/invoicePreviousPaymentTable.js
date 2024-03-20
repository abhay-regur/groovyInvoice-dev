import FaDownload from '@/assets/icons/faDownload.svg'
import { downloadImage } from '@/utils/file.utils';

const InvoicePreviousPaymentsTable = ({ items = [], styles }) => {

    return (
        <div className="row">
            <div className="col-sm-12">
                <table className={`table ${styles.companyInvoicePreviousPaymentTable}`}>
                    <thead>
                        <tr>
                            <th scope="col" colSpan={1} className="ps-3">Payment ID#</th>
                            <th scope="col" colSpan={1} className="ps-3">Amount Recived</th>
                            <th scope="col" colSpan={1} className="ps-3">Refrence</th>
                            <th scope="col" colSpan={1} className="ps-3">Payment Date</th>
                            <th scope="col" colSpan={1} className="ps-3">Note</th>
                            <th scope="col" colSpan={1} className="ps-3">Attachment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? items.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td className={`${styles.companyInvoicePreviousPaymentTablePaymentId}`} colSpan={1}>{item.id}</td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTableAmountRecived}`} colSpan={1}>{item.amount}</td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTableReferences}`} colSpan={1}>{item.references}</td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTablePaymentDate}`} colSpan={1}>{item.paymentDate}</td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTableNotes}`} colSpan={1}>{item.notes}</td>
                                    <td className={`${styles.companyInvoicePreviousPaymentTableAttachment}`} colSpan={1}> {item.file ? <i onClick={() => downloadImage(item.file)}><FaDownload /></i> : ''}</td>
                                </tr>
                            )
                        })
                            :
                            <tr>
                                <td className="text-center" colSpan={6}> No payments mades</td>
                            </tr>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
}
export default InvoicePreviousPaymentsTable;