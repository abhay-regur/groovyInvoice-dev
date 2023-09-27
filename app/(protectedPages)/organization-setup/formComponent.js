"use client"
import styles from "@/styles/organizationSetup.module.scss";
import { useContext, useEffect, useState } from "react";
import ErrorList from '@/components/errorList';
import { getCompanyDetails, updateCompanyDetails } from '@/services/companies.service';
import { getCurrencies } from '@/services/common/general.service';
import { getIndianStates, getCountries } from '@/services/countriesState.service';
import CustomSelectComponent from "@/components/customSelectComponent";
import { NavExpandedState } from '@/context/NavState.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import Loading from "../loading";


export default function OrganizationSetupForm() {
    const [errors, setErrors] = useState([]);

    const { navExpandedState } = useContext(NavExpandedState);

    const [isLoading, setIsLoading] = useState(true);

    const [countryArray, setCountryArray] = useState([]);

    const [currencies, setCurrencies] = useState([]);

    const [statesArray, getStateArray] = useState([])


    // {
    //     "companyName": "string",
    //     "industryId": 0,
    //     "businessLocation": [
    //       stateId: 0,
    //       countryId: 0
    //     ],
    //     "currency": "string",
    //     "language": "string",
    //     "timeZone": "string",
    //     "isRegisteredForGST": true,
    //     "GSTIN": "string",
    //     "currentInvoicing": "string"
    //   }

    const [data, setData] = useState({
        companyName: '',
        industryId: 0,
        businessLocation: [{
            stateId: 0,
            countryId: 0
        }],
        currency: '',
        language: '',
        timeZone: '',
        isRegisteredForGST: true,
        GSTIN: '',
        currentInvoicing: ''
    });

    useEffect(() => {
        setIsLoading(true);
        getCurrenciesData();
        getStatesData();
        getCountriesData();
        getCompanyData();
        setIsLoading(false);
    }, []);

    const getStatesData = async () => {
        setErrors([]);
        try {
            const result = await getIndianStates();
            var data = result.data;
            var temp = [];
            data.forEach((elem) => {
                temp.push({ Id: elem.id, name: elem.name })
            })
            getStateArray(temp);
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const getCountriesData = async () => {
        setErrors([]);
        try {
            const result = await getCountries();
            var data = result.data;
            var temp = [];
            data.forEach((elem) => {
                temp.push({ Id: elem.id, name: elem.name })
            })
            setCountryArray(temp);
            setIsLoading(false);
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const getCurrenciesData = async () => {
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

    const getCompanyData = async () => {
        setErrors([]);
        const result = await getCompanyDetails();
        setData(result.data);
    }

    const [modelFor, setModalFor] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (e) => setShow(true);

    const handleInput = ({ target }) => {
        var temp_data = data;
        var name = target.name || target.getAttribute('name');
        if (name != '') {
            if (name == 'stateId' || name == 'countryId') {
                temp_data.businessLocation[0][name] = parseInt(target.value);
            } else {
                temp_data[name] = target.value;
            }
            let temp = Object.assign({}, temp_data);
            setData(temp);
        }
    }

    const handleCheckBoxChange = ({ target }) => {
        console.log(data.isRegisteredForGST);
        data[target.name] = !data[target.name];
        let temp = Object.assign({}, data);
        setData(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        var temp = data;
        if (!temp.isRegisteredForGST) {
            temp.GSTIN = "";
        }
        setData(Object.assign({}, temp));
        try {
            var result = await updateCompanyDetails(data)
            if (result.status == 200 || result.status == 201) {
                setIsLoading(false);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
            setIsLoading(false);
        }
    }

    return (<div className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
        {isLoading ? <Loading /> :
            <>
                <h2 className={`${styles.title}`}>
                    Organization Setup
                </h2>
                <div className="row mx-0 justify-content-center">
                    <div className="col-md-8">
                        <div className="container-fluid mt-4 d-flex justify-content-center">
                            <div className={`${styles.organizationSetupcard} card w-100`}>
                                <div className="card-body">
                                    <h4 className={`${styles.cardTitle} card-title`}>Welcome to Groovy Invoice </h4>

                                    <p className={`${styles.cardMiniheading} card-text`}>Enter your organization details to get started with Groovy Invoice.</p>

                                    <hr />
                                    <ErrorList errors={errors} />
                                    <div className={`${styles.form} mb4 row`}>
                                        <form onSubmit={handleSubmit}>
                                            <div className={`${styles.companyInvoiceOrganizationNameWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceCompanyOrganizationName}`}>Organization Name</label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <input name='companyName' type="text" className="form-control" id="companyInvoiceOrganizationName" value={data.companyName} onChange={handleInput} placeholder='Organization Name' />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationIndustryWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationIndustrylabel}`}>Industry </label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationIndustrySelect}`} data={[{ Id: 1, name: 'IT' }]} onOptionValueChange={handleInput} optionValue={parseInt(data.industryId)} name={'industry'} isDisabled={false} defaultText={'Select an Option'} isInnerButtonRequired={false} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationLocationWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationLocationlabel}`}>Business Location <span className={`${styles.green}`}>*</span> </label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationLocationSelect}`} data={countryArray} onOptionValueChange={handleInput} optionValue={data.businessLocation[0]['countryId']} name={'countryId'} onOptionInnerButtonClick={handleShow} isDisabled={false} defaultText={'Select an location'} isInnerButtonRequired={true} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationStateWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationStatelabel}`}>State <span className={`${styles.green}`}>*</span></label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationStateSelect}`} data={statesArray} onOptionValueChange={handleInput} optionValue={data.businessLocation[0]['stateId']} name={'stateId'} isDisabled={false} defaultText={'Select a State'} isInnerButtonRequired={false} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationCurrencyWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationCurrencylabel}`}>Currency <span className={`${styles.green}`}>*</span></label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationCurrencySelect}`} data={currencies} onOptionValueChange={handleInput} optionValue={data.currency} name={'currency'} isDisabled={false} defaultText={'Select a Currency'} isInnerButtonRequired={false} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationLanguageWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationLanguagelabel}`}>Language <span className={`${styles.green}`}>*</span></label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationLanguageSelect}`} data={[{ Id: 1, name: 'English' }]} onOptionValueChange={handleInput} optionValue={parseInt(data.language)} name={'language'} isDisabled={false} defaultText={'Select a Languange'} isInnerButtonRequired={false} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationTimeZoneWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationTimeZonelabel}`}>Time Zone <span className={`${styles.green}`}>*</span></label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationTimeZoneSelect}`} data={[{ Id: 1, name: "Asia/Kolkata" }]} onOptionValueChange={handleInput} optionValue={data.timeZone} name={'timeZone'} isDisabled={false} defaultText={'Select a Time Zone'} isInnerButtonRequired={false} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationGSTWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationGSTlabel}`}>Is this business registred for GST?</label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                                    <div className={`${styles.companyInvoiceOrganizationGSTSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                                                        <input className={`${styles.companyInvoiceOrganizationGSTSwitch} form-check-input`} type="checkbox" role="switch" id="isRegisteredForGSTSwitch" name='isRegisteredForGST' checked={data.isRegisteredForGST} onChange={handleCheckBoxChange} />
                                                    </div>
                                                </div>
                                            </div>

                                            {data.isRegisteredForGST ?
                                                <div className={`${styles.companyInvoiceOrganizationGSTINWrapper} mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationGSTlabel}`}>GST Number <span className={`${styles.green}`}>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <input name='GSTIN' type="text" className="form-control" id="companyInvoiceNewOrganizationGSTIN" value={data.GSTIN} onChange={handleInput} placeholder='GSTIN' />
                                                    </div>
                                                </div>
                                                : ''
                                            }

                                            <div className={`${styles.companyInvoiceOrganizationCurrentInvoicingWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationCurrentInvoicinglabel}`}>How are you managing invoicing currently? </label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationCurrentInvoicingSelect}`} data={''} onOptionValueChange={handleInput} optionValue={data.currentInvoicing} name={'currentInvoicing'} isDisabled={false} defaultText={''} isInnerButtonRequired={true} />
                                                </div>
                                            </div>

                                            <div className="mb-4 row">
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <button type="submit" name="btn-submit" className={`${styles.companyInvoiceSavenSendButton} btn blue`}>
                                                        <span>
                                                            Get Started
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
    </div>)
}