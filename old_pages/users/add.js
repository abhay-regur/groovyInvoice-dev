import { useLayoutEffect, useState } from 'react';
import FaSave from '../../assets/icons/faSave.svg';
import { generatePassword } from '../../utils/genratePassword.utils';
import FaCircleXmark from '../../assets/icons/faCircleXmark.svg';
import styles from "../../styles/userForm.module.scss";
import FaGear from '../../assets/icons/faGear.svg';

const AddUser = ({ navExpandedState }) => {
    // const [userTypeSelected, setuserTypeSelected] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const genrateNewPassword = () => {
        var temp = generatePassword()
        setPassword(temp);
        setConfirmPassword(temp);
    }

    return (
        <div>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                </h2>
                <div className="container-fluid">
                    <div className={`${styles.card} card`}>
                        <div className={`${styles.cardBody} card-body`}>
                            <h4 className={`${styles.cardTitle} card-title`}>Add New User</h4>

                            <hr />

                            <div className={`${styles.companyUserActiveUserWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className="">Active</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <div className={`${styles.companyUserActiveUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                                        <input className={`${styles.companyUserActiveUserSwitch} form-check-input`} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserNameWrapper} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className="">Name</label>
                                </div>
                                <div className="col-12 col-lg-3 col-xl-3">
                                    <input type="text" className={`${styles.companyInvoiceUserFirstName} form-control`} placeholder='First Name' />
                                </div>
                                <div className="col-12 col-lg-3 col-xl-3">
                                    <input type="text" className={`${styles.companyInvoiceUserLastName} form-control`} placeholder='Last Name' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserEmailWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserEmailLabel}`}>Email</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input type="email" className="form-control" id="companyInvoiceUserEmail" placeholder='Email' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserPhone} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserPhoneLabel}`}>Phone</label>
                                </div>

                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input type="text" className={`${styles.companyInvoiceUserMobile} form-control`} placeholder='Mobile' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Password</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 d-flex">
                                    <input type="text" className="form-control" value={password} onInput={(e) => setPassword(e.value)} id="companyInvoiceUserPassword" placeholder='Password' />
                                    <button className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Confirm Password</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceDesignation" value={confirmPassword} onInput={(e) => setConfirmPassword(e.value)} placeholder='Confirm Password' />
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

export default AddUser;