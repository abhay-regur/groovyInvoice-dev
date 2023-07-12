import { useContext, useState, useEffect } from 'react';
import { getCountries, getStates } from '../../../services/profile.service';
import FaSave from '../../../assets/icons/faSave.svg';
import FaCircleXmark from '../../../assets/icons/faCircleXmark.svg';
import SelectComponent from '../../../components/selectComponent';
export default function CompanyComponent() {
    const [countries, setCountries] = useState()
    const [states, setStates] = useState()
    const [seletedCountryId, setSeletedCountryId] = useState("");
    const [seletedStateId, setSeletedStateId] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const [companyData, setCompanyData] = useState({
        companyName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateId: 0,
        countryId: 0,
        postCode: ""
    });

    useEffect(() => {
        getCountryData();
    }, []);

    useEffect(() => {
        if (seletedCountryId != "") {
            setSeletedStateId("");
            getStateData(seletedCountryId);
        } else {
            setSeletedStateId("");
            setStates([]);
        }
    }, [seletedCountryId]);

    const getStateData = async (id) => {
        setErrors([]);
        if (id != "") {
            const result = await getStates(id);
            var data = result.data;
            var temp = [];
            for (var i = 0; data.length > i; i++) {
                temp.push({ name: data[i].name, Id: data[i].id });
            }
            setStates(temp);
        }
    }

    const getCountryData = async () => {
        setErrors([]);
        const result = await getCountries();
        var data = result.data;
        var temp = [];
        for (var i = 0; data.length > i; i++) {
            temp.push({ name: data[i].name, Id: data[i].id });
        }
        setCountries(temp);
        setIsLoading(false);
    }


    return (
        <div className="col-12">
            <div className={`${styles.profileCard} card`}>
                <div className="card-body">
                    <div className={`${styles.companyDetailsWrapper}`}>
                        <h3>Company Details</h3>
                        <hr />
                        <div className="row">
                            <div className="col-sm-2">
                            </div>
                            <div className="col-sm-8">
                                <div className={`${styles.companyInvoiceCompanyNameWrapper} mb-1 mb-md-4 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoiceCompanyName}`}>Company Name</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control" id="companyInvoiceCompanyName" placeholder='Company Name' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                            </div>
                            <div className="col-sm-8">
                                <div className={`${styles.companyInvoiceCompanyAddress1Wrapper} mb-1 mb-md-4 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoiceCompanyAddress1}`}>Address 1</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control" id="companyInvoiceCompanyAddress1" placeholder='Address' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                            </div>
                            <div className="col-sm-8">
                                <div className={`${styles.companyInvoiceCompanyAddress2Wrapper} mb-1 mb-md-4 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoiceCompanyAddress2}`}>Address 2</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control" id="companyInvoiceCompanyAddress2" placeholder='Address' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                            </div>
                            <div className="col-sm-3">
                                <div className={`${styles.companyInvoiceCompanyCountryyWrapper} mb-1 mb-md-4 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoiceCompanyCountry}`}>Country</label>
                                    </div>
                                    <div className="col-12">
                                        <SelectComponent data={countries} setSeletedId={setSeletedCountryId} seletedId={seletedCountryId} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className={`${styles.companyInvoiceCompanyStateWrapper} mb-1 mb-md-4 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoiceCompanyState}`}>State</label>
                                    </div>
                                    <div className="col-12">
                                        <SelectComponent data={states} setSeletedId={setSeletedStateId} seletedId={seletedStateId} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className={`${styles.companyInvoiceCompanyCityWrapper} mb-1 mb-md-4 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoiceCompanyCity}`}>City</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control" id="companyInvoiceCompanyCity" placeholder='City' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                            </div>
                            <div className="col-sm-8">
                                <div className={`${styles.companyInvoiceCompanyPostCodeWrapper} mb-1 mb-md-4 row`}>
                                    <div className="col-12 mb-2">
                                        <label className={`${styles.companyInvoiceCompanyPostCode}`}>Postal Code</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control" id="companyInvoiceCompanyPostCode" placeholder='Postal Code' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                <div className="row">
                                    <div className="col-6 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                        <button className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={() => { console.log('Save'); }}>
                                            <span>
                                                <i><FaSave /></i>
                                                Save
                                            </span>
                                        </button>
                                    </div>
                                    <div className="col-6 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                        <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => { console.log('Cancel'); }}>
                                            <span>
                                                <i><FaCircleXmark /></i>
                                                Cancel
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}