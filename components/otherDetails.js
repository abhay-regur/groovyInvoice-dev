import RadioButton from '@/components/radioButton';
import FaExclamationCircle from '@/assets/icons/faExclamationCircle.svg';
import FaQuestionCircleOutline from '@/assets/icons/faQuestionCircleOutline.svg';
import FaPlus from '@/assets/icons/faCirclePlus.svg'
import CustomSelectComponent from './customSelectComponent';
import styles from "@/styles/newCustomer.module.scss";
import { useEffect, useState } from 'react';
import { GST_TREATMENT } from '../constants';
import $ from 'jquery';
export default function OtherDetails({ data, handleInput, handleRadioButtonChange, ErrorList, gstTreatment, paymentTerms, currencies, placeOfSupply, taxExemptionReason, getPaymentTermsDetails, createPaymentTerms, createTaxExemptionReason, getTaxExemptedDetails, setToastList }) {
    const [unregistred, setUnregistred] = useState(false);
    const [overseas, setOverseas] = useState(false);
    const { Modal } = require("bootstrap");
    const [modelFor, setModalFor] = useState('');
    const [paymentTermLabel, setPaymentTermLable] = useState({
        label: "",
        numberOfDays: 0
    });
    const [taxExemptionReasonLable, setTaxExemptionReasonLable] = useState({
        label: ""
    })
    const [modalErrors, setmodalErrors] = useState([]);

    const handleModalInput = ({ target }) => {
        if (modelFor == 'paymentTermId') {
            var temp_data = paymentTermLabel;
            var name = target.name || target.getAttribute('name');
            if (name == 'numberOfDays' || name == 'gstTreatment') {
                if (!Number.isNaN(target.value) && target.value != '') {
                    temp_data[name] = parseInt(target.value)
                } else {
                    temp_data[name] = 0;
                }
            } else {
                temp_data[name] = target.value;
            }
            let temp = Object.assign({}, temp_data)
            setPaymentTermLable(temp);
        } else if (modelFor == 'exemptionReason') {
            var temp_data = taxExemptionReasonLable;
            var name = target.name || target.getAttribute('name');
            temp_data[name] = target.value;
            let temp = Object.assign({}, temp_data)
            setTaxExemptionReasonLable(temp);
        }
    }

    useEffect(() => {
        if ((data.gstTreatment == GST_TREATMENT.UNREGISTERED_BUSINESS || data.gstTreatment == GST_TREATMENT.CONSUMER || data.gstTreatment == GST_TREATMENT.OVERSEAS)) {
            setUnregistred(true);
            setOverseas(false);
            if (data.gstTreatment == GST_TREATMENT.OVERSEAS) {
                setOverseas(true);
            }
        } else {
            setUnregistred(false);
            setOverseas(false);
        }
    }, [data.gstTreatment])

    const showModal = ({ target }) => {
        setModalFor(target.name || target.getAttribute('name'));
        setmodalErrors([]);
        const myModal = new Modal("#updateCustomerModal");
        myModal.show();
    }

    const hideModal = () => {
        setmodalErrors([]);
        setPaymentTermLable({
            label: "",
            numberOfDays: 0
        })
    }

    const handleModalSubmit = async (e) => {
        // e.preventDefault();
        setmodalErrors([]);
        try {
            if (modelFor == 'paymentTermId') {
                var result = await createPaymentTerms(paymentTermLabel);
            } else if (modelFor == 'exemptionReason') {
                var result = await createTaxExemptionReason(taxExemptionReasonLable);
            }

            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'User Details',
                    description: 'New ' + modelFor + ' Added',
                }]);
                $('#updateCustomerModal button.btn-close').trigger('click');
                if (modelFor == 'paymentTermId') {
                    getPaymentTermsDetails();
                } else if (modelFor == 'exemptionReason') {
                    getTaxExemptedDetails();
                }
                ;
            }
        } catch (e) {
            setmodalErrors(e.response.data.message);
        }
    }

    return (<div className={`${styles.tab_content}`}>
        <div className={`${styles.companyInvoiceComapnyGSTTreatmentWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceComapnyGSTTreatmentlabel}`}>GST Treatment <span className={`${styles.green}`}>*</span></label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <CustomSelectComponent className={`${styles.companInvoicePaymentTermsSelect}`} data={gstTreatment} onOptionValueChange={handleInput} optionValue={data.gstTreatment} name={'gstTreatment'} isDisabled={false} defaultText={'Select GST Treatment'} onOptionInnerButtonClick={showModal} isInnerButtonRequired={false} />
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
                    <CustomSelectComponent className={`${styles.companyInvoiceComapnyPlaceOfSupplySelect}`} data={placeOfSupply} onOptionValueChange={handleInput} optionValue={data.placeOfSupply} name={'placeOfSupply'} isDisabled={false} defaultText={'Place of Supply'} isInnerButtonRequired={false} />
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
                    <div className="col-12 col-lg-6 col-xl-6">
                        <div className="row g-0">
                            <div className="col-11">
                                <CustomSelectComponent className={`${styles.companyInvoiceComapnyPlaceOfSupplySelect}`} data={taxExemptionReason} onOptionValueChange={handleInput} optionValue={data.exemptionReason} name={'exemptionReason'} isDisabled={false} defaultText={'Select Tax Exempted'} onOptionInnerButtonClick={showModal} isInnerButtonRequired={true} />
                            </div>
                            <div className="col-1 d-flex align-items-center justify-content-center">
                                <FaQuestionCircleOutline className={`${styles.green}`} />
                            </div>
                        </div>
                    </div>
                </div> :
                ""
        }

        <div className={`${styles.companyInvoiceCurrencyWrapper} mb-4 row`}>
            <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                <label className={`${styles.companyInvoiceCurrencylabel}`}>Currency</label>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <CustomSelectComponent className={`${styles.companyInvoiceCurrencySelect}`} data={currencies} onOptionValueChange={handleInput} optionValue={data.currency} name={'currency'} isDisabled={false} defaultText={'Select a Currency'} canAddButton={false} />
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
                <CustomSelectComponent className={`${styles.companInvoicePaymentTermsSelect}`} data={paymentTerms} onOptionValueChange={handleInput} optionValue={data.paymentTermId} name={'paymentTermId'} isDisabled={false} defaultText={'Select An Option'} onOptionInnerButtonClick={showModal} isInnerButtonRequired={true} />
            </div>
        </div>

        <div
            className={`${styles.companyInvoiceModal} modal`}
            id="updateCustomerModal"
            tabIndex="-1"
            aria-labelledby="updateCustomerModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className={`${styles.companyInvoiceModalHeader} modal-header`}>
                        <h5 className="modal-title"> Add {modelFor == 'exemptionReason' ? 'Exemption Reason' : ''}{modelFor == 'paymentTermId' ? 'Payment Term' : ''}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                    </div>
                    {
                        modelFor == 'paymentTermId'
                            ?
                            <div className="modal-body">
                                <ErrorList errors={modalErrors} />
                                <div className='row'>
                                    <div className="col-12 ">
                                        <div className={`${styles.companyInvoicePaymentTermLabelWrapper} mb-4 row`}>
                                            <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                                <label className={`${styles.companyInvoicePaymentTermLabel}`}>Label</label>
                                            </div>
                                            <div className="col-12 col-lg-6 col-xl-8">
                                                <input name='label' type="text" className="form-control" id="companyInvoicePaymentTermLabel" value={paymentTermLabel.label} onChange={handleModalInput} placeholder='Label' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className={`${styles.companyInvoicePaymentTermDaysWrapper} mb-4 row`}>
                                            <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                                <label className={`${styles.companyInvoicePaymentTermDays}`}>Number of Days</label>
                                            </div>
                                            <div className="col-12 col-lg-6 col-xl-8">
                                                <input name='numberOfDays' type="number" className="form-control" id="companyInvoiceNewCustomerCompanyName" min="0" value={paymentTermLabel.numberOfDays} onChange={handleModalInput} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    {
                        modelFor == 'exemptionReason'
                            ?
                            <div className="modal-body">
                                <ErrorList errors={modalErrors} />
                                <div className='row'>
                                    <div className="col-12 ">
                                        <div className={`${styles.companyInvoicePaymentTermLabelWrapper} mb-4 row`}>
                                            <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                                <label className={`${styles.companyInvoicePaymentTermLabel}`}>Reason</label>
                                            </div>
                                            <div className="col-12 col-lg-6 col-xl-8">
                                                <input name='label' type="text" className="form-control" id="companyInvoiceExemptionReason" value={taxExemptionReasonLable.label} onChange={handleModalInput} placeholder='Reason for Tax Exemption' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-4">
                                <button type='button' name="btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`} onClick={handleModalSubmit}>
                                    <span>
                                        <i><FaPlus /></i>
                                        Add
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>)
}