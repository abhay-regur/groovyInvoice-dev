import { useState } from 'react';
import FaSave from '../../assets/icons/faSave.svg';
import FaCircleXmark from '../../assets/icons/faCircleXmark.svg';
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

                            <div className={`${styles.companyUserPrimaryUserWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className="">Primary User</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <div className={`${styles.companyUserPrimaryUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                                        <input className={`${styles.companyUserPrimaryUserSwitch} form-check-input`} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserNameWrapper} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className="">Name</label>
                                </div>
                                {/* <div className="col-12 col-lg-2 col-xl-2">
                                    <select className={`${styles.companySalutationSelect} form-select`}>
                                        <option defaultValue>Salutation</option>
                                        <option value="ms">Ms.</option>
                                        <option value="mr">Mr.</option>
                                        <option value="mrs">Mrs.</option>
                                        <option value="dr">Dr.</option>
                                    </select>
                                </div> */}
                                <div className="col-12 col-lg-3 col-xl-3">
                                    <input type="text" className={`${styles.companyInvoiceUserFirstName} form-control`} placeholder='First Name' />
                                </div>
                                <div className="col-12 col-lg-3 col-xl-3">
                                    <input type="text" className={`${styles.companyInvoiceUserLastName} form-control`} placeholder='Last Name' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserEmailWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserEmailLabel}`}>User Email</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input type="email" className="form-control" id="companyInvoiceUserEmail" placeholder='User Email' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserPhone} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserPhoneLabel}`}>User Phone</label>
                                </div>

                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input type="text" className={`${styles.companyInvoiceUserMobile} form-control`} placeholder='Mobile' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Password</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceUserPassword" placeholder='Password' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Confirm Password</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceDesignation" placeholder='Confirm Password' />
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