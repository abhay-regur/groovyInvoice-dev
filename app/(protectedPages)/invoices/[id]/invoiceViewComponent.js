"use client"
import { useState, useContext, useEffect } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { NavExpandedState } from '@/context/NavState.context';
import Breadcrumb from '@/components/common/breadcrumb';
import styles from '@/styles/viewInvoice.module.scss';
import ViewInvoiceTable from '@/components/viewInvoiceTable.js';
import FaPen from '@/assets/icons/faPen.svg';
import FaMail from '@/assets/icons/faEnvelopeGreen.svg';
import FaShare from '@/assets/icons/faShare.svg';
import FaBell from '@/assets/icons/faBell.svg';
import FaPDF from '@/assets/icons/faPDF.svg';
import FaRupee from '@/assets/icons/faRupee.svg';
import FaDropDown from '@/assets/icons/faDropDownGreen.svg';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { getInvoice } from '@/services/invoice.service';
import { getCustomer } from '@/services/customer.service';
import { getPaymentTerm } from '@/services/paymentTerms.service';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { formatDate } from '@/utils/date.utils';
import Link from 'next/link';
import { convertNumberToWord } from '@/utils/number.utils';
import Loading from '@/app/loading';

export default function InvoiceViewComponent() {
    const { id } = useParams();
    const router = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [actionBarExpandedState, setactionBarExpandedState] = useState(false);
    const [data, setData] = useState({
        customerId: 0,
        invoiceNo: '',
        orderNumber: '',
        invoiceDate: new Date(),
        termsId: 0,
        dueDate: new Date(),
        customerNote: '',
        subTotalAmount: 0,
        shippingCharges: 0,
        totalTaxAmount: 0,
        totalAmount: 0,
        adjustmentText: '',
        adjustmentAmount: 0,
        paidAmount: 0,
        unpaidAmount: 0,
        invoiceItems: []
    })

    const [customer, setCustomer] = useState({ firstName: '', lastName: '' });
    const [paymentTerm, setPaymentTerm] = useState({ label: '' });

    const getInvoiceData = async () => {
        try {
            const result = await getInvoice(id);
            const data = result.data;
            setData({ ...data, invoiceDate: new Date(data.invoiceDate), dueDate: new Date(data.dueDate) })

            getCustomerData(data.customerId);
            getPaymentTermData(data.termsId);
            setIsPageLoading(false);

        } catch (error) {
            if (error.response != undefined && error.response.status == 404) {
                router.push('/404');
            } else {
                setErrors(genrateErrorMessage(error, '', setToastList));
            }
        }
    }

    const getCustomerData = async (id) => {
        try {
            const customerData = await getCustomer(id);
            setCustomer(customerData.data);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const getPaymentTermData = async (id) => {
        try {
            const paymentTermData = await getPaymentTerm(id)
            setPaymentTerm(paymentTermData.data);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    useEffect(() => {
        setIsPageLoading(true);
        getInvoiceData();
    }, [])

    return (
        <div className={styles.container}>
            {isPageLoading ?
                <Loading /> :
                <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                    <div className="container-fluid">
                        <div className="breadcrumbWrapper">
                            <Breadcrumb styles={styles} />
                        </div>
                        <div className={`${styles.comapnyInvoiceViewInvoiceHeadWrapper} row`}>
                            <div className={`${styles.comapnyInvoiceViewInvoiceMainHeading} col-9 col-md-10 col-lg-7`}>{customer.firstName + ' ' + customer.lastName}<span className={`${styles.comapnyInvoiceViewInvoiceSubHeading}`}>#{formatDate(data.invoiceDate)}</span></div>
                            <div className={`${styles.companyInvoiceViewInvoiceActionBarWrapper} col-12`}>
                                <nav className={`${styles.companyInvoiceViewInvoiceActionBar} navbar navbar-expand-lg`}>
                                    <div className="container-fluid">
                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarAction} navbar-brand`}>Action</span>
                                        <button className={`${actionBarExpandedState ? styles.rotate : ""} navbar-toggler`} type="button" onClick={() => { setactionBarExpandedState(prevCheck => !prevCheck) }}>
                                            <FaDropDown />
                                        </button>
                                        <div className={`${styles.companyInvoiceViewInvoiceActionBarCollapse} ${actionBarExpandedState ? "" : styles.collapse} navbar-collapse justify-content-lg-start`} id="navbarNavDropdown">
                                            <ul className={`${styles.companyInvoiceViewInvoiceActionBarnavbarNav} navbar-nav nav-fill`}>
                                                <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item`}>
                                                    <Link href={`/invoices/update/${id}`} className="nav-link d-flex justify-content-lg-center">
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaPen /></span>
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText}`}> Edit</span>
                                                    </Link>
                                                </li>
                                                <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item dropdown`}>
                                                    <div className="nav-link d-flex justify-content-lg-center">
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaMail /></span>
                                                        <a className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText}`} role="button">
                                                            Mail / SMS
                                                        </a>
                                                    </div>
                                                    <ul className="dropdown-menu">
                                                        <li><span className="dropdown-item">Action</span></li>
                                                        <li><span className="dropdown-item">Another action</span></li>
                                                        <li><span className="dropdown-item">Something else here</span></li>
                                                    </ul>
                                                </li>
                                                <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item`}>
                                                    <div className="nav-link d-flex justify-content-lg-center">
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaShare /></span>
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText}`}>Share</span>
                                                    </div>
                                                </li>
                                                <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item dropdown`}>
                                                    <div className="nav-link d-flex justify-content-lg-center">
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaBell /></span>
                                                        <a className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText}`}>
                                                            Reminders
                                                        </a>
                                                    </div>
                                                    <ul className="dropdown-menu">
                                                        <li><span className="dropdown-item">Action</span></li>
                                                        <li><span className="dropdown-item">Another action</span></li>
                                                    </ul>
                                                </li>
                                                <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item dropdown`}>
                                                    <div className="nav-link d-flex justify-content-lg-center">
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaPDF /></span>
                                                        <a className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText}`}>
                                                            PDF / Print
                                                        </a>
                                                    </div>
                                                    <ul className="dropdown-menu">
                                                        <li><span className="dropdown-item">Action</span></li>
                                                        <li><span className="dropdown-item">Another action</span></li>
                                                    </ul>
                                                </li>
                                                <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item`}>
                                                    <div className="nav-link d-flex justify-content-lg-center">
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaRupee /></span>
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText}`}>Record Payment</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-12">
                                <div className={`${styles.companyInvoiceViewInvoiceViewWrapper}`}>
                                    <div className="row">
                                        <div className="col-12 col-lg-6 order-1 order-lg-0">
                                            <div className={`${styles.companyInvoiceViewInvoiceComapnyName}`}>Verities Systems</div>
                                            <div className={`${styles.comapanyInvoiceViewInvoiceComapanyDescription}`}>Donec libero massa lacinia maximus tempor ante, phasellus auctor varius libero varius purus</div>
                                        </div>
                                        <div className="col-12 col-lg-6 order-0 order-lg-1">
                                            <div className={`${styles.comapnyInvoiceViewInvoiceHeading} d-flex justify-content-end`}>Tax Invoice</div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceInvoiceDate} d-flex justify-content-end`}>#2022/09-04</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToHeading}`}>Bill To</div>
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToAddressWrapper}`}>
                                                <div className={`${styles.companyInvoiceViewInvoiceBillToName}`}>Molestiequis ornare dignissim</div>
                                                <div className={`${styles.companyInvoiceViewInvoiceBillToAddress}`}>Tempor ante phasellus auctor varius libero varius purus</div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Invoice#</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{data.invoiceNo}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Invoice Date</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{formatDate(data.invoiceDate)}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Terms</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{paymentTerm.label}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Due Date</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{formatDate(data.dueDate)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToHeading}`}>Bill To</div>
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToAddressWrapper}`}>
                                                <div className={`${styles.companyInvoiceViewInvoiceBillToName}`}>Molestiequis ornare dignissim</div>
                                                <div className={`${styles.companyInvoiceViewInvoiceBillToAddress}`}>Tempor ante phasellus auctor varius libero varius purus</div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Invoice#</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{data.invoiceNo}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Invoice Date</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{formatDate(data.invoiceDate)}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Terms</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{paymentTerm.label}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Due Date</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{formatDate(data.dueDate)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ViewInvoiceTable items={data.invoiceItems} />
                                    <div className="row">
                                        <div className="col-12 col-lg-5 order-1 order-lg-0">
                                            <div className={`${styles.companyInvoiceViewInvoiceTotalInWordsWrapper}`}>
                                                <div className={`${styles.companyInvoiceViewInvoiceTotalInWordsLabel}`}>Total In Words</div>
                                                <div className={`${styles.companyInvoiceViewInvoiceTotalInWords}`}>{convertNumberToWord(data.totalAmount)}</div>
                                            </div>
                                            <div className={`${styles.companyInvoiceViewInvoiceThankYouWrapper}`}>
                                                <div className={`${styles.companyInvoiceViewInvoiceThankYou}`}>Thanks For Your Business.</div>
                                            </div>
                                            <div className={`${styles.companyInvoiceViewInvoicePaymentMethodWrapper}`}>
                                                <div className={`${styles.companyInvoiceViewInvoicePaymentMethodLabel}`}>Payment Method</div>
                                                <div className={`${styles.companyInvoiceViewInvoicePaymentMethod}`}>Bank</div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-7 order-0 order-lg-1">
                                            <div className={`${styles.companyInvoiceViewInvoiceTotalCard} card`}>
                                                <div className="d-flex justify-content-between">
                                                    <span>Sub Total</span>
                                                    <span>Rs. {parseFloat(data.subTotalAmount).toFixed(2)}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Total</span>
                                                    <span>Rs. {parseFloat(data.totalAmount).toFixed(2)}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Payment Made</span>
                                                    <span className="red">-Rs. {parseFloat(data.paidAmount).toFixed(2)}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <span>Balance Due</span>
                                                    <span>Rs. {parseFloat(data.unpaidAmount).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            }

        </div>
    )
}