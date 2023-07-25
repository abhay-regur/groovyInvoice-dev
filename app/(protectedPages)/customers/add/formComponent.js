"use client"
import { useState, useContext, useEffect } from 'react';
import ContactPerson from '../../../../components/contactPerson';
import Address from '../../../../components/address';
import OtherDetails from '../../../../components/otherDetails';
import RadioButton from '../../../../components/radioButton';
import FaSkype from '../../../../assets/icons/faSkype.svg';
import FaSave from '../../../../assets/icons/faSave.svg';
import FaCircleXmark from '../../../../assets/icons/faCircleXmark.svg';
import FaExclamationCircle from '../../../../assets/icons/faExclamationCircle.svg';
import styles from "../../../../styles/newCustomer.module.scss";
import ErrorList from '../../../../components/errorList';
import Loading from "../loading.js"
import { createCustomer, addBillingAddress, addShippingAddress } from "../../../../services/customer.service";
import { ToastMsgContext } from '../../../../context/ToastMsg.context';
import { getCountries, getStates } from '../../../../services/countriesState.service';
import { disableSubmitButton, enableSubmitButton } from '../../../../utils/form.utils';
import { NavExpandedState } from '../../../../context/NavState.context';


export default function CustomerAddForm() {
    const { navExpandedState } = useContext(NavExpandedState);
    const [ActiveTabID, setActiveTabID] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { setToastList } = useContext(ToastMsgContext);
    const [countries, setCountries] = useState();
    const [billingstates, setBillingStates] = useState();
    const [shippingstates, setShippingStates] = useState();
    const [errors, setErrors] = useState([]);
    const [customerID, setCustomerID] = useState('')
    const [addressErrors, setAddressErrors] = useState([]);
    const [data, setData] = useState({
        type: "",
        salutation: "",
        firstName: "",
        lastName: "",
        displayName: "",
        customerCompanyName: "",
        email: "",
        phone: "",
        cellNumber: "",
        skype: "",
        designation: "",
        department: "",
        website: "",
        gstTreatment: "",
        panNumber: "",
        placeOfSupply: "",
        taxPreference: "",
        exemptionReason: "",
        currency: "INR",
        openingBalance: 0,
        paymentTerm: "",
    });

    const [addressBillingData, setAddressBillingData] = useState({
        attention: "",
        countryId: -1,
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateId: -1,
        zipCode: "",
        phone: "",
        fax: ""
    })

    const [addressShippingData, setAddressShippingData] = useState({
        attention: "",
        countryId: -1,
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateId: -1,
        zipCode: "",
        phone: "",
        fax: ""
    })

    useEffect(() => {
        getCountryData();
        setTimeout(function () {
            setIsLoading();
        }, 2500);
    }, [])

    useEffect(() => {
        if (addressBillingData.countryId > -1) {
            getStateData(addressBillingData.countryId, setBillingStates)
        }
    }, [addressBillingData.countryId])

    useEffect(() => {
        if (addressShippingData.countryId > -1) {
            getStateData(addressShippingData.countryId, setShippingStates)
        }
    }, [addressShippingData.countryId])

    const handleInput = ({ target }) => {
        if (target.name != '') {
            if (target.name == 'openingBalance') {
                data[target.name] = parseInt(target.value)
            } else {
                data[target.name] = target.value
            }
            let temp = Object.assign({}, data)
            setData(temp)
        }
    }

    const handleRadioButtonChange = ({ target }) => {
        data[target.getAttribute('data-group')] = target.name
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        if (customerID == '') {
            setAddressErrors([]);
            disableSubmitButton(e.target);
            try {
                var result = await createCustomer(data);
                if (result.status == 200 || result.status == 201) {
                    setCustomerID(result.data.id)
                    setToastList([({
                        id: Math.floor((Math.random() * 101) + 1),
                        title: data.firstName + ' ' + data.lastName + ' added successfully',
                        description: result.data.message,
                    })]);
                    handleAddressSubmit();
                }
            } catch (e) {
                console.log(e);
                setErrors(e.response.data.message);
                enableSubmitButton();
                setIsLoading(false);
            }
        } else {
            setAddressErrors([]);
            handleAddressSubmit();
        }
        enableSubmitButton();
    }

    const handleAddressSubmit = async () => {
        try {
            var billingAddressResult = await addBillingAddress(addressBillingData, customerID);
            if (billingAddressResult.status == 200 || billingAddressResult.status == 201) {
                var shippingAddressResult = await addShippingAddress(addressShippingData, customerID);
                if (shippingAddressResult.status == 200 || shippingAddressResult.status == 201) {
                    setToastList([({
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Successfully Updated ',
                        description: shippingAddressResult.data.message,
                    })]);
                }
            }
        } catch (e) {
            console.log(e);
            setAddressErrors(e.response.data.message)
        }
        setIsLoading(false);
    }

    const getStateData = async (id, setStates) => {
        setErrors([]);
        try {
            const result = await getStates(id);
            var data = result.data;
            var temp = [];
            for (var i = 0; data.length > i; i++) {
                temp.push({ name: data[i].name, Id: data[i].id });
            }
            setStates(temp);
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const getCountryData = async () => {
        setErrors([]);
        try {
            const result = await getCountries();
            var data = result.data;
            var temp = [];
            for (var i = 0; data.length > i; i++) {
                temp.push({ name: data[i].name, Id: data[i].id });
            }
            setCountries(temp);
            setIsLoading(false);
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    var addressProps = {
        countries: countries,
        errors: addressErrors,
        billingstates: billingstates,
        shippingstates: shippingstates,
        addressBillingData: addressBillingData,
        addressShippingData: addressShippingData,
        setAddressBillingData: setAddressBillingData,
        setAddressShippingData: setAddressShippingData,
        setErrors: setAddressErrors
    };

    var otherDetailsProps = {
        data: data,
        handleInput: handleInput,
        handleRadioButtonChange: handleRadioButtonChange
    };

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <h2 className={`${styles.title}`}>
                New Customer
            </h2>
            {isLoading ?
                <Loading /> :
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
                                                    label="Business"
                                                    value={(data.type).toLowerCase() === 'business'}
                                                    onChange={handleRadioButtonChange}
                                                />
                                            </span>
                                            <span className={`${styles.customerTypeIndividualRadioButtonWrapper} d-flex align-items-center`}>
                                                <RadioButton
                                                    group="type"
                                                    label="Individual"
                                                    value={(data.type).toLowerCase() === 'individual'}
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
                                            <option value="ms">Ms.</option>
                                            <option value="mr">Mr.</option>
                                            <option value="mrs">Mrs.</option>
                                            <option value="dr">Dr.</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-2">
                                        <input type="text" name='firstName' className={`${styles.companyInvoiceNewCustomerFirstName} form-control`} onChange={handleInput} placeholder='First Name' />
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-2">
                                        <input type="text" name='lastName' className={`${styles.companyInvoiceNewCustomerLastName} form-control`} onChange={handleInput} placeholder='Last Name' />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyNameWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyNameLabel}`}>Company Name</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='customerCompanyName' type="text" className="form-control" id="companyInvoiceNewCustomerCompanyName" onChange={handleInput} placeholder='Company Name' />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyDisplayNameWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyDisplayNamelabel}`}>Customer Display Name <span className={`${styles.green}`}>*</span></label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        {/* <select className={`${styles.companyInvoiceCompanyDisplaySelect} form-select`} onChange={handleInput}>
                                        <option defaultValue>Customer Display Name</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                    </select> */}
                                        <input name='displayName' type="text" className="form-control" id="companyInvoiceNewCustomerUserName" onChange={handleInput} placeholder='Display Name' />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyEmailWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyEmailLabel}`}>Customer Email</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input name='email' type="email" className="form-control" id="companyInvoiceCompanyEmail" placeholder='Company Email' onChange={handleInput} />
                                        <FaExclamationCircle />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyPhone} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyPhoneLabel}`}>Customer Phone</label>
                                    </div>
                                    <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                                        <input name='phone' type="tel" className={`${styles.companyInvoiceCompanyWorkPhone} form-control`} placeholder='Work Phone' onChange={handleInput} />
                                    </div>
                                    <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                                        <input name='cellNumber' type="tel" className={`${styles.companyInvoiceCompanyMobile} form-control`} placeholder='Mobile' onChange={handleInput} />
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
                                            <input name='skype' type="tel" className="form-control" id="companyInvoiceCompanySkypeID" placeholder='Skype name/number' onChange={handleInput} />
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceDesignationWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceDesignationlabel}`}>Designation</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='designation' type="text" className="form-control" id="companyInvoiceDesignation" placeholder='Designation' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceDepartmentWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceDepartmentLabel}`}>Department</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='department' type="text" className="form-control" id="companyInvoiceDepartment" placeholder='Department' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyWebsiteWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyWebsiteLabel}`}>Website</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='website' type="text" className="form-control" id="companyInvoiceCompanyWebsiteW" placeholder='Website' onChange={handleInput} />
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
                                        <li className={`nav-item me-0 ${styles.nav_item} ${ActiveTabID == 3 ? styles.active : " "}`} onClick={() => { setActiveTabID(3) }}>
                                            <span>
                                                <span className={`${styles.nav_menuName}`}>Contact Persons</span>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className={`${styles.tab_content_wrapper} `} id="myTabContent">
                                        {ActiveTabID == 1 ? <OtherDetails {...otherDetailsProps} /> : " "}
                                        {ActiveTabID == 2 ? <Address {...addressProps} /> : " "}
                                        {/* {ActiveTabID == 3 ? <ContactPerson /> : " "} */}
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                        <div className="row">
                                            <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                                <button name="btn-submit" className={`${styles.companyInvoiceSavenSendButton} btn blue`} type='submit'>
                                                    <span>
                                                        <i><FaSave /></i>
                                                        Save
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                                <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} type='reset'>
                                                    <span>
                                                        <i><FaCircleXmark /></i>
                                                        Cancel
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}