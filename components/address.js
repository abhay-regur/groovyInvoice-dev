import styles from "../styles/newCustomer.module.scss";
import FaCopy from "../assets/icons/faCopy.svg";
import SelectComponent from './selectComponent';
import { useState } from 'react';

export default function Address({ countries, billingstates, shippingstates, addressBillingData, setAddressBillingData, addressShippingData, setAddressShippingData }) {
    const [addressCopied, setAddressCopied] = useState(false);

    const handleBillingInput = ({ target }) => {
        if (target.name != '') {
            if (target.name == 'countryId' || target.name == 'stateId') {
                addressBillingData[target.name] = parseInt(target.value)
            } else {
                addressBillingData[target.name] = target.value
            }
            let temp = Object.assign({}, addressBillingData);
            setAddressBillingData(temp);
            if (addressCopied) {
                setAddressShippingData(temp);
            }
        }
    }

    const handleShippingInput = ({ target }) => {
        if (target.name != '') {
            if (target.name == 'countryId' || target.name == 'stateId') {
                addressShippingData[target.name] = parseInt(target.value)
            } else {
                addressShippingData[target.name] = target.value
            }
            let temp = Object.assign({}, addressShippingData)
            setAddressShippingData(temp)
        }
    }

    const handleCopyClick = () => {
        console.log('clicked');
        console.log(typeof jQuery);
        let temp = Object.assign({}, addressBillingData);
        setAddressCopied(true);
        setAddressShippingData(temp);
    }


    return (<div className={`${styles.tab_content}`}>
        <div className="row">
            <div className="col-12 col-lg-6">
                <h3 className={`${styles.tabtitle}`}>Billing Address</h3>

                <div className={`${styles.companyInvoiceBillingAttentionWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAttentionlabel}`}>Attention</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" name="attention" className="form-control" id="companyInvoiceBillingAttention" value={addressBillingData.attention} onChange={handleBillingInput} placeholder='Attention' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyCountryWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyCountrylabel}`}>Country / Region</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <SelectComponent data={countries} setSeletedId={handleBillingInput} seletedId={addressBillingData.countryId} name={'countryId'} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingAddressWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAddresslabel}`}>Address</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea name="addressLine1" id="companyInvoiceBillingAddress1" rows="3" value={addressBillingData.addressLine1} onChange={handleBillingInput} placeholder='Address Line 1'></textarea>
                    </div>
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-8">
                        <textarea className='mb-0' name="addressLine2" id="companyInvoiceBillingAddress2" rows="3" value={addressBillingData.addressLine2} onChange={handleBillingInput} placeholder='Address Line 2'></textarea>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingCityWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingCitylabel}`}>City</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="city" type="text" className="form-control" id="companyInvoiceBillingCity" value={addressBillingData.city} onChange={handleBillingInput} placeholder='City' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyStateWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyStatelabel}`}>State</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <SelectComponent data={billingstates} setSeletedId={handleBillingInput} seletedId={addressBillingData.stateId} name={'stateId'} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingZIPCodeWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingZIPCodelabel}`}>ZIP Code</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="zipCode" type="text" className="form-control" id="companyInvoiceBillingZIPCode" value={addressBillingData.zipCode} onChange={handleBillingInput} placeholder='ZIP Code' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingPhoneWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingPhonelabel}`}>Phone</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="phone" type="text" className="form-control" id="companyInvoiceBillingPhone" value={addressBillingData.phone} onChange={handleBillingInput} placeholder='Phone Number' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingFaxWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingFaxlabel}`}>Fax</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="fax" type="text" className="form-control" id="companyInvoiceBillingFax" value={addressBillingData.fax} onChange={handleBillingInput} placeholder='Fax Number' />
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
                        <input name="attention" type="text" className="form-control" id="companyInvoiceShippingAttention" value={addressShippingData.attention} onChange={handleShippingInput} placeholder='Attention' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingComapnyCountryWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingComapnyCountrylabel}`}>Country / Region</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <SelectComponent data={countries} setSeletedId={handleShippingInput} seletedId={addressShippingData.countryId} name={'countryId'} isDisabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingAddressWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingAddresslabel}`}>Address</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea name="addressLine1" id="companyInvoiceShippingAddress1" rows="3" onChange={handleShippingInput} value={addressShippingData.addressLine1} placeholder='Address Line 1' disabled={addressCopied}></textarea>
                    </div>
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-8">
                        <textarea className='mb-0' name="addressLine2" id="companyInvoiceShippingAddress2" rows="3" onChange={handleShippingInput} value={addressShippingData.addressLine2} placeholder='Address Line 2' disabled={addressCopied}></textarea>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingCityWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingCitylabel}`}>City</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="city" type="text" className="form-control" id="companyInvoiceShippingCity" onChange={handleShippingInput} value={addressShippingData.city} placeholder='City' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingComapnyStateWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingComapnyStatelabel}`}>State</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <SelectComponent data={shippingstates} setSeletedId={handleShippingInput} seletedId={addressShippingData.stateId} name={'stateId'} isDisabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingZIPCodeWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingZIPCodelabel}`}>ZIP Code</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="zipCode" type="text" className="form-control" id="companyInvoiceShippingZIPCode" onChange={handleShippingInput} value={addressShippingData.zipCode} placeholder='ZIP Code' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingPhoneWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingPhonelabel}`}>Phone</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="phone" type="text" className="form-control" id="companyInvoiceShippingPhone" onChange={handleShippingInput} value={addressShippingData.phone} placeholder='Phone Number' disabled={addressCopied} />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingFaxWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingFaxlabel}`}>Fax</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input name="fax" type="text" className="form-control" id="companyInvoiceShippingFax" onChange={handleShippingInput} value={addressShippingData.fax} placeholder='Fax Number' disabled={addressCopied} />
                    </div>
                </div>

            </div>
        </div>
    </div>)
}