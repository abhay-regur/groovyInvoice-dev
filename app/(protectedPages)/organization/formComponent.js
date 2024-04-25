'use client'
import Image from "next/image";
import { useContext, useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import { getCompanyDetails, updateCompanyDetails, deleteCurrentLogo } from '@/services/companies.service';
import { getCurrencies, getTimeZonesList } from '@/services/common/general.service';
import { getIndianStates, getCountries } from '@/services/countriesState.service';
import { getIndustryList } from '@/services/industry.service';
import { NavExpandedState } from '@/context/NavState.context';
import ErrorList from '@/components/errorList';
import FaSave from '@/assets/icons/faSave.svg';
import FaBan from '@/assets/icons/faBan.svg';
import IndustryModal from "@/components/industryModal";
import Loading from "../loading";
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import CustomSelectComponent from "@/components/common/customSelectComponent";
import { ToastMsgContext } from '@/context/ToastMsg.context';
import styles from '@/styles/organization.module.scss';
import Breadcrumb from '@/components/common/breadcrumb';
import FaCamera from '@/assets/icons/faCamera.svg';
import { useCurrentUserData } from "@/context/CurrentUserData.context";
import { DATE_FORMATE_LIST } from "constants";
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import defaultProfile from '../../../public/images/default-company-icon.png';
import { useRouter } from "next/navigation";

export default function OrganizationUpdateForm() {
    const { back } = useRouter()
    const logoInputRef = useRef(null)
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [industryList, setIndustryList] = useState([]);
    const [timeZoneList, setTimeZoneList] = useState([]);
    const [countryArray, setCountryArray] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [statesArray, getStateArray] = useState([]);
    const [hasLogo, setHasLogo] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false);
    const { userInfo, setUserInfo } = useCurrentUserData()
    const [imageSrc, setImageSrc] = useState(null);
    const { Modal } = require("bootstrap");

    const [data, setData] = useState({
        companyName: '',
        industryId: 0,
        stateId: 0,
        countryId: 0,
        currencyId: null,
        language: '',
        timeZoneId: null,
        isRegisteredForGST: true,
        GSTIN: '',
        currentInvoicing: '',
        logo: '',
        dateFormat: '',
        logoFile: ''
    });

    useEffect(() => {
        setIsLoading(true);
        Promise.allSettled([getCurrenciesData(), getIndustryData(), getStatesData(), getTimeZonesData(), getCountriesData(), getCompanyData()]).then(() => setIsLoading(false))

    }, []);

    useState(() => {
        console.log('Hello');
        if (imageSrc == '' && logoInputRef.current != null) {
            logoInputRef.current.click();
        }

    }, [imageSrc])


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
            setIsLoading(false);
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
            const { logo, ...companyData } = result.data;
            setData(companyData);
            if (logo) {
                setImageSrc(logo);
                setHasLogo(true)
            } else {
                setHasLogo(false)
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        setIsLoading(false);
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
            if (['stateId', 'countryId', 'currencyId', 'timeZoneId', 'industryId'].includes(name)) {
                temp_data[name] = parseInt(target.value);
            } else {
                temp_data[name] = target.value;
            }
            let temp = Object.assign({}, temp_data);
            setData(temp);
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
        $('#companyInvoiceOrganizationLogoInput').val('');
        var temp_data = data;
        temp_data.logoFile = '';
        let temp = Object.assign({}, temp_data);
        setData(temp);
        setImageSrc('');
    }

    const handleCheckBoxChange = ({ target }) => {
        data[target.name] = !data[target.name];
        let temp = Object.assign({}, data);
        setData(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsSubmit(true);
        var temp = data;
        if (!temp.isRegisteredForGST) {
            temp.GSTIN = "";
        }
        var tempcurrentUserData = { ...userInfo };
        var myFormData = new FormData();
        myFormData.append('companyName', temp.companyName);
        if (temp.industryId) { myFormData.append('industryId', parseInt(temp.industryId)) };
        if (temp.stateId) { myFormData.append('stateId', parseInt(temp.stateId)) };
        if (temp.countryId) { myFormData.append('countryId', parseInt(temp.countryId)) };
        if (temp.currencyId) { myFormData.append('currencyId', parseInt(temp.currencyId)) };
        myFormData.append('language', temp.language);
        if (temp.timeZoneId) { myFormData.append('timeZoneId', parseInt(temp.timeZoneId)) };
        myFormData.append('isRegisteredForGST', temp.isRegisteredForGST);
        myFormData.append('GSTIN', temp.GSTIN);
        myFormData.append('currentInvoicing', temp.currentInvoicing);
        myFormData.append('dateFormat', temp.dateFormat);
        myFormData.append('logoFile', temp.logoFile);

        tempcurrentUserData.companyName = temp.companyName;
        tempcurrentUserData.currencyId = parseInt(temp.currencyId);

        try {
            var result = await updateCompanyDetails(myFormData)
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Organization Details Updated',
                    description: '',
                }]);
                if (imageSrc !== "") setHasLogo(true);
                setUserInfo(Object.assign({}, tempcurrentUserData));
                setIsSubmit(false);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsSubmit(false);
        }
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        back();
    }

    const imageLoader = ({ src, width, quality }) => {
        return (`${src}?w=${width}&q=${quality || 75}`);
    }

    const deleteCurrentImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            deleteCurrentLogo().then(() => {
                setHasLogo(false);
                setImageSrc('');
                getCompanyData();
            });
        } catch (error) {

        }
    }

    return (
        <div className={styles.container}>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="breadcrumbWrapper">
                    <Breadcrumb />
                </div>
                {
                    isLoading ? <Loading /> :
                        <div className="main">
                            <div className={`${styles.companyDetailsWrapper}`}>
                                <h4 className={`${styles.title}`}>Organization Details</h4>
                                <div className={`${styles.organizationCard} card`}>
                                    <div className="card-body p-4">
                                        <div className={`${styles.form} mb4 row`}>
                                            <ErrorList errors={errors} />
                                            <form >

                                                <div className={`${styles.companyInvoiceOrganizationNameWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceCompanyOrganizationName}`}>Organization Name</label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <input name='companyName' type="text" className="form-control" id="companyInvoiceOrganizationName" value={data.companyName} onChange={handleInput} placeholder='Organization Name' />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationIndustryWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationIndustrylabel}`}>Industry </label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <CustomSelectComponent className={`${styles.companyInvoiceOrganizationIndustrySelect}`} data={industryList} onOptionValueChange={handleInput} optionValue={parseInt(data.industryId)} name='industryId' isDisabled={false} defaultText={'Select an Option'} isInnerButtonRequired={true} onOptionInnerButtonClick={showIndustyModal} />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationLocationWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationLocationlabel}`}>Business Location <span className={`${styles.green}`}>*</span> </label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <CustomSelectComponent className={`${styles.companyInvoiceOrganizationLocationSelect}`} data={countryArray} onOptionValueChange={handleInput} optionValue={data.countryId} name={'countryId'} onOptionInnerButtonClick={handleShow} hasSearch={true} isDisabled={false} defaultText={'Select an location'} isInnerButtonRequired={false} multiple={true} />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationStateWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationStatelabel}`}>State <span className={`${styles.green}`}>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <CustomSelectComponent className={`${styles.companyInvoiceOrganizationStateSelect}`} data={statesArray} onOptionValueChange={handleInput} optionValue={data.stateId} name={'stateId'} isDisabled={false} defaultText={'Select a State'} hasSearch={true} isInnerButtonRequired={false} multiple={true} />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationCurrencyWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationCurrencylabel}`}>Currency <span className={`${styles.green}`}>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <CustomSelectComponent className={`${styles.companyInvoiceOrganizationCurrencySelect}`} data={currencies} onOptionValueChange={handleInput} optionValue={data.currencyId} name={'currencyId'} isDisabled={false} defaultText={'Select a Currency'} hasSearch={true} isInnerButtonRequired={false} />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationLanguageWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationLanguagelabel}`}>Language <span className={`${styles.green}`}>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <CustomSelectComponent className={`${styles.companyInvoiceOrganizationLanguageSelect}`} data={[{ Id: "1", name: 'English' }]} onOptionValueChange={handleInput} optionValue={1} name={'language'} isDisabled={true} defaultText={'Select a Languange'} isInnerButtonRequired={false} />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationDateFormatWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationDateFormatlabel}`}>Date Format<span className={`${styles.green}`}>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <CustomSelectComponent
                                                            className={`${styles.companyInvoiceOrganizationTimeZoneSelect}`}
                                                            data={DATE_FORMATE_LIST}
                                                            onOptionValueChange={handleInput}
                                                            optionValue={data.dateFormat}
                                                            name={'dateFormat'}
                                                            isDisabled={false}
                                                            defaultText={'Select a Date format'}
                                                            hasSearch={false}
                                                            isInnerButtonRequired={false}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationTimeZoneWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationTimeZonelabel}`}>Time Zone <span className={`${styles.green}`}>*</span></label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <CustomSelectComponent className={`${styles.companyInvoiceOrganizationTimeZoneSelect}`} data={timeZoneList} onOptionValueChange={handleInput} optionValue={data.timeZoneId} name={'timeZoneId'} isDisabled={false} defaultText={'Select a Time Zone'} hasSearch={true} isInnerButtonRequired={false} />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationGSTWrapper} gap-2 mb-4 row`}>
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
                                                    <div className={`${styles.companyInvoiceOrganizationGSTINWrapper} gap-2 mb-4 row`}>
                                                        <div className="d-flex align-items-center col-12 col-lg-4">
                                                            <label className={`${styles.companyInvoiceOrganizationGSTlabel}`}>GST Number <span className={`${styles.green}`}>*</span></label>
                                                        </div>
                                                        <div className="col-12 col-lg-6 col-xl-7">
                                                            <input name='GSTIN' type="text" className="form-control" id="companyInvoiceNewOrganizationGSTIN" value={data.GSTIN} onChange={handleInput} placeholder='GSTIN' />
                                                        </div>
                                                    </div>
                                                    : ''
                                                }

                                                <div className={`${styles.companyInvoiceOrganizationCurrentInvoicingWrapper} gap-2 mb-4 row`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationCurrentInvoicinglabel}`}>How are you managing invoicing currently? </label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <input name='currentInvoicing' type="text" className="form-control" id="companyInvoiceOrganizationCurrentInvoicingSelect" value={data.currentInvoicing == 'undefined' || data.currentInvoicing == 'null' ? 'N.A' : data.currentInvoicing} onChange={handleInput} placeholder=' ' />
                                                    </div>
                                                </div>

                                                <div className={`${styles.companyInvoiceOrganizationImageWrapper} gap-2 row mb-4`}>
                                                    <div className="d-flex align-items-center col-12 col-lg-4">
                                                        <label className={`${styles.companyInvoiceOrganizationImagelabel}`}>Organization Logo</label>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-7">
                                                        <div className={`${styles.companyInvoiceOrganizationInputFileWrapper} d-flex`}>
                                                            {imageSrc ?
                                                                <div className={`${styles.companyInvoiceOrganizationImageInputWrapper}`}>
                                                                    <span className={`${styles.companyInvoiceOrganizationImageWrapper} position-relative`}>
                                                                        <Image className={`${styles.companyInvoiceOrganizationImageDisplay}`} loader={imageLoader} onError={() => setImageSrc(defaultProfile)} src={imageSrc} width={250} height={125} alt="organization_logo" />
                                                                        <span className={`${styles.companyInvoiceOrganizationRemoveLogoLink} position-absolute bottom-0 right-0`} onClick={(e) => { removeSelectedImage(e) }}>
                                                                            <FaBan />
                                                                        </span>
                                                                    </span>
                                                                    <span className={`${styles.companyInvoiceOrganizationImageUploadWrapper}`}>
                                                                        <p>
                                                                            This logo will be displayed in transaction PDF&apos;s and email notifications.
                                                                        </p>
                                                                        <p>
                                                                            Max File Size: 2MB
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                                :
                                                                <>
                                                                    <input id="companyInvoiceOrganizationLogoInput" className={`${styles.companyInvoiceOrganizationInputFile}`} ref={logoInputRef} accept="image/*" type="file" onChange={setImage} />
                                                                    <label className={`${styles.companyInvoiceOrganizationInputFileSVGButton} btn ms-0`} htmlFor="companyInvoiceOrganizationLogoInput" >
                                                                        <FaCamera />
                                                                        Upload Image
                                                                    </label>
                                                                    <label htmlFor="companyInvoiceOrganizationLogoInput">We accept JPEG, PNG...</label>
                                                                </>}

                                                            {
                                                                hasLogo ? <button className="btn blue" onClick={deleteCurrentImage}>Delete Logo</button> : <></>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="d-flex gap-3 col-12 col-sm-10 col-md-5 col-lg-7 col-xl-5">
                                                        <button className={`${styles.companyInvoiceSaveSendButton} btn blue`} onClick={(e) => { handleSubmit(e) }}>
                                                            {
                                                                isSubmit ?
                                                                    <span className={`d-flex align-items-center`}>
                                                                        <span className={`spinner-border spinner-border-sm text-light`} role="status">
                                                                        </span>
                                                                        <span className="status ms-1">Loading</span>
                                                                    </span>
                                                                    :
                                                                    <span>
                                                                        <i className="pe-1"><FaSave /></i>
                                                                        Save
                                                                    </span>
                                                            }
                                                        </button>
                                                        <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={(e) => { cancelHandler(e); }}>
                                                            <span>
                                                                <i className="pe-1"><FaCircleXmark /></i>
                                                                Cancel
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <IndustryModal getIndustryData={getIndustryData} setToastList={setToastList} Loading={Loading} />
                        </div>
                }
            </main >
        </div >
    )
}