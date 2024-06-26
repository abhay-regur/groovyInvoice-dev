import React, { useState, useEffect, useContext } from "react";
import InvoiceTable from '@/components/invoice/invoiceTable';
import RadioButton from '@/components/radioButton';
import styles from "@/styles/newInvoice.module.scss";
import FaSave from '@/assets/icons/faSave.svg';
import FaPaperPen from '@/assets/icons/faPaperPen.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaCircleQuestion from '@/assets/icons/faCircleQuestion.svg';
import FaGear from '@/assets/icons/faGear.svg';
import "react-datepicker/dist/react-datepicker.css";
import CustomSelectComponent from '@/components/common/customSelectComponent';
import ErrorList from '@/components/errorList';
import DateInputField from '@/components/common/dateInputField';
import { useCurrentUserData } from '@/context/CurrentUserData.context';
import { getCustomer, getCustomers } from '@/services/customer.service';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { getPaymentTerms } from "@/services/paymentTerms.service";
import InvoiceNumberSettingsPopup from '@/components/settings/invoiceNumberSettingsPopup';
import { getInvoiceNumberSetting } from "@/services/invoice-number-setting.service";
import { getCurrencyById } from "@/services/common/general.service";
import { addDaysInDate } from "@/utils/date.utils";
import { useRouter } from 'next/navigation';

