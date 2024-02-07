"use client"
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';
import InvoiceTable from '@/components/invoice/invoiceTable';
import RadioButton from '@/components/radioButton';
import styles from "@/styles/newInvoice.module.scss";
import { NavExpandedState } from '@/context/NavState.context';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import FaSave from '@/assets/icons/faSave.svg';
import FaPaperPen from '@/assets/icons/faPaperPen.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaCircleQuestion from '@/assets/icons/faCircleQuestion.svg';
import FaGear from '@/assets/icons/faGear.svg';
import "react-datepicker/dist/react-datepicker.css";
import CustomSelectComponent from '@/components/common/customSelectComponent';
import Breadcrumb from '@/components/common/breadcrumb';
import { getInvoice, updateInvoice } from '@/services/invoice.service';
import { getCustomers } from '@/services/customer.service';
import { getPaymentTerms } from '@/services/paymentTerms.service';
import ErrorList from '@/components/errorList';
import Loading from "@/app/(protectedPages)/loading.js";
import DateInputField from '@/components/common/dateInputField';
import { addDaysInDate } from '@/utils/date.utils';
import { useRouter } from 'next/navigation';

import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { enableElement, disableElement } from '@/utils/form.utils';

export default function InvoiceEditForm() {
    const { id } = useParams();
    const { replace } = useRouter();
    const [taxValueSelected, settaxValueSelected] = useState();
    const { navExpandedState } = useContext(NavExpandedState);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [customers, setCustomer] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [errors, setErrors] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(true);
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
        invoiceItems: [],
        termsAndCondition: '',
    })

    const getData = async () => {
        try {
            const result = await getInvoice(id);
            setData({ ...result.data, invoiceDate: new Date(result.data.invoiceDate), dueDate: new Date(result.data.dueDate) })
        } catch (error) {
            if (error.response != undefined && error.response.status == 404) {
                replace('/404');
            } else {
                setErrors(genrateErrorMessage(error, '', setToastList));
                setIsPageLoading(false);
            }
        }
    }

    const getPaymentTermsDetails = async () => {
        let temp = [];
        try {
            const result = await getPaymentTerms();
            result.data.forEach((data) => {
                temp.push({ Id: data.id, name: data.label, numberOfDays: data.numberOfDays })
            });
            setPaymentTerms(temp);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        setIsPageLoading(false);
    }

    useEffect(() => {
        setIsPageLoading(true);
        getData();
        getCustomersList();
        getPaymentTermsDetails()
    }, [])

    const calculateTotalAmount = () => {
        let subTotalAmount = 0
        let totalTaxAmount = 0
        for (let i = 0; i < data.invoiceItems.length; i++) {
            subTotalAmount = parseFloat(subTotalAmount) + parseFloat(data.invoiceItems[i].total)
            totalTaxAmount = parseFloat(totalTaxAmount) + parseFloat(data.invoiceItems[i].taxAmount)
        }
        data.subTotalAmount = parseFloat(subTotalAmount)
        data.totalTaxAmount = parseFloat(totalTaxAmount)
        data.totalAmount = parseFloat(data.adjustmentAmount) + parseFloat(data.shippingCharges) + parseFloat(data.totalTaxAmount) + parseFloat(data.subTotalAmount);
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const setItemsData = (itemsData) => {
        data['invoiceItems'] = itemsData
        let temp = Object.assign({}, data)
        setData(temp)
        calculateTotalAmount()
    }

    const handleInput = ({ target }) => {
        let name = target.name || target.getAttribute('name');
        if (name != '') {
            if (['openingBalance', 'gstTreatment', 'customerId', 'termsId', 'subtotalAmount', 'shippingCharges'].includes(name)) {
                if (!Number.isNaN((target.value)) && target.value != '') {
                    data[name] = parseInt(target.value).toFixed(2);
                } else {
                    data[name] = 0;
                }
            } else if (name == 'adjustmentAmount') {
                if (!Number.isNaN((target.value)) && target.value != '') {
                    data[name] = parseFloat(target.value);
                } else {
                    data[name] = 0.00;
                }

            } else {
                data[name] = target.value;
            }
            let temp = Object.assign({}, data)
            setData(temp)
        }
        calculateTotalAmount()
    }

    const handleSubmit = async (e, status) => {
        disableElement(e.target)
        setErrors([])
        try {
            await updateInvoice(id, { ...data, status })
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Invoice updated successfully',
                description: '',
            }]);
        } catch (error) {
            setErrors(genrateErrorMessage(error, 'Invoices', setToastList));
        }
        enableElement(e.target)
    }

    const getCustomersList = async () => {
        let temp = [];
        try {
            const result = await getCustomers();
            result.data.forEach((elem) => {
                temp.push({ Id: elem.id, name: elem.displayName })
            });
            setCustomer(temp);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const handleTDSChange = () => {
        settaxValueSelected('tds');
    };

    const handleTCSChange = () => {
        settaxValueSelected('tcs');
    };

    const handlePaymentTermChange = ({ target }) => {
        let name = target.name || target.getAttribute('name');
        data[name] = parseInt(target.value)
        const paymentTerm = paymentTerms.find((item) => item.Id == parseInt(target.value))
        const date = addDaysInDate(new Date(), paymentTerm.numberOfDays)
        data['dueDate'] = new Date(date)
        let temp = Object.assign({}, data)
        setData(temp)
    }

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="breadcrumbWrapper">
                    <Breadcrumb styles={styles} />
                </div>
                <h2 className={`${styles.title}`}>
                    Update Invoice
                </h2>
                {isPageLoading ?
                    <Loading /> :
                    <div className="container-fluid">
                        <div className={`${styles.card} card`}>
                            <div className={`${styles.cardBody} card-body`}>
                                <h4 className={`${styles.cardTitle} card-title`}>Customer & Invoice Details</h4>
                                <hr />
                                <ErrorList errors={errors} />
                                <div className={`${styles.mainWrapper}`}>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-4">
                                            <div className={`${styles.companyNameWrapper} form-group`}>
                                                <label htmlFor="customerName" className="form-label control-label">Customer Name<span className={`${styles.green}`}>*</span></label>
                                                <CustomSelectComponent
                                                    className={`${styles.companInvoicePaymentTermsSelect}`}
                                                    inputClass="form-control"
                                                    data={customers}
                                                    onOptionValueChange={handleInput}
                                                    optionValue={data.customerId}
                                                    name={'customersId'}
                                                    isDisabled={false}
                                                    defaultText={'Select An Option'}
                                                    isInnerButtonRequired={false}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                            <div className={`${styles.companyInvoiceNumberWrapper} mb-3`}>
                                                <label htmlFor="companyInvoiceNumber" className="form-label">Invoice#<span className={`${styles.green}`}>*</span></label>
                                                <div className={`d-flex align-content-center`}>
                                                    <input type="text" className="form-control" id="companyInvoiceNumber" aria-describedby="emailHelp" name="invoiceNo" value={data.invoiceNo} onChange={handleInput} />
                                                    <i><FaGear /></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                            <div className={`${styles.companyOrderNumberWrapper} mb-3`}>
                                                <label htmlFor="companyOrderNumber" className="form-label">Order Number</label>
                                                <div className={`d-flex align-content-center`}>
                                                    <input type="text" className="form-control" id="companyOrderNumber" aria-describedby="emailHelp" name="orderNumber" value={data.orderNumber} onChange={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
                                            <DateInputField
                                                label="Invoice Date"
                                                id="companyInvoiceDate"
                                                selected={data.invoiceDate}
                                                onChange={(date) => setDateChange(date, 'invoiceDate')}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-5 col-md-4 col-lg-3">
                                            <div className={`${styles.companyInvoicetermsWrapper} mb-3 mt-0`}>
                                                <label htmlFor="companyInvoiceterms" className="form-label">Terms</label>
                                                <CustomSelectComponent
                                                    className={`${styles.companInvoicePaymentTermsSelect}`}
                                                    inputClass="form-control"
                                                    data={paymentTerms}
                                                    onOptionValueChange={handlePaymentTermChange}
                                                    optionValue={data.termsId}
                                                    name={'termsId'}
                                                    isDisabled={false}
                                                    defaultText={'Select An Option'}
                                                    isInnerButtonRequired={false}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
                                            <DateInputField
                                                label="Due Date"
                                                id="companyInvoiceDueDate"
                                                selected={data.dueDate}
                                                onChange={(date) => setDateChange(date, 'dueDate')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={`${styles.companyInvoiceItemsTableMainWrapper} row`}>
                                    <InvoiceTable itemsData={data.invoiceItems} setItemsData={setItemsData} />
                                </div>
                                <hr />
                                <div className={`${styles.companyInvoiceBottomWrapper}`}>
                                    <div className="row justify-content-left">
                                        <div className="col-md-12 col-lg-5 col-xl-7">
                                            <div className="mb-3">
                                                <label htmlFor="companyInvoiceCustomerNotes" className="form-label">Customer Notes</label>
                                                <textarea className="form-control" placeholder='Enter note' id="companyInvoiceCustomerNotes" value={data.customerNote} name='customerNote' onChange={handleInput}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-7 col-xl-5">
                                            <div className={`${styles.card} card justify-content-between`} >
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className={`${styles.subtotalLabel}`}>Sub Total</div>
                                                        <div className={`${styles.subtotalresult}`}>Rs. {parseFloat(data.subTotalAmount).toFixed(2)}</div>
                                                    </div>
                                                    <div className={`${styles.companyInvoiceTaxOptionWrapper} d-flex align-content-center`}>
                                                        <span className={`${styles.companyInvoiceTaxOptionInputWrapper}`}>
                                                            <span className={`${styles.companyInvoiceTaxSelectorMainWrapper}`}>
                                                                <span className={`${styles.taxTDSRadioButtonWrapper} d-flex align-items-center`}>
                                                                    <RadioButton
                                                                        label="TDS"
                                                                        checked={taxValueSelected === 'tds'}
                                                                        onChange={handleTDSChange}
                                                                    />
                                                                </span>
                                                                <span className={`${styles.taxTCSRadioButtonWrapper} d-flex align-items-center`}>
                                                                    <RadioButton
                                                                        label="TCS"
                                                                        checked={taxValueSelected === 'tcs'}
                                                                        onChange={handleTCSChange}
                                                                    />
                                                                </span>
                                                            </span>
                                                            <span className={`${styles.taxTypeSelectWrapper}`}>
                                                                <select className={`${styles.taxTypeSelect}`}>
                                                                    <option defaultValue>Select Tax</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                </select>
                                                            </span>
                                                        </span>
                                                        <span className={`${styles.totalCalculatedTax} d-flex`}>
                                                            <span className='text-start text-lg-right text-xl-left'> Rs. {parseFloat(data.totalTaxAmount).toFixed(2)}</span>
                                                        </span>
                                                    </div>
                                                    <div className={`${styles.companyInvoiceAdjustmentWrapper} d-flex row`}>
                                                        <div className={`${styles.companyInvoiceAdjustmentInputWrapper} col-5 order-1 col-lg-4 order-lg-1 mb-3`}>
                                                            <input type="text" className={`${styles.companyInvoicePriceAdjustment} form-control`} placeholder="Adjustment" name="adjustmentText" value={data.adjustmentText} onChange={handleInput} />
                                                        </div>
                                                        <div className="col-6 order-3 col-lg-4 order-lg-2">
                                                            <div className={`${styles.companyInvoicePriceAdjustment2Wrapper} d-flex`}>
                                                                <input type="number" className={`${styles.companyInvoicePriceAdjustment} form-control`} name="adjustmentAmount" value={data.adjustmentAmount} onChange={handleInput} />
                                                                <i><FaCircleQuestion></FaCircleQuestion></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 col-lg-4 order-2 order-lg-3">
                                                            <span className={`${styles.totalCalculatedAdjustment} d-flex justify-content-end`}>
                                                                <span> Rs. {parseFloat(data.adjustmentAmount).toFixed(2)}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className={`${styles.companyInvoiceTotalWrapper} row`}>
                                                        <div className="col-6 d-flex text-start align-items-center">
                                                            <h5>Total</h5>
                                                        </div>
                                                        <div className="col-6 text-center text-sm-end">
                                                            <h5>Rs. {parseFloat(data.totalAmount).toFixed(2)}</h5>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-8">
                                            <div className={`${styles.companyInvoiceTermsnConditionsWrapper}`}>
                                                <label htmlFor="companyInvoiceTerms&Conditions" className="form-label">Terms & Conditions</label>
                                                <textarea className="form-control" placeholder='Enter the terms and conditions of your business to be displayed in your transaction' id="companyInvoiceTerms&Conditions" rows="7" name="termsAndCondition" value={data.termsAndCondition} onChange={handleInput}></textarea>
                                            </div>
                                        </div>
                                        <div className="width-100"></div>
                                        <div className="col-md-12 col-lg-9 col-xl-8 col-xxl-6 px-1">
                                            <div className="row gx-1">
                                                <div className="col-6 col-md-4 col-lg-4 col-xl-4">
                                                    <span className={`${styles.companyInvoiceSaveButtonsWrapper} d-flex flex-column`}>
                                                        <button name="btn-submit" className={`${styles.companyInvoiceSaveDraftButton} btn green`} onClick={(e) => handleSubmit(e, 'draft')}>
                                                            <span>
                                                                <i><FaPaperPen /></i>
                                                                Save as Draft
                                                            </span>
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="col-6 col-md-4 col-lg-4 col-xl-4">
                                                    <span className={`${styles.companyInvoiceSaveButtonsWrapper} d-flex flex-column`}>
                                                        <button name="btn-submit" className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={(e) => handleSubmit(e, 'send')}>
                                                            <span>
                                                                <i><FaSave /></i>
                                                                Save & Send
                                                            </span>
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="col-12 col-md-3 col-lg-4 col-xl-3 d-flex flex-column mt-2 mt-md-0">
                                                    <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => { replace('/invoices') }}>
                                                        <span>
                                                            <i><FaCircleXmark /></i>
                                                            Cancel
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                }
            </main >
        </div >
    )
}