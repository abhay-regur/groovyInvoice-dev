"use client"
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import FaSave from '@/assets/icons/faSave.svg';
import { generatePassword } from '@/utils/genratePassword.utils';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import styles from "@/styles/userForm.module.scss";
import FaGear from '@/assets/icons/faGear.svg';
import { NavExpandedState } from '@/context/NavState.context';
import ErrorList from '@/components/errorList';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { createUser } from '@/services/user.service';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils'
import { useRouter } from 'next/navigation';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import Loading from './loading';

export default function UserUpdateFormComponent() {
    const { replace } = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: '',
        password: '',
        confirmPassword: '',
        active: false
    });

    useEffect(() => {
        setTimeout(function () {
            setIsLoading(false);
        }, 1500);
    });

    const genrateNewPassword = () => {
        const password = generatePassword()
        data.password = password
        data.confirmPassword = password
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleInput = ({ target }) => {
        data[target.name] = target.value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleCheckBoxChange = ({ target }) => {
        data[target.name] = !data[target.name]
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        disableSubmitButton(e.target)
        try {
            var result = await createUser(data);
            setData({
                firstName: '',
                lastName: '',
                email: '',
                cellNumber: '',
                password: '',
                confirmPassword: '',
                active: false
            })
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: data.firstName + ' ' + data.lastName + ' added successfully',
                    description: result.data.message,
                }]);
                // window.location.pathname = '/users/';
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
        }
        enableSubmitButton(e.target)
    }

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <div className="container-fluid">
                {isLoading ?
                    <Loading /> :
                    <div className={`${styles.card} card`}>
                        <div className={`${styles.cardBody} card-body`}>
                            <h4 className={`${styles.cardTitle} card-title`}>Add New User</h4>

                            <hr />

                            <ErrorList errors={errors} />
                            <form onSubmit={handleSubmit}>
                                <div className={`${styles.companyUserActiveUserWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className="">Active</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <div className={`${styles.companyUserActiveUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                                            <input className={`${styles.companyUserActiveUserSwitch} form-check-input`} type="checkbox" role="switch" id="flexSwitchCheckDefault" name='active' checked={data.active} onChange={handleCheckBoxChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserNameWrapper} mb-0 mb-md-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className="">Name</label>
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-3">
                                        <input type="text" className={`${styles.companyInvoiceUserFirstName} form-control`} placeholder='First Name' onChange={handleInput} name='firstName' value={data.firstName} />
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-3">
                                        <input type="text" className={`${styles.companyInvoiceUserLastName} form-control`} placeholder='Last Name' onChange={handleInput} name='lastName' value={data.lastName} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserEmailWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserEmailLabel}`}>Email</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input type="email" className="form-control" id="companyInvoiceUserEmail" placeholder='Email' onChange={handleInput} name='email' value={data.email} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserPhone} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserPhoneLabel}`}>Phone</label>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input type="text" className={`${styles.companyInvoiceUserMobile} form-control`} placeholder='Mobile' onChange={handleInput} name='cellNumber' value={data.cellNumber} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Password</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6 d-flex">
                                        <input type="text" className="form-control" value={data.password} name="password" onChange={handleInput} id="companyInvoiceUserPassword" placeholder='Password' />
                                        <button type="button" className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button>
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Confirm Password</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <input type="text" className="form-control" id="companyInvoiceDesignation" value={data.confirmPassword} name="confirmPassword" onChange={handleInput} placeholder='Confirm Password' />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                        <div className="row">
                                            <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                                <button type="submit" name="btn-submit" className={`${styles.companyInvoiceSavenSendButton} btn blue`}>
                                                    <span>
                                                        <i><FaSave /></i>
                                                        Save
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                                <button type="button" className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => replace('/users')}>
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
                    </div>}
            </div>
        </main>
    )
}