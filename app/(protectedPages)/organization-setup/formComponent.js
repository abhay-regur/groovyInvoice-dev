"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "@/styles/organizationSetup.module.scss";
import { useContext, useEffect, useState } from "react";
import ErrorList from '@/components/errorList';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { getCompanyDetails, updateCompanyDetails } from '@/services/companies.service';
import { getCurrencies, getTimeZonesList } from '@/services/common/general.service';
import { getIndianStates, getCountries } from '@/services/countriesState.service';
import CustomSelectComponent from "@/components/common/customSelectComponent";
import IndustryModal from "@/components/industryModal";
import FaCamera from '@/assets/icons/faCamera.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import { NavExpandedState } from '@/context/NavState.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import Loading from "../loading";
import { getIndustryList } from '@/services/industry.service';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils.js';
import defaultProfile from '../../../public/images/default-company-icon.png';

export default function OrganizationSetupForm() {
    const { replace } = useRouter();
    const [errors, setErrors] = useState([]);
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [isLoading, setIsLoading] = useState(true);
    const [industryList, setIndustryList] = useState([]);
    const [timeZoneList, setTimeZoneList] = useState([]);
    const [countryArray, setCountryArray] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [statesArray, getStateArray] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const { Modal } = require("bootstrap");

    const [data, setData] = useState({
        companyName: '',
        industryId: 0,
        stateId: 0,
        countryId: 0,
        currencyId: '',
        language: '',
        timeZoneId: '',
        isRegisteredForGST: true,
        GSTIN: '',
        currentInvoicing: '',
        logo: ""
    });

    useEffect(() => {
        setIsLoading(true);
        getCurrenciesData();
        getIndustryData();
        getStatesData();
        getTimeZonesData();
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
            setErrors(genrateErrorMessage(error, '', setToastList));
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
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const getCurrenciesData = async () => {
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
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const getCompanyData = async () => {
        setErrors([]);
        try {
            const result = await getCompanyDetails();
            const {logo, ...companyData} = result.data;
            setData(companyData);
            if (logo) {
                setImageSrc(logo)
            } else {
                setImageSrc(defaultProfile)
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const getIndustryData = async () => {
        try {
            const result = await getIndustryList();
            if (result.status == 200 || result.status == 201) {
                var data = result.data;
                var temp = [];
                data.forEach((elem) => {
                    temp.push({ Id: elem.id, name: elem.name })
                })
                setIndustryList(temp);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const getTimeZonesData = async () => {
        try {
            const result = await getTimeZonesList();
            if (result.status == 200 || result.status == 201) {
                var data = result.data;
                var temp = [];
                data.forEach((elem) => {
                    temp.push({ Id: elem.id, name: elem.label })
                })
                setTimeZoneList(temp);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    
    const setImage = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.files && e.target.files.length > 0) {
            var temp_data = data;
            temp_data.logoFile = e.target.files[0];
            let temp = Object.assign({}, temp_data);
            setData(temp);
            setImageSrc(URL.createObjectURL(e.target.files[0]))
        }
    }

    const removeSelectedImage = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var temp_obj = { ...data }
        temp_obj.logo = "";
        setData(temp_obj);
        setImageSrc('');
    }

    const showIndustyModal = function () {
        const addIndustyModal = new Modal("#add-industry-modal");
        addIndustyModal.show();
    }

    const [show, setShow] = useState(false);

    const handleShow = (e) => setShow(true);

    const handleInput = ({ target }) => {
        var temp_data = data;
        var name = target.name || target.getAttribute('name');
        if (name != '') {
            if (name == 'industryId' || name == 'currencyId' || name == 'stateId' || name == 'countryId' || name == 'timeZoneId' || name == 'language') {
                temp_data[name] = parseInt(target.value);
            } else {
                temp_data[name] = target.value;
            }
            let temp = Object.assign({}, temp_data);
            setData(temp);
        }
    }

    const handleCheckBoxChange = ({ target }) => {
        data[target.name] = !data[target.name];
        let temp = Object.assign({}, data);
        setData(temp);
    }

    const handleSubmit = async (e) => {
        disableSubmitButton(e.target);
        e.preventDefault();
        setErrors([]);
        var temp = data;
        if (!temp.isRegisteredForGST) {
            temp.GSTIN = "";
        }
        setData(Object.assign({}, temp));
        var myFormData = new FormData();
        myFormData.append('industryId', data.industryId);
        myFormData.append('companyName', data.companyName);
        myFormData.append('stateId', data.stateId);
        myFormData.append('countryId', data.countryId);
        myFormData.append('currencyId', data.currencyId);
        myFormData.append('language', data.language);
        myFormData.append('timeZoneId', data.timeZoneId);
        myFormData.append('isRegisteredForGST', data.isRegisteredForGST);
        myFormData.append('GSTIN', data.GSTIN);
        myFormData.append('currentInvoicing', data.currentInvoicing);
        myFormData.append('logoFile', data.logo);

        try {
            var result = await updateCompanyDetails(myFormData)
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Organization Details Updated',
                    description: '',
                }]);
                replace('/dashboard')
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        enableSubmitButton(e.target);
    }

    const imageLoader = ({ src, width, quality }) => {
        return (`${src}?w=${width}&q=${quality || 75}`);
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
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationIndustrySelect}`} data={industryList} onOptionValueChange={handleInput} optionValue={parseInt(data.industryId)} name='industryId' isDisabled={false} defaultText={'Select an Option'} isInnerButtonRequired={true} onOptionInnerButtonClick={showIndustyModal} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationLocationWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationLocationlabel}`}>Business Location <span className={`${styles.green}`}>*</span> </label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationLocationSelect}`} data={countryArray} onOptionValueChange={handleInput} optionValue={data.countryId} name={'countryId'} onOptionInnerButtonClick={handleShow} hasSearch={true} isDisabled={false} defaultText={'Select an location'} isInnerButtonRequired={true} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationStateWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationStatelabel}`}>State <span className={`${styles.green}`}>*</span></label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationStateSelect}`} data={statesArray} onOptionValueChange={handleInput} optionValue={data.stateId} name={'stateId'} isDisabled={false} defaultText={'Select a State'} hasSearch={true} isInnerButtonRequired={false} />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationCurrencyWrapper} mb-4 row`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationCurrencylabel}`}>Currency <span className={`${styles.green}`}>*</span></label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationCurrencySelect}`} data={currencies} onOptionValueChange={handleInput} optionValue={data.currencyId} name={'currencyId'} isDisabled={false} defaultText={'Select a Currency'} hasSearch={true} isInnerButtonRequired={false} />
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
                                                    <CustomSelectComponent className={`${styles.companyInvoiceOrganizationTimeZoneSelect}`} data={timeZoneList} onOptionValueChange={handleInput} optionValue={data.timeZoneId} name={'timeZoneId'} isDisabled={false} defaultText={'Select a Time Zone'} hasSearch={true} isInnerButtonRequired={false} />
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
                                                    <input name='currentInvoicing' type="text" className="form-control" id="companyInvoiceOrganizationCurrentInvoicingSelect" value={data.currentInvoicing} onChange={handleInput} placeholder=' ' />
                                                </div>
                                            </div>

                                            <div className={`${styles.companyInvoiceOrganizationImageWrapper} row mb-4`}>
                                                <div className="d-flex align-items-center col-12 col-lg-4">
                                                    <label className={`${styles.companyInvoiceOrganizationImagelabel}`}>Organization Logo</label>
                                                </div>
                                                <div className="col-12 col-lg-6 col-xl-7">
                                                    <div className={`${styles.companyInvoiceOrganizationInputFileWrapper} d-flex`}>
                                                        {imageSrc ?
                                                            <div className={`${styles.companyInvoiceOrganizationImageInputWrapper} d-flex flex-column`}>
                                                                <Image className={`${styles.companyInvoiceOrganizationImageDisplay}`} loader={imageLoader} src={imageSrc}  onError={()=>setImageSrc(defaultProfile)} width={250} height={125} alt="organization_logo" />
                                                                <span className={`${styles.companyInvoiceOrganizationImageUploadWrapper}`}>
                                                                    <p>
                                                                        This logo will be displayed in transaction PDF&apos;s and email notifications.
                                                                    </p>
                                                                    <p>
                                                                        Max File Size: 2MB
                                                                    </p>
                                                                    <span className={`${styles.companyInvoiceOrganizationRemoveLogoLink}`} onClick={(e) => { removeSelectedImage(e) }}>
                                                                        <FaCircleXmark /> <span className="ms-1">Remove Logo</span>
                                                                    </span>
                                                                </span>

                                                            </div>
                                                            :
                                                            <>
                                                                <input id="companyInvoiceOrganizationLogoInput" className={`${styles.companyInvoiceOrganizationInputFile}`} accept="image/*" type="file" onChange={setImage} />
                                                                <label className={`${styles.companyInvoiceOrganizationInputFileSVGButton} btn ms-0`} htmlFor="companyInvoiceOrganizationLogoInput">
                                                                    <FaCamera />
                                                                    Upload Image
                                                                </label>
                                                                <label htmlFor="companyInvoiceOrganizationLogoInput">We accept JPEG, PNG...</label>
                                                            </>}
                                                    </div>
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
                <IndustryModal getIndustryData={getIndustryData} setToastList={setToastList} Loading={Loading} />
            </>
        }
    </div>)
}