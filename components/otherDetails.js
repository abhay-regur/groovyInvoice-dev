import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import RadioButton from '../components/radioButton';
import FaExclamationCircle from '../assets/icons/FaExclamationCircle.svg';
import FaQuestionCircleOutline from '../assets/icons/faQuestionCircleOutline.svg'
import styles from "../styles/newCustomer.module.scss";
export default function OtherDetails() {
    const [customerTaxPreference, setcustomerTaxPreference] = useState();
    const handleTaxPreferenceTaxable = () => {
        setcustomerTaxPreference('taxable');
    };

    const handleIndividualChangeTaxExempt = () => {
        setcustomerTaxPreference('taxExempt');
    };

    return (<div className={`${styles.tab_content}`}>

        <div className={`${styles.companyInvoiceComapnyGSTTreatmentWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceComapnyGSTTreatmentlabel}`}>GST Treatment <span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select className={`${styles.companyInvoiceComapnyGSTTreatmentSelect} form-select`}>
                    <option defaultValue>Select a GST Treatment</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
            </div>
        </div>

        <div className={`${styles.companyInvoicePANWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoicePANlabel}`}>PAN</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                <input type="text" className="form-control" id="companyInvoicePAN" placeholder='PAN Number' />
                <FaExclamationCircle className={`${styles.green}`} />
            </div>
        </div>

        <div className={`${styles.companyInvoiceComapnyPlaceOfSupplyWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceComapnyPlaceOfSupplylabel}`}>Place Of Supply <span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select className={`${styles.companyInvoiceComapnyPlaceOfSupplySelect} form-select`}>
                    <option defaultValue>Place of Supply</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
            </div>
        </div>

        <div className={`${styles.companyCustomerTaxPreferenceMainWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyComapnyTaxPreferencelabel}`}>Tax Preference<span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <span className={`d-flex `}>
                    <span className={`${styles.customerTaxPreferenceRadioButtonWrapper} d-flex align-items-center`}>
                        <RadioButton
                            label="Taxable"
                            value={customerTaxPreference === 'taxable'}
                            onChange={handleTaxPreferenceTaxable}
                        />
                    </span>
                    <span className={`${styles.customerTaxPreferenceRadioButtonWrapper} d-flex align-items-center`}>
                        <RadioButton
                            label="Tax Exempt"
                            value={customerTaxPreference === 'taxExempt'}
                            onChange={handleIndividualChangeTaxExempt}
                        />
                    </span>
                </span>
            </div>
        </div>

        <div className={`${styles.companyInvoiceExemptionReasonWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceExemptionReasonlabel}`}>Exemption Reason<span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                <select className={`${styles.companyInvoiceExemptionReasonSelect} form-select`}>
                    <option defaultValue>Select or Type to add</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
                <FaQuestionCircleOutline className={`${styles.green}`} />
            </div>
        </div>

        <div className={`${styles.companyInvoiceCurrencyWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceCurrencylabel}`}>Currency</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select className={`${styles.companyInvoiceCurrencySelect} form-select`}>
                    <option defaultValue>INR - Indian Rupee</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
            </div>
        </div>

        <div className={`${styles.companyInvoiceOpeningBalanceWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceOpeningBalanceLabel}`}>Opening Balance</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <div className="input-group">
                    <span className="input-group-text">INR</span>
                    <input type="text" className="form-control" id="companyInvoiceOpeningBalance" placeholder='Opening Balance' />
                </div>
            </div>
        </div>

        <div className={`${styles.companyInvoicePaymentTermsWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoicePaymentTermslabel}`}>Payment Terms</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select className={`${styles.companyInvoicePaymentTermsSelect} form-select`}>
                    <option defaultValue>Due on Receipt</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
            </div>
        </div>
    </div>)
}