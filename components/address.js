import Head from 'next/head';
import Image from 'next/image';
import styles from "../styles/newCustomer.module.scss";
import FaCopy from "../assets/icons/faCopy.svg";
export default function Address() {
    return (<div className={`${styles.tab_content}`}>
        <div className="row">
            <div className="col-12 col-lg-6">
                <h3 className={`${styles.tabtitle}`}>Billing Address</h3>

                <div className={`${styles.companyInvoiceBillingAttentionWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAttentionlabel}`}>Attention</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceBillingAttention" placeholder='Attention' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyCountryWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyCountrylabel}`}>Country / Region</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <select className={`${styles.companyInvoiceBillingComapnyCountrySelect} form-select`}>
                            <option defaultValue>Country / Region</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingAddressWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingAddresslabel}`}>Address</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea name="Address 1" id="companyInvoiceBillingAddress1" rows="3" placeholder='Address Line 1'></textarea>
                    </div>
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-8">
                        <textarea className='mb-0' name="Address 2" id="companyInvoiceBillingAddress2" rows="3" placeholder='Address Line 2'></textarea>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingCityWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingCitylabel}`}>City</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceBillingCity" placeholder='City Name' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingComapnyStateWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingComapnyStatelabel}`}>State</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <select className={`${styles.companyInvoiceBillingComapnyStateSelect} form-select`}>
                            <option defaultValue>Select a GST Treatment</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingZIPCodeWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingZIPCodelabel}`}>ZIP Code</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceBillingZIPCode" placeholder='ZIP Code' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingPhoneWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingPhonelabel}`}>Phone</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceBillingPhone" placeholder='Phone Number' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceBillingFaxWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceBillingFaxlabel}`}>Fax</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceBillingFax" placeholder='Fax Number' />
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 mt-lg-0 mt-4">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3 className={`${styles.tabtitle}`}>Shipping Address</h3>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={`${styles.companyInvoiceShippingCopyBillingWrapper} d-flex align-content-center justify-content-start justify-content-md-end`}>
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
                        <input type="text" className="form-control" id="companyInvoiceShippingAttention" placeholder='Attention' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingComapnyCountryWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingComapnyCountrylabel}`}>Country / Region</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <select className={`${styles.companyInvoiceShippingComapnyCountrySelect} form-select`}>
                            <option defaultValue>Country / Region</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingAddressWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingAddresslabel}`}>Address</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea name="Address 1" id="companyInvoiceShippingAddress1" rows="3" placeholder='Address Line 1'></textarea>
                    </div>
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-8">
                        <textarea className='mb-0' name="Address 2" id="companyInvoiceShippingAddress2" rows="3" placeholder='Address Line 2'></textarea>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingCityWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingCitylabel}`}>City</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceShippingCity" placeholder='City Name' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingComapnyStateWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingComapnyStatelabel}`}>State</label>
                    </div>
                    <div className="col-12 col-md-8">
                        <select className={`${styles.companyInvoiceShippingComapnyStateSelect} form-select`}>
                            <option defaultValue>Select a GST Treatment</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingZIPCodeWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingZIPCodelabel}`}>ZIP Code</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceShippingZIPCode" placeholder='ZIP Code' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingPhoneWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingPhonelabel}`}>Phone</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceShippingPhone" placeholder='Phone Number' />
                    </div>
                </div>

                <div className={`${styles.companyInvoiceShippingFaxWrapper} mb-4 row`}>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <label className={`${styles.companyInvoiceShippingFaxlabel}`}>Fax</label>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <input type="text" className="form-control" id="companyInvoiceShippingFax" placeholder='Fax Number' />
                    </div>
                </div>

            </div>
        </div>
    </div>)
}