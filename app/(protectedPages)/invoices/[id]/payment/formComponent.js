"use client"
import { useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import styles from '@/styles/payment.module.scss';
import FaSave from '@/assets/icons/faSave.svg';
import FaUpload from '@/assets/icons/faUpload.svg';
import FaCalendar from '@/assets/icons/faCalendar.svg';
import Breadcrumb from '@/components/common/breadcrumb';
import Checkbox from '@/components/checkBox';
import "react-datepicker/dist/react-datepicker.css";
import { NavExpandedState } from '@/context/NavState.context';
import { useInvoiceDetails } from '@/context/invoiceDetails.context';
import { useParams } from 'next/navigation';
import { paymentInfoForInvoice } from '@/services/payment.service';
import { getInvoice } from '@/services/invoice.service';
import { getCustomer } from '@/services/customer.service';
import ErrorList from '@/components/errorList';
import { savePaymentForInvoice, getPaymentHistoryForInvoice } from '@/services/payment.service';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import InvoicePreviousPaymentTable from '@/components/invoice/invoicePreviousPaymentTable';
import { getCurrencyById } from '@/services/common/general.service';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import Loading from '@/app/(protectedPages)/loading';

export default function PaymentFormComponent() {
    const { id } = useParams();
    const { navExpandedState } = useContext(NavExpandedState);
    const { invoiceDetailsContext, setInvoiceDetailsContext } = useInvoiceDetails();
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [currencySymbol, setCurrencySymbol] = useState('₹');
    const [isLoading, setIsloading] = useState(true);
    const [previousPaymentData, setPreviewPaymentData] = useState([])

    const [data, setData] = useState({
        customerName: invoiceDetailsContext.customerDetails.name,
        invoiceNo: invoiceDetailsContext.invoiceDetails.invoiceNo,
        totalAmount: invoiceDetailsContext.invoiceDetails.totalAmount,
        amount: 0,
        paymentDate: new Date(),
        panCardNumber: invoiceDetailsContext.customerDetails.panCardNumber,
        refrence: '',
        notes: '',
        attachedFiles: [],
        thankyouEmail: false
    });

    useEffect(() => {
        if (invoiceDetailsContext.invoiceDetails.currencyId !== '') {
            Promise.allSettled([getPaymentHistory(), getCurrencySymbol(invoiceDetailsContext.invoiceDetails.currencyId)]).then(() => { setIsloading(false) })
        } else {
            getMissingData(id);
            Promise.allSettled([getPaymentHistory(), getCurrencySymbol(invoiceDetailsContext.invoiceDetails.currencyId)]).then(() => { setIsloading(false) })
        }
    }, [])

    const getMissingData = async (id) => {
        const tempmainData = data;
        const tempInvoiceDetails = { ...invoiceDetailsContext }
        const result = await getInvoice(id);
        const tempcustomerData = await getCustomer(result.data.customerId);
        const paymentResult = await paymentInfoForInvoice(id);
        invoiceDetailsContext.customerDetails.name = tempcustomerData.data.firstName + " " + tempcustomerData.data.lastName;
        tempInvoiceDetails.customerDetails.panCardNumber = tempcustomerData.data.panNumber;
        tempInvoiceDetails.invoiceDetails.currencyId = tempcustomerData.data.currencyId;
        tempInvoiceDetails.invoiceDetails.invoiceNo = result.data.invoiceNo
        tempInvoiceDetails.invoiceDetails.unpaidAmount = paymentResult.data.unpaidAmount;
        tempInvoiceDetails.invoiceDetails.paidAmount = paymentResult.data.paidAmount;
        setData({ ...tempmainData, customerName: tempcustomerData.data.firstName + " " + tempcustomerData.data.lastName, invoiceNo: result.data.invoiceNo, unpaidAmount: paymentResult.data.unpaidAmount, paidAmount: paymentResult.data.paidAmount, panCardNumber: tempcustomerData.data.panNumber })
        setInvoiceDetailsContext(tempInvoiceDetails);
    }

    const getCurrencySymbol = async (id) => {
        try {
            if (id != "" && id != null) {
                const selectCurrencyDetails = await getCurrencyById(id);
                if (selectCurrencyDetails.status == 200) setCurrencySymbol(selectCurrencyDetails.data.symbol);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const getPaymentHistory = async () => {
        try {
            const result = await getPaymentHistoryForInvoice(id);
            setPreviewPaymentData(result.data);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const handleInput = ({ target }) => {
        if (target.value != '') {
            let name = target.name || target.getAttribute('name');

            if (name == 'amount') {
                data[name] = parseFloat(target.value);
            } if (name == 'attachedFiles') {
                data[name] = target.files[0]
            } else data[name] = target.value;

            let temp = Object.assign({}, data)
            setData(temp);
        }
    }

    const setDateChange = (value, name) => {
        data[name] = value
        let temp = Object.assign({}, data)
        setData(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var myFormData = new FormData();
        myFormData.append('invoiceId', parseInt(id))
        myFormData.append('amount', data.amount)
        myFormData.append('paymentDate', data.paymentDate)
        myFormData.append('references', data.refrence)
        myFormData.append('notes', data.notes)
        myFormData.append('file', data.attachedFiles)

        try {
            await savePaymentForInvoice(myFormData);
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Payment added',
                description: 'Added Payment for the Invoice #' + invoiceDetailsContext.invoiceDetails.invoiceNo,
            }]);
            getPaymentHistory();
        } catch (error) {
            console.log(error);
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="main">
                    <div className="breadcrumbWrapper">
                        <Breadcrumb />
                    </div>
                    {isLoading ? <Loading /> :
                        <div className="container-fluid">
                            <h2 className={`${styles.title}`}>
                                Payments Information for #{invoiceDetailsContext.invoiceDetails.invoiceNo}
                            </h2>
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    <div className={`${styles.card} card`}>
                                        <div>
                                            <ErrorList errors={errors} />
                                        </div>

                                        <div className={`${styles.companyInvoiceCustomerNameWrapper} mb-3 row`}>
                                            <div className="col-10">
                                                <label className={`${styles.companyInvoiceCustomerNameLabel}`}>Customer Name<span className={`${styles.green}`}>*</span></label>
                                            </div>
                                            <div className="col-12 col-lg-10 mt-2">
                                                <input type="text" className="form-control" id="companyInvoiceCustomerName" placeholder='Customer Name' value={data.customerName} disabled />
                                            </div>
                                        </div>
                                        <div className={`${styles.companyInvoicePaymentNumberWrapper} mb-3 row`}>
                                            <div className="col-10">
                                                <label className={`${styles.companyInvoicePaymentNumberLabel}`}>Payment Invoice#<span className={`${styles.green}`}>*</span></label>
                                            </div>
                                            <div className="col-12 col-lg-10 d-flex align-items-center mt-2">
                                                <input type="text" className="form-control" id="companyInvoicePaymentNumber" placeholder='Invoice Number' onChange={handleInput} disabled />
                                            </div>
                                        </div>

                                        <div className={`${styles.companyInvoiceAmountcard} row p-0 mb-3`}>
                                            <div className="col-12 col-lg-10">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label className={`${styles.companyInvoiceAmountRecivedLabel}`}>Amount Received</label>
                                                    </div>
                                                    <div className="col-12 mt-2">
                                                        <div className="input-group">
                                                            <span className="input-group-text">{currencySymbol}</span>
                                                            <input type="number" className="form-control" id="companyInvoiceAmountRecived" name="amount" onChange={handleInput} min={1} max={data.totalAmount} placeholder={'Total Receivables: ' + data.totalAmount} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mt-2">
                                                        <div className={`${styles.companyInvoiceAddPan}`}><span className={`${styles.grey}`}>PAN :</span> {data.panCardNumber}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.companyInvoicePaymentDateModeWrapper} row`}>
                                            <div className="col-12 col-md-6 col-lg-10">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label className={`${styles.companyInvoicePaymentDateLabel}`}>Payment Date<span className={`${styles.green}`}>*</span></label>
                                                    </div>
                                                    <div className="col-12 d-flex align-items-center mt-2">
                                                        <DatePicker className="form-control" id="companyInvoicePaymentDate" name='paymentDate' selected={data.paymentDate} onChange={(date) => setDateChange(date, 'paymentDate')} />  <FaCalendar />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12"></div>
                                            <div className="col-12 col-lg-10 mt-2">
                                                <div className={`${styles.companyInvoicePaymentReferenceWrapper} mb-3 row`}>
                                                    <div className="col-12 mb-2">
                                                        <label className={`${styles.companyInvoicePaymentReferenceLabel}`}>Reference<span className={`${styles.green}`}>#</span></label>
                                                    </div>
                                                    <div className="col-12">
                                                        <input type="text" className="form-control" id="companyInvoicePaymentReference" name='refrence' placeholder='Reference' onChange={handleInput} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12"></div>
                                            <div className="col-12 col-lg-10">
                                                <div className={`${styles.companyInvoicePaymentNoteWrapper} mb-3 row`}>
                                                    <div className="col-12">
                                                        <label className={`${styles.companyInvoicePaymentNoteLabel}`}>Notes</label>
                                                    </div>
                                                    <div className="col-12 d-flex align-items-center mt-2">
                                                        <textarea className="form-control" id="companyInvoicePaymentMode" name='notes' placeholder='Add Notes' onChange={handleInput} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12"><label className={`${styles.companyInvoicePaymentInputFilelabel}`}>Attach File(s)</label></div>
                                            <div className="col-12"></div>
                                            <div className="col-11 col-md-7 col-lg-8 mt-2">
                                                <div className={`${styles.companyInvoicePaymentInputFileWrapper} d-flex`}>
                                                    <span className={`${styles.companyInvoicePaymentInputFileSVGWrapper}`}>
                                                        <FaUpload />
                                                    </span>
                                                    <input className={`${styles.companyInvoicePaymentInputFile}`} type="file" name='attachedFiles' onChange={handleInput} />
                                                </div>
                                                <div className={`${styles.companyInvoicePaymentInputFileMessage}`}>You can upload one file of max-size 5MB</div>
                                            </div>
                                            <div className="col-12"></div>
                                            <div className="col-12 col-md-8 mt-3">
                                                <hr />
                                            </div>
                                            <div className="col-12"></div>
                                            <div className="col-12 col-md-10 mt-3">
                                                <div className={`${styles.companyInvoicePaymentThankYouCheckboxWrapper}`}>
                                                    <Checkbox label="Email a “Thank You” note for this payment" />
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <button name="btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`} onClick={handleSubmit}>
                                                    <span>
                                                        <i className='me-2'><FaSave /></i>
                                                        Save
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={`${styles.card} card mt-sm-3`}>
                                        <div className="card-body">
                                            <h5 className={`card-title ${styles.previousPaymentTitle}`}>Previous Payments for #{invoiceDetailsContext.invoiceDetails.invoiceNo}</h5>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className={`${styles.companyInvoicePreviousPaymentTableWrapper}`}>
                                                    <InvoicePreviousPaymentTable items={previousPaymentData} styles={styles} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </main >
        </div >
    )
}