"use client"
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'next/navigation';
import { userActivate, userDeactivate, userDetails, updateUserDetails } from '../../../../../services/user.service';
import FaSave from '../../../../../assets/icons/faSave.svg';
import { generatePassword } from '../../../../../utils/genratePassword.utils';
import FaCircleXmark from '../../../../../assets/icons/faCircleXmark.svg';
import styles from "../../../../../styles/userForm.module.scss";
import ErrorList from '../../../../../components/errorList';
import FaGear from '../../../../../assets/icons/faGear.svg';
import { NavExpandedState } from '../../../../../context/NavState.context';
import { ToastMsgContext } from '../../../../../context/ToastMsg.context';
import Link from 'next/link';
import Loading from '../../../loading.js';

export default function UserUpdateFormComponent() {
    const currentUserId = useParams().id;
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext)
    const [errors, setErrors] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    var result = '';

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: '',
        password: '',
        confirmPassword: '',
        active: false
    })

    const handleInput = ({ target }) => {
        data[target.name] = target.value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const [isActive, setIsActive] = useState(false);
    const [userpassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        setData({ ...data, active: isActive });
    }, [isActive])

    const getUserDetails = async () => {
        setErrors([]);
        result = await userDetails(currentUserId);
        setData({ ...result.data });
        setIsActive(data.active);
        setIsLoading(false);
    }

    const genrateNewPassword = () => {
        var temp = generatePassword()
        setUserPassword(temp);
        setUserConfirmPassword(temp);
    }

    const handleSwitchChange = async () => {
        setIsLoading(true);
        setErrors([]);
        if (isActive) {
            result = await userDeactivate(currentUserId);
        } else {
            result = await userActivate(currentUserId);
        }

        if (result.status == 200) {
            setIsActive(!isActive);
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: data.firstName + ' ' + data.lastName + ' status updated',
                description: result.data.message,
            }]);
            setIsLoading(false);
        } else {
            setErrors(['Reload page and try again']);
            setIsLoading(false);
        }
    }

    const handleSaveClick = async () => {
        setErrors([]);
        try {
            result = await updateUserDetails({
                "id": data.id,
                "email": data.email,
                "companyId": data.companyId,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "cellNumber": data.cellNumber,
                "active": data.active
            });
            if (result.status == 200) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: data.firstName + ' ' + data.lastName + ' details updated',
                    description: result.data.message,
                }]);
            } else {
                setErrors(result.data.message);
            }
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }

    const handleCancelClick = () => {
        setErrors([]);
    }

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <div className="container-fluid">
                <div className={`${styles.card} card`}>
                    <div className={`${styles.cardBody} card-body`}>
                        <h4 className={`${styles.cardTitle} card-title`}>Update User</h4>

                        <hr />
                        {isLoading ?
                            <Loading /> :
                            <>
                                <div className={`${styles.companyUserActiveUserWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className="">Active</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <div className={`${styles.companyUserActiveUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                                            <input className={`${styles.companyUserActiveUserSwitch} form-check-input`} type="checkbox" onChange={handleSwitchChange} role="switch" id="flexSwitchCheckDefault" checked={data.active} />
                                        </div>
                                    </div>
                                </div>

                                <ErrorList errors={errors} />

                                <div className={`${styles.companyInvoiceUserNameWrapper} mb-0 mb-md-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className="">Name</label>
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-3">
                                        <input type="text" className={`${styles.companyInvoiceUserFirstName} form-control`} name='firstName' value={data.firstName} placeholder='First Name' onChange={handleInput} />
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-3">
                                        <input type="text" className={`${styles.companyInvoiceUserLastName} form-control`} value={data.lastName} name='lastName' placeholder='Last Name' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserEmailWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserEmailLabel}`}>Email</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input type="email" className="form-control" id="companyInvoiceUserEmail" value={data.email} name='email' placeholder='Email' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserPhone} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserPhoneLabel}`}>Phone</label>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input type="text" className={`${styles.companyInvoiceUserMobile} form-control`} value={data.cellNumber} name='cellNumber' placeholder='Mobile' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Password</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6 d-flex">
                                        <input type="text" className="form-control" value={userpassword} onInput={(e) => userpassword(e.value)} id="companyInvoiceUserPassword" placeholder='Password' disabled />
                                        <button className="btn blueOutline"><FaGear /></button>
                                        {/* <button className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button> */}
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Confirm Password</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input type="text" className="form-control" id="companyInvoiceDesignation" value={userConfirmPassword} onInput={(e) => userConfirmPassword(e.value)} placeholder='Confirm Password' disabled />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                        <div className="row">
                                            <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                                <button className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={() => { handleSaveClick() }}>
                                                    <span>
                                                        <i><FaSave /></i>
                                                        Save
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                                <Link href={'/users/'}>
                                                    <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => { handleCancelClick() }}>
                                                        <span>
                                                            <i><FaCircleXmark /></i>
                                                            Cancel
                                                        </span>
                                                    </button>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}