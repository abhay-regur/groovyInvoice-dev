import RadioButton from '../components/radioButton';
import FaExclamationCircle from '../assets/icons/faExclamationCircle.svg';
import FaQuestionCircleOutline from '../assets/icons/faQuestionCircleOutline.svg'
import styles from "../styles/newCustomer.module.scss";
import currencyJson from "../assets/json/currency.json";
export default function OtherDetails({ data, handleInput, handleRadioButtonChange }) {


    return (<div className={`${styles.tab_content}`}>

        <div className={`${styles.companyInvoiceComapnyGSTTreatmentWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceComapnyGSTTreatmentlabel}`}>GST Treatment <span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select name='gstTreatment' className={`${styles.companyInvoiceComapnyGSTTreatmentSelect} form-select`} value={data.gstTreatment} onChange={handleInput}>
                    <option defaultValue>Select a GST Treatment</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                </select>
            </div>
        </div>

        <div className={`${styles.companyInvoicePANWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoicePANlabel}`}>PAN</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                <input name='panNumber' type="text" className="form-control" id="companyInvoicePAN" value={data.panNumber} placeholder='PAN Number' onChange={handleInput} />
                <FaExclamationCircle className={`${styles.green}`} />
            </div>
        </div>

        <div className={`${styles.companyInvoiceComapnyPlaceOfSupplyWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceComapnyPlaceOfSupplylabel}`}>Place Of Supply <span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select name='placeOfSupply' className={`${styles.companyInvoiceComapnyPlaceOfSupplySelect} form-select`} value={data.placeOfSupply} onChange={handleInput}>
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
                            group="taxPreference"
                            label="Taxable"
                            value={(data.taxPreference).toLowerCase() === 'taxable'}
                            onChange={handleRadioButtonChange}
                        />
                    </span>
                    <span className={`${styles.customerTaxPreferenceRadioButtonWrapper} d-flex align-items-center`}>
                        <RadioButton
                            group="taxPreference"
                            label="Tax Exempt"
                            value={(data.taxPreference).toLowerCase() === 'tax exempt'}
                            onChange={handleRadioButtonChange}
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
                <select name='exemptionReason' className={`${styles.companyInvoiceExemptionReasonSelect} form-select`} value={data.exemptionReason} onChange={handleInput}>
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
                <select name="currency" className={`${styles.companyInvoiceCurrencySelect} form-select`} value={data.currency} onChange={handleInput}>
                    <option value="" disabled defaultValue>Select a Currency</option>
                    {currencyJson.map((obj, key) => {
                        return (<option key={key} value={obj.Code}>{obj.CountryName} - {obj.Symbol}</option>)
                    })}
                    {/* <option value="INR">₹ - Indian Rupee</option>
                    <option value="USD">$ - US Dollar</option>
                    <option value="EUR">€ - Euro</option>
                    <option value="GBP">£ - British Pound</option>
                    <option value="JPY">¥ - Japanese Yen</option>
                    <option value="AUD">$ - Australian Dollar</option>
                    <option value="CAD">$ - Canadian Dollar</option>
                    <option value="CHF">Fr - Swiss Franc</option>
                    <option value="CNY">¥ - Chinese Yuan</option>
                    <option value="HKD">$ - Hong Kong Dollar</option>
                    <option value="NZD">$ - New Zealand Dollar</option>
                    <option value="SGD">$ - Singapore Dollar</option> */}
                </select>
            </div>
        </div>

        <div className={`${styles.companyInvoiceOpeningBalanceWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceOpeningBalanceLabel}`}>Opening Balance</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <div className="input-group">
                    <span className="input-group-text">{data.currency.toUpperCase()}</span>
                    <input name='openingBalance' type="number" className="form-control" id="companyInvoiceOpeningBalance" value={data.openingBalance} placeholder='Opening Balance' onChange={handleInput} />
                </div>
            </div>
        </div>

        <div className={`${styles.companyInvoicePaymentTermsWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoicePaymentTermslabel}`}>Payment Terms</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select name='paymentTerm' className={`${styles.companyInvoicePaymentTermsSelect} form-select`} value={data.paymentTerm} onChange={handleInput}>
                    <option defaultValue>Due on Receipt</option>
                    <option value="pia">PIA</option>
                    <option value="net10">Net 10</option>
                    <option value="net30">Net 30</option>
                    <option value="net60">Net 60</option>
                    <option value="net90">Net 90</option>
                    <option value="eom">EOM</option>
                    <option value="21mfi">21 MFI</option>
                </select>
            </div>
        </div>
    </div>)
}