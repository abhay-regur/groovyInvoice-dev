"use client"
import { useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import InvoiceTable from '../../../../components/invoice/invoiceTable';
import RadioButton from '../../../../components/radioButton';
import styles from "../../../../styles/newInvoice.module.scss";
import FaCalendar from "../../../../assets/icons/faCalendar.svg";
import { NavExpandedState } from '../../../../context/NavState.context';
import FaSave from '../../../../assets/icons/faSave.svg';
import FaPaperPen from '../../../../assets/icons/faPaperPen.svg';
import FaCircleXmark from '../../../../assets/icons/faCircleXmark.svg';
import FaCircleQuestion from '../../../../assets/icons/faCircleQuestion.svg';
import FaGear from '../../../../assets/icons/faGear.svg';
import "react-datepicker/dist/react-datepicker.css";
import { getPaymentTerms } from '../../../../services/paymentTerms.service';
import { getCustomers } from '../../../../services/customer.service';
import CustomSelectComponent from '../../../../components/customSelectComponent';
import { saveInvoice } from '../../../../services/invoice.service';
import ErrorList from '../../../../components/errorList';
import { ToastMsgContext } from '../../../../context/ToastMsg.context';
import { addDaysInDate } from '../../../../common/utils/date.utils';
import DateInputField from '../../../../components/common/dateInputField';
import { enableElement, disableElement } from '../../../../utils/form.utils';

export default function InvoiceAddForm() {
    const [taxValueSelected, settaxValueSelected] = useState();
    const { navExpandedState } = useContext(NavExpandedState);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [errors, setErrors] = useState([]);
    const [customers, setCustomer] = useState([]);
    const initialData = {
        customerId: '',
        invoiceNo: '',
        orderNumber: '',
        invoiceDate: new Date(),
        termsId: '',
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
    }
    const [data, setData] = useState(initialData)

    const calculateTotalAmount = () => {
        let subTotalAmount = 0
        for (let i = 0; i < data.invoiceItems.length; i++) {
            subTotalAmount += data.invoiceItems[i].total
        }
        data.subTotalAmount = subTotalAmount
        data.totalAmount = parseFloat(data.adjustmentAmount) + parseFloat(data.shippingCharges) + parseFloat(data.totalTaxAmount) + parseFloat(data.subTotalAmount);
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const getPaymentTermsDetails = async () => {
        setErrors([]);
        try {
            const result = await getPaymentTerms();
            let temp = [];
            result.data.forEach((data) => {
                temp.push({ Id: parseInt(data.id), name: data.label, numberOfDays: data.numberOfDays })
            });
            setPaymentTerms(temp);
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const handleInput = ({ target }) => {
        let name = target.name || target.getAttribute('name');
        if (name != '') {
            if (['openingBalance', 'gstTreatment', 'customerId', 'termsId', 'subtotalAmount', 'shippingCharges', 'totalTaxAmount', 'adjustmentAmount'].includes(name)) {
                data[name] = parseInt(target.value)
            } else {
                data[name] = target.value;
            }
            let temp = Object.assign({}, data)
            setData(temp)
        }
        calculateTotalAmount()
    }

    const getCustomersList = async () => {
        const result = await getCustomers();
        let temp = [];
        result.data.forEach((elem) => {
            temp.push({ Id: elem.id, name: elem.firstName + " " + elem.lastName })
        });
        setCustomer(temp);
    }

    useEffect(() => {
        getPaymentTermsDetails()
        getCustomersList()
    }, [])

    const handlePaymentTermChange = ({ target }) => {
        let name = target.name || target.getAttribute('name');
        data[name] = parseInt(target.value)
        const paymentTerm = paymentTerms.find((item) => item.Id == parseInt(target.value))
        if (paymentTerm.numberOfDays) {
            const date = addDaysInDate(new Date(), paymentTerm.numberOfDays)
            data['dueDate'] = new Date(date)
        }
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const setDateChange = (value, name) => {
        data[name] = value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleTDSChange = () => {
        settaxValueSelected('tds');
    };

    const handleTCSChange = () => {
        settaxValueSelected('tcs');
    };

    const setItemsData = (itemsData) => {
        data['invoiceItems'] = itemsData
        let temp = Object.assign({}, data)
        setData(temp)
        calculateTotalAmount()
    }

    const handleSubmit = async (e, status) => {
        disableElement(e.target)
        setErrors([])
        try {
            await saveInvoice({ ...data, status })
            setData(initialData)
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Invoice added successfully',
                description: '',
            }]);
        } catch (error) {
            setErrors(error.response.data.message);
        }
        enableElement(e.target)
    }

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    New Invoice
                </h2>
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
                                                name={'customerId'}
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
                                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <DateInputField
                                            label="Invoice Date"
                                            id="companyInvoiceDate"
                                            selected={data.invoiceDate}
                                            onChange={(date)=>setDateChange(date, 'invoiceDate')}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <div className={`${styles.companyInvoicetermsWrapper} mb-3`}>
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
                                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <DateInputField
                                            label="Due Date"
                                            id="companyInvoiceDueDate"
                                            selected={data.dueDate}
                                            onChange={(date)=>setDateChange(date, 'dueDate')}
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
                                                    <div className={`${styles.subtotalresult}`}>Rs. {data.subTotalAmount}</div>
                                                </div>
                                                <div className={`${styles.companyInvoiceTaxOptionWrapper} d-flex align-content-center`}>
                                                    <span className={`${styles.companyInvoiceTaxOptionInputWrapper}`}>
                                                        <span className={`${styles.companyInvoiceTaxSelectorMainWrapper}`}>
                                                            <span className={`${styles.taxTDSRadioButtonWrapper} d-flex align-items-center`}>
                                                                <RadioButton
                                                                    label="TDS"
                                                                    value={taxValueSelected === 'tds'}
                                                                    onChange={handleTDSChange}
                                                                />
                                                            </span>
                                                            <span className={`${styles.taxTCSRadioButtonWrapper} d-flex align-items-center`}>
                                                                <RadioButton
                                                                    label="TCS"
                                                                    value={taxValueSelected === 'tcs'}
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
                                                        <span className='text-start text-lg-right text-xl-left'>- Rs. {data.totalTaxAmount}</span>
                                                    </span>
                                                </div>
                                                <div className={`${styles.companyInvoiceAdjustmentWrapper} d-flex row`}>
                                                    <div className={`${styles.companyInvoiceAdjustmentInputWrapper} col-5 order-1 order-lg-1`}>
                                                        <div className="">
                                                            <input type="text" className={`${styles.companyInvoicePriceAdjustment} form-control`} placeholder="Adjustment" name="adjustmentText" value={data.adjustmentText} onChange={handleInput} />
                                                        </div>
                                                    </div>
                                                    <div className="col-6 order-3 col-lg-4 order-lg-2">
                                                        <div className={`${styles.companyInvoicePriceAdjustment2Wrapper} d-flex`}>
                                                            <input type="number" className={`${styles.companyInvoicePriceAdjustment} form-control`} name="adjustmentAmount" value={data.adjustmentAmount} onChange={handleInput} />
                                                            <i><FaCircleQuestion></FaCircleQuestion></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 col-lg-3 order-2 order-lg-3">
                                                        <span className={`${styles.totalCalculatedAdjustment} d-flex justify-content-end`}>
                                                            <span>- Rs. {data.adjustmentAmount}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className={`${styles.companyInvoiceTotalWrapper} row`}>
                                                    <div className="col-6 d-flex text-start align-items-center">
                                                        <h5>Total</h5>
                                                    </div>
                                                    <div className="col-6 text-center text-sm-end">
                                                        <h5>Rs. {data.totalAmount}</h5>
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
                                    <div className="col-md-12 col-lg-12 col-xl-7 px-1">
                                        <span className={`${styles.companyInvoiceSaveButtonsWrapper}`}>
                                            <button name="btn-submit" className={`${styles.companyInvoiceSaveDraftButton} btn green`} onClick={(e) => handleSubmit(e, 'draft')}>
                                                <span>
                                                    <i><FaPaperPen /></i>
                                                    Save as Draft
                                                </span>
                                            </button>
                                            <button name="btn-submit" className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={(e) => handleSubmit(e, 'unpaid')}>
                                                <span>
                                                    <i><FaSave /></i>
                                                    Save & Send
                                                </span>
                                            </button>
                                        </span>
                                        <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`}>
                                            <span>
                                                <i><FaCircleXmark /></i>
                                                Cancel
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </main>
        </div >
    )
}