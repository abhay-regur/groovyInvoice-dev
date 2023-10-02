"use client"
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ContactPerson from '@/components/contactPerson';
import Address from '@/components/address';
import OtherDetails from '@/components/otherDetails';
import RadioButton from '@/components/radioButton';
import FaSkype from '@/assets/icons/faSkype.svg';
import FaSave from '@/assets/icons/faSave.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaExclamationCircle from '@/assets/icons/faExclamationCircle.svg';
import styles from "@/styles/newCustomer.module.scss";
import ErrorList from '@/components/errorList';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import Loading from "../../loading.js";
import { getPaymentTerms, createPaymentTerms } from "@/services/paymentTerms.service";
import { getCountries, getStates } from '@/services/countriesState.service';
import { getUserDetails, updateUserDetails, getGSTTreatment, getPlaceOfSupply, getCurrencies, addContactPerson, listContactPersonDetails, updateContactPersonDetails, deleteContactPersonDetails } from "@/services/customer.service";
import { getTaxExemptionReason, createTaxExemptionReason } from '@/services/taxExempted.service.js';
import { GST_TREATMENT } from '../../../../../constants';
import { NavExpandedState } from '@/context/NavState.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { useRouter } from 'next/navigation';

export default function CustomerEditForm() {
    const { replace } = useRouter();
    const { id } = useParams();
    const { navExpandedState } = useContext(NavExpandedState);
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [isLoading, setIsLoading] = useState(true);
    const [countries, setCountries] = useState();
    const [billingstates, setBillingStates] = useState();
    const [billingstatesCountryId, setBillingStatesCountryId] = useState(-1);
    const [shippingstates, setShippingStates] = useState();
    const [shippingstatesCountryId, setShippingStatesCountryId] = useState(-1);
    const [ActiveTabID, setActiveTabID] = useState(1);
    const [gstTreatment, setGSTTreatment] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [placeOfSupply, setPlaceOfSupply] = useState([]);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [taxExemptionReason, setTaxExemptionReason] = useState([])

    const [data, setData] = useState({
        type: "",
        salutation: "",
        firstName: "",
        lastName: "",
        customerCompanyName: "",
        companyId: 0,
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
        currency: "₹",
        openingBalance: 0,
        paymentTermId: 0,
        address: {
            billingAddress: {
                attention: "",
                countryId: 0,
                addressLine1: "",
                addressLine2: "",
                city: "",
                stateId: 0,
                zipCode: "",
                phone: "",
                fax: ""
            },
            shippingAddress: {
                attention: "",
                countryId: 0,
                addressLine1: "",
                addressLine2: "",
                city: "",
                stateId: 0,
                zipCode: "",
                phone: "",
                fax: ""
            }
        }
    });

    useEffect(() => {
        if (isLoading) {
            getCountryData();
            getGSTTreatmentDetails();
            getCurrencyDetails();
            getPlaceOfSupplyDetails();
            getUserData();
            getPaymentTermsDetails();
            getTaxExemptedDetails();
            setTimeout(function () {
                setIsLoading(false);
            }, 2500);
        }
    }, [])

    useEffect(() => {
        if (billingstatesCountryId > -1) {
            getStateData(billingstatesCountryId, setBillingStates);
        }
    }, [billingstatesCountryId])

    useEffect(() => {
        if (shippingstatesCountryId > -1) {
            getStateData(shippingstatesCountryId, setShippingStates);
        }
    }, [shippingstatesCountryId])

    const handleInput = ({ target }) => {
        var temp_data = data;
        var name = target.name || target.getAttribute('name');
        if (name != '') {
            if (name == 'openingBalance' || name == 'gstTreatment' || name == 'paymentTermId') {
                if (!Number.isNaN((target.value)) && target.value != '') {
                    temp_data[name] = parseInt(target.value)
                } else {
                    temp_data[name] = 0;
                }
            } else {
                temp_data[name] = target.value;
            }
            let temp = Object.assign({}, temp_data)
            setData(temp)
        }
    }

    const handleRadioButtonChange = ({ target }) => {
        data[target.getAttribute('data-group')] = target.name;
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        var temp = data;
        if (temp.taxPreference == "taxable") temp.exemptionReason = "";
        if (temp.gstTreatment == GST_TREATMENT.UNREGISTERED_BUSINESS || temp.gstTreatment == GST_TREATMENT.CONSUMER || temp.gstTreatment == GST_TREATMENT.OVERSEAS) temp.GSTIN = "";
        if (temp.gstTreatment == GST_TREATMENT.OVERSEAS) {
            temp.taxPreference = "";
            temp.exemptionReason = "";
        }
        setData(Object.assign({}, temp));
        try {
            var result = await updateUserDetails(id, data);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Updated ' + data.firstName + '`s Details',
                    description: '',
                }]);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const getStateData = async (id, setStates) => {
        setErrors([]);
        try {
            if (id != -1) {
                const result = await getStates(id);
                var data = result.data;
                var temp = [];
                data.forEach((elem) => {
                    temp.push({ Id: elem.id, name: elem.name })
                })
                setStates(temp);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const getCountryData = async () => {
        setErrors([]);
        try {
            const result = await getCountries();
            var data = result.data;
            var temp = [];
            data.forEach((elem) => {
                temp.push({ Id: elem.id, name: elem.name })
            })
            setCountries(temp);
            setIsLoading(false);
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
        }
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
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const getCurrencyDetails = async () => {
        setErrors([]);
        try {
            const result = await getCurrencies();
            var data = result.data;
            var temp = [];
            data.forEach((elem) => {
                temp.push({ Id: elem.symbol, name: elem.symbol + ' - ' + elem.name })
            })
            setCurrencies(temp);
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
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
            setErrors(genrateErrorMessage(error, ''));
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
            setErrors(genrateErrorMessage(error, ''));
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
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const getUserData = async () => {
        setErrors([]);

        var temp = data;
        if (temp.taxPreference == "taxable") temp.exemptionReason = "";
        if (temp.gstTreatment == 2 || temp.gstTreatment == 3 || temp.gstTreatment == 4 || temp.gstTreatment == 5) temp.GSTIN = "";
        if (temp.gstTreatment == 5) {
            temp.taxPreference = "";
            temp.exemptionReason = "";
        }
        setData(Object.assign({}, temp));

        try {
            var result = await getCustomer(id);
            if (result.status == 200 || result.status == 201) {
                setData(result.data);
                setBillingStatesCountryId(result.data.address.billingAddress.countryId);
                setShippingStatesCountryId(result.data.address.shippingAddress.countryId);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const handleReset = async (e) => {
        replace('/customers')
    }

    var addressProps = {
        countries: countries,
        billingstates: billingstates,
        shippingstates: shippingstates,
        shippingstatesCountryId: shippingstatesCountryId,
        setShippingStatesCountryId: setShippingStatesCountryId,
        billingstatesCountryId: billingstatesCountryId,
        setBillingStatesCountryId: setBillingStatesCountryId,
        data: data,
        setData: setData
    };

    var contactPersonProps = {
        custId: id,
        setToastList: setToastList,
        ErrorList: ErrorList,
        addContactPerson: addContactPerson,
        listContactPersonDetails: listContactPersonDetails,
        updateContactPersonDetails: updateContactPersonDetails,
        deleteContactPersonDetails: deleteContactPersonDetails
    };

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

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <h2 className={`${styles.title}`}>
                Update Customer
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
                                                    name='business'
                                                    label="Business"
                                                    value={(data.type).toLowerCase() === 'business'}
                                                    onChange={handleRadioButtonChange}
                                                />
                                            </span>
                                            <span className={`${styles.customerTypeIndividualRadioButtonWrapper} d-flex align-items-center`}>
                                                <RadioButton
                                                    group="type"
                                                    name='individual'
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
                                        <select name='salutation' className={`${styles.companySalutationSelect} form-select`} value={data.salutation} onChange={handleInput}>
                                            <option defaultValue>Salutation</option>
                                            <option value="ms">Ms.</option>
                                            <option value="mr">Mr.</option>
                                            <option value="mrs">Mrs.</option>
                                            <option value="dr">Dr.</option>
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
                                        {/* <select className={`${styles.companyInvoiceCompanyDisplaySelect} form-select`} onChange={handleInput}>
                                        <option defaultValue>Customer Display Name</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                    </select> */}
                                        <input name='displayName' type="text" className="form-control" id="companyInvoiceNewCustomerUserName" value={data.displayName} onChange={handleInput} placeholder='Display Name' />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyEmailWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyEmailLabel}`}>Customer Email</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input name='email' type="email" className="form-control" id="companyInvoiceCompanyEmail" value={data.email} placeholder='Company Email' onChange={handleInput} />
                                        <FaExclamationCircle />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyPhone} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyPhoneLabel}`}>Customer Phone</label>
                                    </div>
                                    <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                                        <input name='phone' type="tel" className={`${styles.companyInvoiceCompanyWorkPhone} form-control`} value={data.phone} placeholder='Work Phone' onChange={handleInput} />
                                    </div>
                                    <div className="col-12 col-lg-4 col-xl-2 d-flex align-items-center">
                                        <input name='cellNumber' type="tel" className={`${styles.companyInvoiceCompanyMobile} form-control`} value={data.cellNumber} placeholder='Mobile' onChange={handleInput} />
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
                                            <input name='skype' type="tel" className="form-control" id="companyInvoiceCompanySkypeID" value={data.skype} placeholder='Skype name/number' onChange={handleInput} />
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceDesignationWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceDesignationlabel}`}>Designation</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='designation' type="text" className="form-control" id="companyInvoiceDesignation" value={data.designation} placeholder='Designation' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceDepartmentWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceDepartmentLabel}`}>Department</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='department' type="text" className="form-control" id="companyInvoiceDepartment" value={data.department} placeholder='Department' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceCompanyWebsiteWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceCompanyWebsiteLabel}`}>Website</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input name='website' type="text" className="form-control" id="companyInvoiceCompanyWebsiteW" value={data.website} placeholder='Website' onChange={handleInput} />
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
                                        {ActiveTabID == 3 ? <ContactPerson {...contactPersonProps} /> : " "}
                                    </div>
                                </div>
                                {
                                    ActiveTabID == 3 ? ''
                                        :
                                        <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                                            <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-5">
                                                <div className="row">
                                                    <div className="col-6 col-md-4 col-lg-3 col-xl-3">
                                                        <button name="btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`} type='submit'>
                                                            <span>
                                                                <i><FaSave /></i>
                                                                Save
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="col-6 col-md-4 col-lg-3 col-xl-3">
                                                        <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} type='reset' onClick={handleReset}>
                                                            <span>
                                                                <i><FaCircleXmark /></i>
                                                                Cancel
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </form>

                        </div>
                    </div>
                </div>
            }
        </main>
    )
}