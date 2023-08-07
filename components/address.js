import styles from "../styles/newCustomer.module.scss";
import FaCopy from "../assets/icons/faCopy.svg";
import SelectComponent from './selectComponent';
import ErrorList from './errorList';
import { useState } from 'react';

export default function Address({ countries, billingstates, shippingstates, shippingstatesCountryId, setShippingStatesCountryId, billingstatesCountryId, setBillingStatesCountryId, data, setData, errors }) {
    const [addressCopied, setAddressCopied] = useState(false);

    const handleBillingInput = ({ target }) => {
        var temp_data = data;
        if (target.name != '') {
            if (target.name.search('billingStateId') > -1) {
                temp_data.address.billingAddress[target.id] = parseInt(target.value);
                if (addressCopied) {
                    temp_data.address.shippingAddress[target.id] = parseInt(target.value);
                }
            } else {
                temp_data.address.billingAddress[target.name] = target.value;
                if (addressCopied) {
                    temp_data.address.shippingAddress[target.name] = target.value;
                }
            }
            let temp = Object.assign({}, temp_data);
            setData(temp);
        }
    }

    const handleShippingInput = ({ target }) => {
        var temp_data = data;
        if (target.name != '' && !addressCopied) {
            if (target.name.search('shippingStateId') > -1) {
                temp_data.address.shippingAddress[target.id] = parseInt(target.value);
            } else {
                temp_data.address.shippingAddress[target.name] = target.value;
            }
            let temp = Object.assign({}, temp_data)
            setData(temp)
        }
    }

    const handleCopyClick = () => {
        var temp_data = data;
        setShippingStatesCountryId(parseInt(billingstatesCountryId));
        temp_data.address.shippingAddress = temp_data.address.billingAddress;
        let temp = Object.assign({}, temp_data);
        setAddressCopied(true);
        setData(temp);

    }

    const handelSelectInput = ({ target }) => {
        var temp_data = data;
        if (target.name.search('billingCountryId') > -1) {
            setBillingStatesCountryId(parseInt(target.value));
            temp_data.address.billingAddress[target.id] = parseInt(target.value);
            if (addressCopied) {
                setShippingStatesCountryId(parseInt(target.value));
                temp_data.address.shippingAddress[target.id] = parseInt(target.value);
            }
        } else if (target.name.search('shippingCountryId') > -1) {
            setShippingStatesCountryId(parseInt(target.value));
            temp_data.address.shippingAddress[target.id] = parseInt(target.value);
        }
        let temp = Object.assign({}, temp_data)
        setData(temp);
    }

    return (<div className={`${styles.tab_content}`}>
        <div className="row">
            <div className="col-12 col-lg-6">
                <h3 className={`${styles.tabtitle}`}>Billing Address</h3>
                <ErrorList errors={errors} />
                <div className={`${styles.companyInvoiceBillingAttentionWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAttentionlabel}`}>Attention</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" name="attention" className="form-control" id="companyInvoiceBillingAttention" value={data.address.billingAddress.attention} onChange={handleBillingInput} placeholder='Attention' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyCountryWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyCountrylabel}`}>Country / Region</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <SelectComponent id={'countryId'} data={countries} setSeletedId={handelSelectInput} seletedId={billingstatesCountryId} name={'billingCountryId'} defaultText={'Select A Country'} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingAddressWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAddresslabel}`}>Address</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea name="addressLine1" id="companyInvoiceBillingAddress1" rows="3" value={data.address.billingAddress.addressLine1} onChange={handleBillingInput} placeholder='Address Line 1'></textarea>
                    </div>
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-8">
                        <textarea className='mb-0' name="addressLine2" id="companyInvoiceBillingAddress2" rows="3" value={data.address.billingAddress.addressLine2} onChange={handleBillingInput} placeholder='Address Line 2'></textarea>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingCityWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingCitylabel}`}>City</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="city" type="text" className="form-control" id="companyInvoiceBillingCity" value={data.address.billingAddress.city} onChange={handleBillingInput} placeholder='City' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyStateWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyStatelabel}`}>State</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <SelectComponent id={"stateId"} data={billingstates} setSeletedId={handleBillingInput} seletedId={data.address.billingAddress.stateId} name={'billingStateId'} defaultText={'Select A State'} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingZIPCodeWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingZIPCodelabel}`}>ZIP Code</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="zipCode" type="text" className="form-control" id="companyInvoiceBillingZIPCode" value={data.address.billingAddress.zipCode} onChange={handleBillingInput} placeholder='ZIP Code' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingPhoneWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingPhonelabel}`}>Phone</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="phone" type="text" className="form-control" id="companyInvoiceBillingPhone" value={data.address.billingAddress.phone} onChange={handleBillingInput} placeholder='Phone Number' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingFaxWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingFaxlabel}`}>Fax</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="fax" type="text" className="form-control" id="companyInvoiceBillingFax" value={data.address.billingAddress.fax} onChange={handleBillingInput} placeholder='Fax Number' />
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 mt-lg-0 mt-4">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3 className={`${styles.tabtitle}`}>Shipping Address</h3>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={`${styles.companyInvoiceShippingCopyBillingWrapper} d-flex align-content-center justify-content-start justify-content-md-end`} onClick={handleCopyClick} >
                            <i><FaCopy /></i>
                            <span>Copy Billing Address</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingAttentionWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingAttentionlabel}`}>Attention</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="attention" type="text" className="form-control" id="companyInvoiceShippingAttention" value={data.address.shippingAddress.attention} onChange={handleShippingInput} placeholder='Attention' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingComapnyCountryWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingComapnyCountrylabel}`}>Country / Region</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <SelectComponent id={'countryId'} data={countries} setSeletedId={handelSelectInput} seletedId={shippingstatesCountryId} name={'shippingCountryId'} isDisabled={addressCopied} defaultText={'Select A Country'} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingAddressWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingAddresslabel}`}>Address</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea name="addressLine1" id="companyInvoiceShippingAddress1" rows="3" onChange={handleShippingInput} value={data.address.shippingAddress.addressLine1} placeholder='Address Line 1' disabled={addressCopied}></textarea>
                    </div>
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-8">
                        <textarea className='mb-0' name="addressLine2" id="companyInvoiceShippingAddress2" rows="3" onChange={handleShippingInput} value={data.address.shippingAddress.addressLine2} placeholder='Address Line 2' disabled={addressCopied}></textarea>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingCityWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingCitylabel}`}>City</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="city" type="text" className="form-control" id="companyInvoiceShippingCity" onChange={handleShippingInput} value={data.address.shippingAddress.city} placeholder='City' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingComapnyStateWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingComapnyStatelabel}`}>State</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <SelectComponent id={"stateId"} data={shippingstates} setSeletedId={handleShippingInput} seletedId={data.address.shippingAddress.stateId} name={'shippingStateId'} isDisabled={addressCopied} defaultText={'Select A State'} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingZIPCodeWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingZIPCodelabel}`}>ZIP Code</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="zipCode" type="text" className="form-control" id="companyInvoiceShippingZIPCode" onChange={handleShippingInput} value={data.address.shippingAddress.zipCode} placeholder='ZIP Code' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingPhoneWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingPhonelabel}`}>Phone</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="phone" type="text" className="form-control" id="companyInvoiceShippingPhone" onChange={handleShippingInput} value={data.address.shippingAddress.phone} placeholder='Phone Number' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingFaxWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingFaxlabel}`}>Fax</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="fax" type="text" className="form-control" id="companyInvoiceShippingFax" onChange={handleShippingInput} value={data.address.shippingAddress.fax} placeholder='Fax Number' disabled={addressCopied} />
                    </div>
                </div>

            </div>
        </div>
    </div>)
}