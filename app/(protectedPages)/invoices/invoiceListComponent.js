"use client"
import Link from 'next/link';
import { useContext } from 'react';
import { NavExpandedState } from '../../../context/NavState.context';
import styles from '../../../styles/invoice.module.scss';
import AllInvoiceTable from '../../../components/allInvoiceTable.js'
import FaCirclePlus from "../../../assets/icons/faCirclePlus.svg";
import FaRupeeCircle from "../../../assets/icons/faRupeeCircle.svg";

export default function InvoiceListComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="container-fluid">
                    <div className={`${styles.comapnyInvoiceHeadingWrapper} row`}>
                        <div className="col-6">
                            <h2 className={`${styles.title}`}>
                                All Invoices
                            </h2>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <Link href={'/invoices/add'}>
                                <button className="green align-content-center">
                                    <FaCirclePlus />
                                    Create Invoice
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className={`${styles.companyInvoiceTopInvoiceHeader} card`}>
                        <div className={`${styles.card_body} card-body row`}>
                            <div className={`${styles.companyInvoiceTopHeaderSVGWrapper} col-12 col-lg-1 d-flex d-lg-none justify-content-lg-start align-items-center`}><i><FaRupeeCircle /></i></div>
                            <div className={`${styles.companyInvoiceTopHeaderTotalOutstandingWrapper} col-6 col-lg-3`}><div className="row"><div className={`${styles.companyInvoiceTopHeaderSVGWrapper} col-12 col-lg-2 d-none d-lg-flex justify-content-lg-start align-items-center`}><i><FaRupeeCircle /></i></div><div className="col-12 col-lg-10"><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Total Outstanding Receivables</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>Rs. 217,416.40</div></div></div></div>
                            <div className={`${styles.companyInvoiceTopHeaderDueTodayWrapper} col-6 col-lg-2`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Due Today</div> <div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>Rs. 0,0</div></div>
                            <div className={`${styles.companyInvoiceTopHeaderDueWithinWrapper} col-6 col-lg-2`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Due Within 30 Days</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>Rs. 0,0</div></div>
                            <div className={`${styles.companyInvoiceTopHeaderOverdueInvoiceWrapper} col-6 col-lg-2`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Overdue Invoice</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>Rs. 217,416.40</div></div>
                            <div className={`${styles.companyInvoiceTopHeaderDaysGettingPaidWrapper} col-12 col-lg-3`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Average No. of Days for Getting Paid</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>5 Days</div></div>
                        </div>
                    </div>

                    <div className='p-2'>
                        <AllInvoiceTable />
                    </div>
                </div>
            </main>
        </div>
    )
}