const InvoiceForm = ({ data, setData, handleSubmit, errors, setErrors, mode }) => {
  const [taxValueSelected, settaxValueSelected] = useState();
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [customers, setCustomer] = useState([]);
  const { userInfo } = useCurrentUserData();
  const { setToastList } = useContext(ToastMsgContext);
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const { replace } = useRouter();
  const { Modal } = require("bootstrap");

  const handleTDSChange = () => {
    settaxValueSelected('tds');
  };

  const handleTCSChange = () => {
    settaxValueSelected('tcs');
  };

  const handlePaymentTermChange = (value) => {
    if (value) {
      data['termsId'] = parseInt(value)
      const paymentTerm = paymentTerms.find((item) => item.Id == parseInt(value))
      const date = addDaysInDate(new Date(), paymentTerm.numberOfDays)
      data['dueDate'] = new Date(date)
      let temp = Object.assign({}, data)
      setData(temp)
    }
  }

  const handleCustomerChange = async ({ target }) => {
    data['customerId'] = parseInt(target.value)
    let temp = Object.assign({}, data)
    setData(temp)
    const result = await getCustomer(data.customerId)
    handlePaymentTermChange(result.data.paymentTermId)
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

  const getCurrencySymbol = async () => {
    try {
      if (data.customerId != "" && data.customerId != null) {
        const result = await getCustomer(data.customerId)
        const selectCurrencyDetails = await getCurrencyById(result.data.currencyId);
        if (selectCurrencyDetails.status == 200) setCurrencySymbol(selectCurrencyDetails.data.symbol);
      }
    } catch (error) {
      setErrors(genrateErrorMessage(error, '', setToastList));
    }
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
  }

  const setDateChange = (value, name) => {
    data[name] = value
    let temp = Object.assign({}, data)
    setData(temp)
  }

  const openInvoiceNumberSettingsPopup = () => {
    if (mode == 'add') {
      const invoiceNumberSettings = new Modal("#invoice-number-settings");
      invoiceNumberSettings.show();
    }
  }

  useEffect(() => {
    if (data.customerId) {
      getCurrencySymbol()
    }
  }, [data.customerId])

  useEffect(() => {
    getCustomersList();
    getPaymentTermsDetails();
    if (mode == 'add') {
      getInvoiceNumber();
    }
  }, [])

  const getInvoiceNumber = async () => {
    const result = await getInvoiceNumberSetting()
    if (result.data.auto_generate) {
      data['invoiceNo'] = result.data.prefix_string + result.data.next_number
    } else {
      data['invoiceNo'] = ''
    }
    let temp = Object.assign({}, data)
    setData(temp)
  }

  return (
    <>
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
                      onOptionValueChange={handleCustomerChange}
                      optionValue={data.customerId}
                      name={'customerId'}
                      isDisabled={mode == 'edit' ? true : false}
                      defaultText={'Select An Option'}
                      isInnerButtonRequired={false}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className={`${styles.companyInvoiceNumberWrapper} mb-3`}>
                    <label htmlFor="companyInvoiceNumber" className="form-label">Invoice#<span className={`${styles.green}`}>*</span></label>
                    <div className={`d-flex align-content-center`}>
                      <input type="text" className="form-control" id="companyInvoiceNumber" aria-describedby="InvoiceNumber" name="invoiceNo" value={data.invoiceNo} onChange={handleInput} disabled={mode == 'edit' ? true : false} />
                      <i className={mode == 'edit' ? 'disabled' : ''} onClick={openInvoiceNumberSettingsPopup}><FaGear /></i>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className={`${styles.companyOrderNumberWrapper} mb-3`}>
                    <label htmlFor="companyOrderNumber" className="form-label">Order Number</label>
                    <div className={`d-flex align-content-center`}>
                      <input type="text" className="form-control" id="companyOrderNumber" aria-describedby="orderNumber" name="orderNumber" value={data.orderNumber} onChange={handleInput} disabled={mode == 'edit' ? true : false} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-5 col-md-6 col-lg-3 col-xl-3">
                  <DateInputField
                    label="Invoice Date"
                    id="companyInvoiceDate"
                    selected={data.invoiceDate}
                    onChange={(date) => setDateChange(date, 'invoiceDate')}
                    dateFormat={userInfo.datePref}
                  />
                </div>
                <div className="col-12 col-sm-5 col-md-6 col-lg-3">
                  <div className={`${styles.companyInvoicetermsWrapper} mb-3 mt-0`}>
                    <label htmlFor="companyInvoiceterms" className="form-label">Terms</label>
                    <CustomSelectComponent
                      className={`${styles.companInvoicePaymentTermsSelect}`}
                      inputClass="form-control"
                      data={paymentTerms}
                      onOptionValueChange={(e) => handlePaymentTermChange(e.target.value)}
                      optionValue={data.termsId}
                      name={'termsId'}
                      isDisabled={false}
                      defaultText={'Select An Option'}
                      isInnerButtonRequired={false}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-5 col-md-6 col-lg-3 col-xl-3">
                  <DateInputField
                    label="Due Date"
                    id="companyInvoiceDueDate"
                    selected={data.dueDate}
                    onChange={(date) => setDateChange(date, 'dueDate')}
                    dateFormat={userInfo.datePref}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className={`${styles.companyInvoiceItemsTableMainWrapper} row`}>
              <InvoiceTable itemsData={data.invoiceItems} setItemsData={setItemsData} currencySymbol={currencySymbol} />
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
                  <div className={`${styles.card} card justify-content-between p-0`} >
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className={`${styles.subtotalLabel}`}>Sub Total</div>
                        <div className={`${styles.subtotalresult}`}>{currencySymbol} {parseFloat(data.subTotalAmount).toFixed(2)}</div>
                      </div>
                      <div className={`${styles.companyInvoiceTaxOptionWrapper} row`}>
                        <div className="col-7">
                          <div className={`${styles.companyInvoiceTaxOptionInputWrapper} d-block`}>
                            <div className={`${styles.companyInvoiceTaxSelectorMainWrapper}`}>
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
                            </div>
                            <div className={`${styles.taxTypeSelectWrapper} mt-2`}>
                              <CustomSelectComponent
                                className={`${styles.taxTypeSelect}`}
                                inputClass="form-control"
                                data={[
                                  {
                                    "Id": 1,
                                    "name": "One"
                                  },
                                  {
                                    "Id": 2,
                                    "name": "Two"
                                  }
                                ]}
                                onOptionValueChange={(e) => { console.log(e) }}
                                optionValue={""}
                                name={'taxType'}
                                isDisabled={false}
                                defaultText={'Select Tax'}
                                isInnerButtonRequired={false}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-5">
                          <span className={`${styles.totalCalculatedTax} d-flex`}>
                            <span className='text-start text-lg-right text-xl-left'> {currencySymbol} {parseFloat(data.totalTaxAmount).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                      <div className={`${styles.companyInvoiceAdjustmentWrapper} d-flex row`}>
                        <div className={`${styles.companyInvoiceAdjustmentInputWrapper} col-8 col-lg-4 order-1 order-lg-1 mb-3`}>
                          <input type="text" className={`${styles.companyInvoicePriceAdjustment} form-control`} placeholder="Adjustment" name="adjustmentText" value={data.adjustmentText} onChange={handleInput} />
                        </div>
                        <div className="col-9 order-3 col-lg-5 order-lg-2">
                          <div className={`${styles.companyInvoicePriceAdjustment2Wrapper} d-flex`}>
                            <input type="number" step="0.01" className={`${styles.companyInvoicePriceAdjustment} form-control`} name="adjustmentAmount" value={data.adjustmentAmount} onChange={handleInput} />
                            <i><FaCircleQuestion></FaCircleQuestion></i>
                          </div>
                        </div>
                        <div className="col-4 col-lg-3 order-2 order-lg-3">
                          <span className={`${styles.totalCalculatedAdjustment} d-flex justify-content-end`}>
                            <span> {currencySymbol} {parseFloat(data.adjustmentAmount).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div className={`${styles.companyInvoiceTotalWrapper} row`}>
                        <div className="col-6 d-flex text-start align-items-center">
                          <h5>Total</h5>
                        </div>
                        <div className="col-6 text-center text-sm-end">
                          <h5>{currencySymbol} {parseFloat(data.totalAmount).toFixed(2)}</h5>
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
                <div className={`${styles.companyInvoiceButtonsWrapper}`}>
                  <div className={`${styles.companyInvoiceSubmitButtonsWrapper} col-12 row gap-3`}>
                    <button name="btn-submit" className={`${styles.companyInvoiceSaveDraftButton} green`} onClick={(e) => handleSubmit(e, 'draft')}>
                      <span>
                        <i><FaPaperPen /></i>
                        Save as Draft
                      </span>
                    </button>
                    <button name="btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`} onClick={(e) => handleSubmit(e, 'unpaid')}>
                      <span>
                        <i><FaSave /></i>
                        Save & Send
                      </span>
                    </button>
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
        </div >
      </div >
      <InvoiceNumberSettingsPopup getInvoiceNumber={getInvoiceNumber} />
    </>
  )
}

export default InvoiceForm;
