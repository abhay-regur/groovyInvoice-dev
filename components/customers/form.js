"use client"
import { useState, useContext, useEffect } from 'react';
import Address from '@/components/customers/address';
import OtherDetails from '@/components/otherDetails';
import RadioButton from '@/components/radioButton';
import FaSkype from '@/assets/icons/faSkype.svg';
import FaSave from '@/assets/icons/faSave.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaExclamationCircle from '@/assets/icons/faExclamationCircle.svg';
import styles from "@/styles/newCustomer.module.scss";
import ErrorList from '@/components/errorList';
import { getPaymentTerms, createPaymentTerms } from "@/services/paymentTerms.service";
import { getGSTTreatment, getPlaceOfSupply, getCurrencies } from "@/services/customer.service";
import { getTaxExemptionReason, createTaxExemptionReason } from '@/services/taxExempted.service.js';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import DisplayNameSelect from '@/components/customers/displayNameSelect';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { useRouter } from 'next/navigation';
import ContactPerson from '../contactPerson';

const CustomersForm = ({ data, setData, handleSubmit, errors, setErrors, mode, id = 0 }) => {
  const { replace } = useRouter();
  const [gstTreatment, setGSTTreatment] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [placeOfSupply, setPlaceOfSupply] = useState([]);
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [taxExemptionReason, setTaxExemptionReason] = useState([]);
  const [ActiveTabID, setActiveTabID] = useState(1);
  const { setToastList } = useContext(ToastMsgContext);

  const handleInput = ({ target }) => {
    var temp_data = data;
    var name = target.name || target.getAttribute('name');
    if (name != '') {
      if (name == 'openingBalance' || name == 'gstTreatment' || name == 'paymentTermId' || name == 'currencyId') {
        if (!Number.isNaN((target.value)) && target.value != '') {
          temp_data[name] = parseInt(target.value)
        } else {
          temp_data[name] = 0;
        }
      } else if (name == 'phone' || name == 'cellNumber') {
        let temp = (target.value).match(/[0-9]+/g) || '';
        if (target.value != '' && temp.length > 0) {
          temp_data[name] = temp[0];
        } else {
          temp_data[name] = '';
        }
      } else {
        temp_data[name] = target.value;
      }
      let temp = Object.assign({}, temp_data)
      setData(temp)
    }
  }

  const handleRadioButtonChange = ({ target }) => {
    data[target.getAttribute('data-group')] = target.name.toLowerCase();
    let temp = Object.assign({}, data)
    setData(temp)
  }

  const getGSTTreatmentDetails = async () => {
    setErrors([]);
    try {
      const result = await getGSTTreatment();
      var data = result.data;
      var temp = [];
      data.forEach((elem) => {
        temp.push({ Id: elem.id, name: elem.title })
      })
      setGSTTreatment(temp);
    } catch (error) {
      setErrors(genrateErrorMessage(error, 'Customer', setToastList));

    }
  }

  const getCurrencyDetails = async () => {
    setErrors([]);
    try {
      const result = await getCurrencies();
      var data = result.data;

      var temp = [];

      data.forEach((elem) => {
        temp.push({ Id: elem.id, symbol: elem.symbol, name: (elem.symbol == '' ? elem.name : elem.symbol + ' - ' + elem.code + ' - ' + elem.name), code: elem.code })
      })
      setCurrencies(temp);
    } catch (error) {
      setErrors(genrateErrorMessage(error, 'Customer', setToastList));
    }
  }

  const getPlaceOfSupplyDetails = async () => {
    setErrors([]);
    try {
      const result = await getPlaceOfSupply();
      var data = result.data;
      var temp = [];
      data.forEach((elem) => {
        temp.push({ Id: elem.name.toLowerCase(), name: elem.name })
      })
      setPlaceOfSupply(temp);
    } catch (error) {
      setErrors(genrateErrorMessage(error, 'Customer', setToastList));
    }
  }

  const getPaymentTermsDetails = async () => {
    setErrors([]);
    try {
      const result = await getPaymentTerms();
      var data = result.data;
      var temp = [];
      data.forEach((elem) => {
        temp.push({ Id: elem.id, name: elem.label })
      });
      setPaymentTerms(temp);
    } catch (error) {
      setErrors(genrateErrorMessage(error, 'Customer', setToastList));
    }
  }

  const getTaxExemptedDetails = async () => {
    setErrors([]);
    try {
      const result = await getTaxExemptionReason();
      var data = result.data;
      var temp = [];
      data.forEach((elem) => {
        temp.push({ Id: elem.id, name: elem.label })
      });
      setTaxExemptionReason(temp);
    } catch (error) {
      setErrors(genrateErrorMessage(error, 'Customer', setToastList));
    }
  }

  var otherDetailsProps = {
    data: data,
    handleInput: handleInput,
    handleRadioButtonChange: handleRadioButtonChange,
    ErrorList: ErrorList,
    getPaymentTermsDetails: getPaymentTermsDetails,
    createPaymentTerms: createPaymentTerms,
    createTaxExemptionReason: createTaxExemptionReason,
    getTaxExemptedDetails: getTaxExemptedDetails,
    gstTreatment: gstTreatment,
    paymentTerms: paymentTerms,
    currencies: currencies,
    placeOfSupply: placeOfSupply,
    taxExemptionReason: taxExemptionReason,
    setToastList: setToastList
  };

  var contactPersonProps = {
    customerId: id,
    setToastList: setToastList,
    ErrorList: ErrorList,
  };

  const resetPage = () => {
    setErrors([]);
    setActiveTabID(1);
    setData({
      type: "",
      salutation: "",
      firstName: "",
      lastName: "",
      customerCompanyName: "",
      displayName: "",
      email: "",
      phone: "",
      cellNumber: "",
      skype: "",
      designation: "",
      department: "",
      website: "",
      gstTreatment: 0,
      GSTIN: "",
      panNumber: "",
      placeOfSupply: "",
      taxPreference: "",
      exemptionReason: "",
      currencyId: 108,
      openingBalance: 0,
      paymentTermId: null,
      address: {
        billingAddress: {
          type: "billing-address",
          attention: "",
          countryId: null,
          addressLine1: "",
          addressLine2: "",
          city: "",
          stateId: null,
          zipCode: "",
          phone: "",
          fax: ""
        },
        shippingAddress: {
          type: "shipping-address",
          attention: "",
          countryId: null,
          addressLine1: "",
          addressLine2: "",
          city: "",
          stateId: null,
          zipCode: "",
          phone: "",
          fax: ""
        }
      }
    });
    replace('/customers')
  }

  const setAddressData = (addressData) => {
    data['address'] = addressData
    let temp = Object.assign({}, data)
    setData(temp)
  }

  useEffect(() => {
    getGSTTreatmentDetails();
    getCurrencyDetails();
    getPlaceOfSupplyDetails();
    getPaymentTermsDetails();
    getTaxExemptedDetails();
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className={`${styles.card} card`}>
          <div className={`${styles.cardBody} card-body`}>
            <h4 className={`${styles.cardTitle} card-title`}>Customer Details</h4>
            <hr />
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>

              <div className={`${styles.companyCustomerTypeOptionWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className="">Customer Type</label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <span className={`${styles.companyCustomerTypeSelectorMainWrapper}`}>
                    <span className={`${styles.customerTypeBusinessRadioButtonWrapper} d-flex align-items-center`}>
                      <RadioButton
                        group="type"
                        name='business'
                        label="Business"
                        checked={(data.type).toLowerCase() === 'business'}
                        onChange={handleRadioButtonChange}
                      />
                    </span>
                    <span className={`${styles.customerTypeIndividualRadioButtonWrapper} d-flex align-items-center`}>
                      <RadioButton
                        group="type"
                        name='individual'
                        label="Individual"
                        checked={(data.type).toLowerCase() === 'individual'}
                        onChange={handleRadioButtonChange}
                      />
                    </span>
                  </span>
                </div>
              </div>

              <div className={`${styles.companyInvoiceNameWrapper} mb-0 mb-md-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className="">Primary Contact</label>
                </div>
                <div className="col-12 col-lg-2 col-xl-2">
                  <select name='salutation' className={`${styles.companySalutationSelect} form-select`} onChange={handleInput}>
                    <option defaultValue>Salutation</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div className="col-12 col-lg-3 col-xl-2">
                  <input type="text" name='firstName' className={`${styles.companyInvoiceNewCustomerFirstName} form-control`} value={data.firstName} onChange={handleInput} placeholder='First Name' />
                </div>
                <div className="col-12 col-lg-3 col-xl-2">
                  <input type="text" name='lastName' className={`${styles.companyInvoiceNewCustomerLastName} form-control`} value={data.lastName} onChange={handleInput} placeholder='Last Name' />
                </div>
              </div>

              <div className={`${styles.companyInvoiceCompanyNameWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceCompanyNameLabel}`}>Company Name</label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <input name='customerCompanyName' type="text" className="form-control" id="companyInvoiceNewCustomerCompanyName" value={data.customerCompanyName} onChange={handleInput} placeholder='Company Name' />
                </div>
              </div>

              <div className={`${styles.companyInvoiceCompanyDisplayNameWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceCompanyDisplayNamelabel}`}>Customer Display Name <span className={`${styles.green}`}>*</span></label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <DisplayNameSelect
                    value={data.displayName}
                    onChange={handleInput}
                    salutation={data.salutation}
                    firstName={data.firstName}
                    lastName={data.lastName}
                    name='displayName'
                  />
                </div>
              </div>

              <div className={`${styles.companyInvoiceCompanyEmailWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceCompanyEmailLabel}`}>Customer Email</label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                  <input name='email' type="email" className="form-control" id="companyInvoiceCompanyEmail" placeholder='Email Address' value={data.email} onChange={handleInput} />
                  <FaExclamationCircle />
                </div>
              </div>

              <div className={`${styles.companyInvoiceCompanyPhone} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceCompanyPhoneLabel}`}>Customer Phone</label>
                </div>
                <div className="col-12 col-lg-3 col-xl-3 d-flex align-items-center  mb-lg-0 mb-2">
                  <input name='phone' type="tel" minLength={4} maxLength={13} className={`${styles.companyInvoiceCompanyWorkPhone} form-control`} value={data.phone} placeholder='Work Phone' onChange={handleInput} />
                </div>
                <div className="col-12 col-lg-3 col-xl-3 d-flex align-items-center">
                  <input name='cellNumber' type="tel" minLength={4} maxLength={13} className={`${styles.companyInvoiceCompanyMobile} form-control`} value={data.cellNumber} placeholder='Mobile' onChange={handleInput} />
                  <FaExclamationCircle />
                </div>
              </div>

              <div className={`${styles.companyInvoiceCompanySkypeIDWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceCompanySkypeIDLabel}`}>Skype Name/Number</label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="input-group">
                    <span className="input-group-text"><FaSkype /></span>
                    <input name='skype' type="tel" className="form-control" id="companyInvoiceCompanySkypeID" placeholder='Skype name/number' value={data.skype} onChange={handleInput} />
                  </div>
                </div>
              </div>

              <div className={`${styles.companyInvoiceDesignationWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceDesignationlabel}`}>Designation</label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <input name='designation' type="text" className="form-control" id="companyInvoiceDesignation" placeholder='Designation' value={data.designation} onChange={handleInput} />
                </div>
              </div>

              <div className={`${styles.companyInvoiceDepartmentWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceDepartmentLabel}`}>Department</label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <input name='department' type="text" className="form-control" id="companyInvoiceDepartment" placeholder='Department' value={data.department} onChange={handleInput} />
                </div>
              </div>

              <div className={`${styles.companyInvoiceCompanyWebsiteWrapper} mb-4 row`}>
                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                  <label className={`${styles.companyInvoiceCompanyWebsiteLabel}`}>Website</label>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <input name='website' type="text" className="form-control" id="companyInvoiceCompanyWebsiteW" placeholder='Website' value={data.website} onChange={handleInput} />
                </div>
              </div>

              <div className={`${styles.companyInvoiceTabViewWrapper}`}>
                <ul className={`nav ${styles.nav_tabs}`}>
                  <li className={`nav-item ${styles.nav_item} ${ActiveTabID == 1 ? styles.active : " "}`} onClick={() => { setActiveTabID(1) }}>
                    <span>
                      <span className={`${styles.nav_menuName}`}>Other Details</span>
                    </span>
                  </li>
                  <li className={`nav-item ${styles.nav_item} ${ActiveTabID == 2 ? styles.active : " "}`} onClick={() => { setActiveTabID(2) }}>
                    <span>
                      <span className={`${styles.nav_menuName}`}>Address</span>
                    </span>
                  </li>
                  {mode == 'edit' ? (
                    <li className={`nav-item me-0 ${styles.nav_item} ${ActiveTabID == 3 ? styles.active : " "}`} onClick={() => { setActiveTabID(3) }}>
                      <span>
                        <span className={`${styles.nav_menuName}`}>Contact Persons</span>
                      </span>
                    </li>) : ''}
                </ul>
                <div className={`${styles.tab_content_wrapper} `} id="myTabContent">
                  {ActiveTabID == 1 ? <OtherDetails {...otherDetailsProps} /> : " "}
                  {ActiveTabID == 2 ? <Address data={data.address} setData={setAddressData} /> : " "}
                  {ActiveTabID == 3 ? <ContactPerson {...contactPersonProps} /> : " "}
                </div>
              </div>

              <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                <div className="d-flex gap-3 col-12 col-sm-10 col-md-5 col-lg-7 col-xl-5">
                  <button type='submit' name="customer-btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`}>
                    <span>
                      <i><FaSave /></i>
                      Save
                    </span>
                  </button>
                  <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} type='reset' onClick={resetPage}>
                    <span>
                      <i><FaCircleXmark /></i>
                      Cancel
                    </span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomersForm;