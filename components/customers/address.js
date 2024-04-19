import React, { useState, useEffect } from "react";
import styles from "@/styles/newCustomer.module.scss";
import FaCopy from "@/assets/icons/faCopy.svg";
import CustomSelectComponent from "../common/customSelectComponent";
import { getStates, getCountries } from "@/services/countriesState.service";

const AddressComponent = ({ data, handleInput, label, disabled = false, handleCopyClick }) => {
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);

    const getStateData = async () => {
        const result = await getStates(data.countryId);
        var temp = [];
        result.data.forEach((elem) => {
            temp.push({ Id: elem.id, name: elem.name })
        })
        setStates(temp);
    }

    const getCountriesList = async () => {
        const result = await getCountries();
        var temp = [];
        result.data.forEach((elem) => {
            temp.push({ Id: elem.id, name: elem.name })
        })
        setCountries(temp);
    }

    useEffect(() => {
        if (data.countryId) {
            getStateData()
        }
    }, [data.countryId])

    useEffect(() => {
        getCountriesList()
    }, [])

    return (
        <>
            <div className="col-12 col-lg-6 mt-lg-0 mt-4">
                <div className="row">
                    <div className="col-6">
                        <h3 className={`${styles.tabtitle}`}>{label}</h3>
                    </div>
                    <div className="col-6">
                        {label == "Shipping Address" ?
                            <div className={`${styles.companyInvoiceShippingCopyBillingWrapper} d-flex align-content-center justify-content-start justify-content-md-end mb-3`} onClick={handleCopyClick} >
                                <i><FaCopy /></i> <span>Copy Billing Address</span>
                            </div>
                            : ''

                        }
                    </div>

                </div>

                <div className={`${styles.companyInvoiceBillingAttentionWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAttentionlabel}`}>Attention</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" name="attention" className="form-control" id="companyInvoiceBillingAttention" value={data.attention} onChange={(e) => handleInput(e, data)} placeholder='Attention' disabled={disabled} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyCountryWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyCountrylabel}`}>Country / Region</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <CustomSelectComponent className={`${styles.companyInvoiceBillingComapnyCountrySelect}`} data={countries} onOptionValueChange={(e) => handleInput(e, data)} optionValue={data.countryId} hasSearch={true} name={'countryId'} isDisabled={disabled} defaultText={'Select A Country'} isInnerButtonRequired={false} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingAddressWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAddresslabel}`}>Address</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea name="addressLine1" id="companyInvoiceBillingAddress1" rows="3" value={data.addressLine1} onChange={(e) => handleInput(e, data)} placeholder='Address Line 1' disabled={disabled}></textarea>
                    </div>
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-8">
                        <textarea className='mb-0' name="addressLine2" id="companyInvoiceBillingAddress2" rows="3" value={data.addressLine2} onChange={(e) => handleInput(e, data)} placeholder='Address Line 2' disabled={disabled}></textarea>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingCityWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingCitylabel}`}>City</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="city" type="text" className="form-control" id="companyInvoiceBillingCity" value={data.city} onChange={(e) => handleInput(e, data)} placeholder='City' disabled={disabled} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyStateWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyStatelabel}`}>State</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <CustomSelectComponent className={`${styles.companyInvoiceBillingComapnyStateSelect}`} data={states} onOptionValueChange={(e) => handleInput(e, data)} optionValue={data.stateId} hasSearch={true} name={'billingStateId'} isDisabled={disabled} defaultText={'Select A State'} isInnerButtonRequired={false} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingZIPCodeWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingZIPCodelabel}`}>ZIP Code</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="zipCode" type="text" className="form-control" id="companyInvoiceBillingZIPCode" value={data.zipCode} onChange={(e) => handleInput(e, data)} placeholder='ZIP Code' disabled={disabled} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingPhoneWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingPhonelabel}`}>Phone</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="phone" type="tel" minLength={4} maxLength={13} className="form-control" id="companyInvoiceBillingPhone" value={data.phone} onChange={(e) => handleInput(e, data)} placeholder='Phone Number' disabled={disabled} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingFaxWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingFaxlabel}`}>Fax</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="fax" type="text" className="form-control" id="companyInvoiceBillingFax" value={data.fax} onChange={(e) => handleInput(e, data)} placeholder='Fax Number' disabled={disabled} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Address({ data, setData }) {
    const [addressCopied, setAddressCopied] = useState(false);

    const handleBillingInput = (event, currentData) => {
        var name = event.target.name || event.target.getAttribute('name');
        if (name != '') {
            if (name.search('billingStateId') > -1) {
                currentData['stateId'] = parseInt(event.target.value);
                if (addressCopied) {
                    data.shippingAddress['stateId'] = parseInt(event.target.value);
                }
            } else if (name.search('countryId') > -1) {
                currentData['countryId'] = parseInt(event.target.value);
                if (addressCopied) {
                    data.shippingAddress['countryId'] = parseInt(event.target.value);
                }
            } else if (name == 'phone') {
                currentData[name] = (event.target.value == '' ? '' : (event.target.value).match(/[0-9]+/g)[0]);
                if (addressCopied) {
                    data.shippingAddress[name] = (event.target.value == '' ? '' : (event.target.value).match(/[0-9]+/g)[0]);
                }
            } else {
                currentData[name] = event.target.value;
                if (addressCopied) {
                    data.shippingAddress[name] = event.target.value;
                }
            }
            let temp = Object.assign({}, data);
            setData(temp);
        }
    }

    const handleShippingInput = ({ target }) => {
        var name = target.name || target.getAttribute('name');
        if (name != '' && !addressCopied) {
            if (name.search('shippingStateId') > -1) {
                data.shippingAddress['stateId'] = parseInt(target.value);
            } else if (name == 'phone') {
                data.shippingAddress[name] = (target.value == '' ? '' : (target.value).match(/[0-9]+/g)[0]);
            } else {
                data.shippingAddress[name] = target.value;
            }
            let temp = Object.assign({}, data)
            setData(temp)
        }
    }

    const handleCopyClick = () => {
        data['shippingAddress'] = { ...data.billingAddress, type: 'shipping-address' };
        let temp = Object.assign({}, data);
        setAddressCopied(true);
        setData(temp);
    }

    return (
        <div className={`${styles.tab_content}`}>
            <div className="row">
                <AddressComponent
                    data={data.billingAddress}
                    handleInput={handleBillingInput}
                    label="Billing Address"
                    disabled={false}
                />
                <AddressComponent
                    data={data.shippingAddress}
                    handleInput={handleShippingInput}
                    label="Shipping Address"
                    disabled={addressCopied}
                    handleCopyClick={handleCopyClick}
                />
            </div>
        </div>
    )
}