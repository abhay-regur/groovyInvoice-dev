"use client"
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { NavExpandedState } from '@/context/NavState.context';
import styles from '@/styles/invoice.module.scss';
import FaCirclePlus from "@/assets/icons/faCirclePlus.svg";
import Breadcrumb from '@/components/common/breadcrumb';
import dynamic from 'next/dynamic';
import { getTotalOutstandingReceivables, getDueToday, getDueWithin30Days, getOverdue } from '@/services/payment.service';
import { getCompanyDetails } from '@/services/companies.service'
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { useCurrentUserData } from '@/context/CurrentUserData.context';
import { getCurrencyById } from '@/services/common/general.service';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';

const AllInvoiceTable = dynamic(
    () => import("@/components/invoice/allInvoiceTable"),
    { ssr: false }
);

export default function InvoiceListComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    const [totalOutstandingReceivables, setTotalOutstandingReceivables] = useState(0)
    const [dueToday, setDueToday] = useState(0)
    const [dueWithin30Days, setDueWithin30Days] = useState(0)
    const [overdue, setOverdue] = useState(0);
    const [errors, setErrors] = useState(false)
    const { setToastList } = useContext(ToastMsgContext);
    const [dateFormat, setDateFormat] = useState('');
    const [currencySymbol, setCurrencySymbol] = useState('₹');
    const { userInfo } = useCurrentUserData()

    const getDateFormat = async () => {
        const result = await getCompanyDetails();
        setDateFormat(result.data.dateFormat);
    }

    useEffect(() => {
        getDateFormat();
    }, [])

    useEffect(() => {
        getCurrencySymbol(userInfo.currencyId);
    }, [userInfo.currencyId])

    const getCurrencySymbol = async (id) => {
        try {
            if (id != "" && id != null) {
                const selectCurrencyDetails = await getCurrencyById(id);
                if (selectCurrencyDetails.status == 200) setCurrencySymbol(selectCurrencyDetails.data.symbol);
            }
        } catch (error) {
            setErrors(genrateErrorMessage({}, '', setToastList));
        }
    }

    const getData = async () => {
        try {
            const totalOutstandingReceivableData = await getTotalOutstandingReceivables()
            setTotalOutstandingReceivables(totalOutstandingReceivableData.data)
            const dueTodayData = await getDueToday()
            setDueToday(dueTodayData.data)
            const dueWithin30DaysData = await getDueWithin30Days()
            setDueWithin30Days(dueWithin30DaysData.data)
            const overdueData = await getOverdue()
            setOverdue(overdueData.data)
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="main">
                    <div className="breadcrumbWrapper">
                        <Breadcrumb styles={styles} />
                    </div>
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
                            <div className={`${styles.companyInvoiceTopHeaderSVGWrapper} col-12 col-lg-1 d-flex d-lg-none justify-content-lg-start align-items-center`}> <div className={`${styles.companyInvoiceCurrencyIcon}`}>{currencySymbol}</div></div>
                            <div className={`${styles.companyInvoiceTopHeaderTotalOutstandingWrapper} col-6 col-lg-3`}><div className="row"><div className={`${styles.companyInvoiceTopHeaderSVGWrapper} col-12 col-lg-3 d-none d-lg-flex justify-content-lg-start align-items-center`}><div className={`${styles.companyInvoiceCurrencyIcon}`}>{currencySymbol}</div></div><div className="col-12 col-lg-9"><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Total Outstanding Receivables</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>{currencySymbol} {totalOutstandingReceivables}</div></div></div></div>
                            <div className={`${styles.companyInvoiceTopHeaderDueTodayWrapper} col-6 col-lg-2`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Due Today</div> <div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>{currencySymbol} {dueToday}</div></div>
                            <div className={`${styles.companyInvoiceTopHeaderDueWithinWrapper} col-6 col-lg-2`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Due Within 30 Days</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>{currencySymbol} {dueWithin30Days}</div></div>
                            <div className={`${styles.companyInvoiceTopHeaderOverdueInvoiceWrapper} col-6 col-lg-2`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Overdue Invoice</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>{currencySymbol} {overdue}</div></div>
                            <div className={`${styles.companyInvoiceTopHeaderDaysGettingPaidWrapper} col-12 col-lg-3`}><div className={`${styles.companyInvoiceTopInvoiceHeaderText}`}>Average No. of Days for Getting Paid</div><div className={`${styles.companyInvoiceTopInvoiceHeaderNumber}`}>5 Days</div></div>
                        </div>
                    </div>

                    <div className='p-2'>
                        {dateFormat && <AllInvoiceTable dateFormat={dateFormat} />}
                    </div>
                </div>
            </main>
        </div>
    )
}