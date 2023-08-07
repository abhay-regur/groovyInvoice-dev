import RadioButton from '../components/radioButton';
import FaExclamationCircle from '../assets/icons/faExclamationCircle.svg';
import FaQuestionCircleOutline from '../assets/icons/faQuestionCircleOutline.svg';
import SelectOptionComponent from './selectComponent';
import styles from "../styles/newCustomer.module.scss";
import { useEffect, useState } from 'react';
export default function OtherDetails({ data, handleInput, handleRadioButtonChange, gstTreatment, currencies, placeOfSupply }) {
    const [unregistred, setUnregistred] = useState(false);
    const [overseas, setOverseas] = useState(false);

    const paymentTermData = [
        {
            id: 'pia',
            name: 'PIA'
        },
        {
            id: 'net10',
            name: 'Net 10'
        },
        {
            id: 'net30',
            name: 'Net 30'
        },
        {
            id: 'net60',
            name: 'Net 60'
        },
        {
            id: 'net90',
            name: 'Net 90'
        },
        {
            id: 'eom',
            name: 'EOM'
        },
        {
            id: '21mfi',
            name: '21 MFI'
        }
    ];

    useEffect(() => {
        if ((data.gstTreatment == '3' || data.gstTreatment == '4' || data.gstTreatment == '5')) {
            setUnregistred(true);
            if (data.gstTreatment == '5') {
                setOverseas(true);
            }
        } else {
            setUnregistred(false);
            setOverseas(false);
        }
    }, [data.gstTreatment])


    return (<div className={`${styles.tab_content}`}>
        <div className={`${styles.companyInvoiceComapnyGSTTreatmentWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceComapnyGSTTreatmentlabel}`}>GST Treatment <span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <SelectOptionComponent className={`${styles.companyInvoiceComapnyGSTTreatmentSelect}`} data={gstTreatment} setSeletedId={handleInput} seletedId={data.gstTreatment} name={'gstTreatment'} isDisabled={false} defaultText={'Select a GST Treatment'} />
            </div>
        </div>
        {
            unregistred ?
                '' :
                <div className={`${styles.companyInvoiceGSTINWrapper} mb-4 row`}>
                    <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceGSTINlabel}`}>GSTIN/UIN<span className={`${styles.green}`}>*</span></label>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                        <input name='GSTIN' type="text" className="form-control" id="companyInvoicePAN" value={data.GSTIN} placeholder='GSTIN/UIN' onChange={handleInput} />
                    </div>
                </div>
        }

        <div className={`${styles.companyInvoicePANWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoicePANlabel}`}>PAN</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                <input name='panNumber' type="text" className="form-control" id="companyInvoicePAN" value={data.panNumber} placeholder='PAN Number' onChange={handleInput} />
                <FaExclamationCircle className={`${styles.green}`} />
            </div>
        </div>

        {overseas ?
            '' :
            <div className={`${styles.companyInvoiceComapnyPlaceOfSupplyWrapper} mb-4 row`}>
                <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                    <label className={`${styles.companyInvoiceComapnyPlaceOfSupplylabel}`}>Place Of Supply <span className={`${styles.green}`}>*</span></label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                    <SelectOptionComponent className={`${styles.companyInvoiceComapnyPlaceOfSupplySelect}`} data={placeOfSupply} setSeletedId={handleInput} seletedId={data.placeOfSupply} name={'placeOfSupply'} isDisabled={false} defaultText={'Place of Supply'} />
                </div>
            </div>
        }

        {overseas ?
            '' :
            <div className={`${styles.companyCustomerTaxPreferenceMainWrapper} mb-4 row`}>
                <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                    <label className={`${styles.companyComapnyTaxPreferencelabel}`}>Tax Preference<span className={`${styles.green}`}>*</span></label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                    <span className={`d-flex `}>
                        <span className={`${styles.customerTaxPreferenceRadioButtonWrapper} d-flex align-items-center`}>
                            <RadioButton
                                group="taxPreference"
                                name="taxable"
                                label="Taxable"
                                value={(data.taxPreference).toLowerCase() === 'taxable'}
                                onChange={handleRadioButtonChange}
                            />
                        </span>
                        <span className={`${styles.customerTaxPreferenceRadioButtonWrapper} d-flex align-items-center`}>
                            <RadioButton
                                group="taxPreference"
                                name="tax-exempt"
                                label="Tax Exempt"
                                value={(data.taxPreference).toLowerCase() === 'tax-exempt'}
                                onChange={handleRadioButtonChange}
                            />
                        </span>
                    </span>
                </div>
            </div>
        }

        {
            ((data.taxPreference).toLowerCase() === 'tax-exempt') ?
                <div className={`${styles.companyInvoiceExemptionReasonWrapper} mb-4 row`}>
                    <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceExemptionReasonlabel}`}>Exemption Reason<span className={`${styles.green}`}>*</span></label>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                        <select name='exemptionReason' className={`${styles.companyInvoiceExemptionReasonSelect} form-select`} value={data.exemptionReason} onChange={handleInput}>
                            <option defaultValue disabled>Select or Type to add</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                        <FaQuestionCircleOutline className={`${styles.green}`} />
                    </div>
                </div> :
                ""
        }


        <div className={`${styles.companyInvoiceCurrencyWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceCurrencylabel}`}>Currency</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <select name="currency" className={`${styles.companyInvoiceCurrencySelect} form-select`} value={data.currency} onChange={handleInput}>
                    <option value="" disabled defaultValue>Select a Currency</option>
                    {currencies.map((obj, key) => {
                        return (<option key={key} value={obj.symbol}> {obj.symbol} - {obj.name}</option>)
                    })}
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
                <SelectOptionComponent className={`${styles.companyInvoicePaymentTermsSelect}`} data={paymentTermData} setSeletedId={handleInput} seletedId={data.paymentTerm} name={'paymentTerm'} isDisabled={false} defaultText={'Due on Receipt'} />
            </div>
        </div>
    </div>)
}