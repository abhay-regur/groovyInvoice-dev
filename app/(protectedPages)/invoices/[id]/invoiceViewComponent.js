"use client"
import { useState, useContext, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NavExpandedState } from '@/context/NavState.context';
import Breadcrumb from '@/components/common/breadcrumb';
import styles from '@/styles/viewInvoice.module.scss';
import ViewInvoiceTable from '@/components/viewInvoiceTable.js';
import FaPen from '@/assets/icons/faPen.svg';
import FaMail from '@/assets/icons/faEnvelopeGreen.svg';
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
import { paymentInfoForInvoice } from '@/services/payment.service';
import { useUser } from "@/context/CurrentUserData.context";

export default function InvoiceViewComponent() {
    const { id } = useParams();
    const router = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const { companyName, companyAddress, userCompanyImage, datePref, currencyId } = useUser();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [actionBarExpandedState, setactionBarExpandedState] = useState(false);
    const [dateFormat, setDateFormat] = useState('dd/MM/yyyy');

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
        invoiceItems: []
    })
    const [paymentInfo, setPaymentInfo] = useState({
        paidAmount: 0,
        unpaidAmount: 0,
    })

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        customerCompanyName: "",
        email: "",
        phone: "",
        GSTIN: "",
        panNumber: "",
        currencyId: 103,
        openingBalance: 0,
        paymentTermId: null,
        address: {
            type: "billing-address",
            attention: "-",
            countryId: null,
            addressLine1: "-",
            addressLine2: "-",
            city: "-",
            stateId: null,
            zipCode: "-",
            phone: "-",
            fax: "-"
        }
    });

    const [paymentTerm, setPaymentTerm] = useState({ label: '' });

    const getInvoiceData = async () => {
        try {
            const result = await getInvoice(id);
            const data = result.data;
            setData({ ...data, invoiceDate: new Date(data.invoiceDate), dueDate: new Date(data.dueDate) })

            getCustomerData(data.customerId);
            getPaymentTermData(data.termsId);
            setIsPageLoading(false);
            const paymentResult = await paymentInfoForInvoice(id);
            setPaymentInfo(paymentResult.data)

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
            setCustomer({
                firstName: customerData.data.firstName,
                lastName: customerData.data.lastName,
                customerCompanyName: customerData.data.customerCompanyName,
                email: customerData.data.email,
                phone: customerData.data.phone,
                GSTIN: customerData.data.GSTIN,
                panNumber: customerData.data.panNumber,
                currencyId: customerData.data.currencyId,
                openingBalance: customerData.data.openingBalance,
                paymentTermId: customerData.data.paymentTermId,
                address: {
                    type: "billing-address",
                    attention: customerData.data.address.billingAddress.attention,
                    countryId: customerData.data.address.billingAddress.countryId,
                    addressLine1: customerData.data.address.billingAddress.addressLine1,
                    addressLine2: customerData.data.address.billingAddress.addressLine2,
                    city: customerData.data.address.billingAddress.city,
                    stateId: customerData.data.address.billingAddress.stateId,
                    zipCode: customerData.data.address.billingAddress.zipCode,
                    phone: customerData.data.address.billingAddress.phone,
                    fax: customerData.data.address.billingAddress.fax
                }
            });
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

    useEffect(() => {
        setDateFormat(datePref);
    }, [datePref])



    return (
        <div className={styles.container}>
            {isPageLoading ?
                <Loading /> :
                <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                    <div className="breadcrumbWrapper">
                        <Breadcrumb styles={styles} />
                    </div>
                    <div className="container px-3 px-sm-0">
                        <div className={`${styles.comapnyInvoiceViewInvoiceHeadWrapper} row`}>
                            <div className={`${styles.comapnyInvoiceViewInvoiceMainHeading} col-9 col-md-10 col-lg-7`}>{customer.firstName + ' ' + customer.lastName}<span className={`${styles.comapnyInvoiceViewInvoiceSubHeading}`}>#{formatDate(data.invoiceDate, dateFormat)}</span></div>
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
                                                    <Link href={`/invoices/${id}/payment`} className="nav-link d-flex justify-content-lg-center">
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaRupee /></span>
                                                        <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText}`}>Record Payment</span>
                                                    </Link>

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
                                            <div className={`${styles.companyInvoiceViewInvoiceComapnyName}`}>{companyName}</div>
                                            <div className={`${styles.comapanyInvoiceViewInvoiceComapanyDescription}`}>{companyAddress}</div>
                                        </div>
                                        <div className="col-12 col-lg-6 order-0 order-lg-1">
                                            <div className={`${styles.comapnyInvoiceViewInvoiceHeading} d-flex justify-content-end`}>Tax Invoice</div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceInvoiceDate} d-flex justify-content-end`}>#{formatDate(data.invoiceDate, dateFormat)}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToHeading}`}>Bill To</div>
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToAddressWrapper}`}>
                                                <div className={`${styles.companyInvoiceViewInvoiceBillToName}`}>{customer.customerCompanyName}</div>
                                                <div className={`${styles.companyInvoiceViewInvoiceBillToAddress}`}>
                                                    {customer.address.addressLine1 + ' ' + customer.address.addressLine2}
                                                    <br />
                                                    {customer.address.city + ', ' + customer.address.zipCode}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row justify-content-end`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-3 text-align-start`}>Invoice#</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{data.invoiceNo}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row justify-content-end`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-3 text-align-start`}>Invoice Date</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{formatDate(data.invoiceDate, dateFormat)}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row justify-content-end`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-3 text-align-start`}>Terms</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{paymentTerm.label}</span>
                                            </div>
                                            <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row justify-content-end`}>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-3 text-align-start`}>Due Date</span>
                                                <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>{formatDate(data.dueDate, dateFormat)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
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
                                                    <span className="red">-Rs. {parseFloat(paymentInfo.paidAmount).toFixed(2)}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <span>Balance Due</span>
                                                    <span>Rs. {parseFloat(paymentInfo.unpaidAmount).toFixed(2)}</span>
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