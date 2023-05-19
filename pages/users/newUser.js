import { useState } from 'react';
import RadioButton from '../../components/radioButton';
import FaSkype from '../../assets/icons/faSkype.svg';
import FaSave from '../../assets/icons/faSave.svg';
import FaCircleXmark from '../../assets/icons/faCircleXmark.svg';
import FaExclamationCircle from '../../assets/icons/faExclamationCircle.svg';
import styles from "../../styles/newUser.module.scss";

const NewUser = ({ navExpandedState }) => {
    const [userTypeSelected, setuserTypeSelected] = useState();

    const handleBusinessChange = () => {
        setuserTypeSelected('business');
    };

    const handleIndividualChange = () => {
        setuserTypeSelected('individual');
    };

    return (
        <div>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    New User
                </h2>
                <div className="container-fluid">
                    <div className={`${styles.card} card`}>
                        <div className={`${styles.cardBody} card-body`}>
                            <h4 className={`${styles.cardTitle} card-title`}>UserDetails</h4>

                            <hr />

                            <div className={`${styles.companyUserTypeOptionWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className="">Primay User</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <span className={`${styles.companyUserTypeSelectorMainWrapper}`}>
                                        <span className={`${styles.userTypeBusinessRadioButtonWrapper} d-flex align-items-center`}>
                                            <RadioButton
                                                label="Business"
                                                value={userTypeSelected === 'business'}
                                                onChange={handleBusinessChange}
                                            />
                                        </span>
                                        <span className={`${styles.userTypeIndividualRadioButtonWrapper} d-flex align-items-center`}>
                                            <RadioButton
                                                label="Individual"
                                                value={userTypeSelected === 'individual'}
                                                onChange={handleIndividualChange}
                                            />
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceNameWrapper} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className="">Name</label>
                                </div>
                                <div className="col-12 col-lg-2 col-xl-2">
                                    <select className={`${styles.companySalutationSelect} form-select`}>
                                        <option defaultValue>Salutation</option>
                                        <option value="ms">Ms.</option>
                                        <option value="mr">Mr.</option>
                                        <option value="mrs">Mrs.</option>
                                        <option value="dr">Dr.</option>
                                    </select>
                                </div>
                                <div className="col-12 col-lg-3 col-xl-2">
                                    <input type="text" className={`${styles.companyInvoiceNewUserFirstName} form-control`} placeholder='First Name' />
                                </div>
                                <div className="col-12 col-lg-3 col-xl-2">
                                    <input type="text" className={`${styles.companyInvoiceNewUserLastName} form-control`} placeholder='Last Name' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceCompanyEmailWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceCompanyEmailLabel}`}>User Email</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input type="email" className="form-control" id="companyInvoiceCompanyEmail" placeholder='Company Email' />
                                    <FaExclamationCircle />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceCompanyPhone} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceCompanyPhoneLabel}`}>User Phone</label>
                                </div>

                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input type="text" className={`${styles.companyInvoiceCompanyMobile} form-control`} placeholder='Mobile' />
                                    <FaExclamationCircle />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceDesignationWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceDesignationlabel}`}>Password</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceDesignation" placeholder='Password' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceDepartmentWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceDepartmentLabel}`}>Confirm Password</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceDepartment" placeholder='Confirm Password' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                                <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                    <div className="row">
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                            <button className={`${styles.companyInvoiceSavenSendButton} btn blue`}>
                                                <span>
                                                    <i><FaSave /></i>
                                                    Save
                                                </span>
                                            </button>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                            <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`}>
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
            </main>
        </div>
    )
}

export default NewUser;