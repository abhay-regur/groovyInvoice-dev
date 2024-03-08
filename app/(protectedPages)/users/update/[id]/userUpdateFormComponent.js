"use client"
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { userDetails, updateUserDetails } from '@/services/user.service';
import FaSave from '@/assets/icons/faSave.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import styles from "@/styles/userForm.module.scss";
import ErrorList from '@/components/errorList';
import { NavExpandedState } from '@/context/NavState.context';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import Breadcrumb from '@/components/common/breadcrumb';
import Link from 'next/link';
import Loading from './loading.js';

export default function UserUpdateFormComponent() {
    const { id } = useParams();
    const { replace } = useRouter();
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext)
    const [errors, setErrors] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);

    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: '',
        active: false
    })

    const handleInput = ({ target }) => {
        if (target.name == 'phone') {
            data[target.name] = (target.value == '' ? '' : (target.value).match(/[0-9]+/g)[0]);
        } else {
            data[target.name] = target.value;
        }
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSwitchChange = async ({ target }) => {
        data[target.name] = !data[target.name]
        let temp = Object.assign({}, data)
        setData(temp)
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        setErrors([]);
        try {
            const result = await userDetails(id);
            setData(result.data);
            setIsLoading(false);
        } catch (error) {
            if (error.response != undefined && error.response.status == 404) {
                replace('/404');
            } else {
                setErrors(genrateErrorMessage(error, '', setToastList));
                setIsLoading(false);
            }
        }
    }

    const handleSaveClick = async (e) => {
        setErrors([]);
        setIsSubmit(true);
        try {
            const result = await updateUserDetails(id, data);
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: data.firstName + ' ' + data.lastName + ' details updated',
                description: result.data.message,
            }]);
            setIsSubmit(false);
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsSubmit(false);
        }
    }

    const handleCancelClick = () => {
        setErrors([]);
    }

    return (
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <div className="breadcrumbWrapper">
                <Breadcrumb styles={styles} />
            </div>
            <div className="container-fluid">
                <div className={`${styles.card} card`}>
                    <div className={`${styles.cardBody} card-body`}>
                        <h4 className={`${styles.cardTitle} card-title`}>Update User</h4>

                        <hr />
                        {isLoading ?
                            <Loading /> :
                            <>
                                <div className={`${styles.companyUserActiveUserWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                                        <label className="">Active</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6">
                                        <div className={`${styles.companyUserActiveUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                                            <input className={`${styles.companyUserActiveUserSwitch} form-check-input`} type="checkbox" role="switch" id="flexSwitchCheckDefault" name='active' checked={data.active} onChange={handleSwitchChange} />
                                        </div>
                                    </div>
                                </div>

                                <ErrorList errors={errors} />

                                <div className={`${styles.companyInvoiceUserNameWrapper} mb-0 mb-md-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                                        <label className="">Name</label>
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-3">
                                        <input type="text" className={`${styles.companyInvoiceUserFirstName} form-control`} name='firstName' value={data.firstName == null ? '' : data.firstName} placeholder='First Name' onChange={handleInput} />
                                    </div>
                                    <div className="col-12 col-lg-3 col-xl-3">
                                        <input type="text" className={`${styles.companyInvoiceUserLastName} form-control`} value={data.lastName == null ? '' : data.lastName} name='lastName' placeholder='Last Name' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserEmailWrapper} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserEmailLabel}`}>Email</label>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input type="email" className="form-control" id="companyInvoiceUserEmail" value={data.email} name='email' placeholder='Email' disabled />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceUserPhone} mb-4 row`}>
                                    <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                                        <label className={`${styles.companyInvoiceUserPhoneLabel}`}>Phone</label>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                        <input type="tel" minLength={4} maxLength={13} className={`${styles.companyInvoiceUserMobile} form-control`} value={data.cellNumber} name='cellNumber' placeholder='Mobile' onChange={handleInput} />
                                    </div>
                                </div>

                                <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-5">
                                        <div className="d-flex gap-3">
                                            <button className={`${styles.companyInvoiceSavenSendButton} btn blue`} name='btn-submit' onClick={(e) => { handleSaveClick(e) }}>
                                                {
                                                    isSubmit ?
                                                        <span className={`d-flex align-items-center`}>
                                                            <span className={`spinner-border spinner-border-sm text-light`} role="status">
                                                            </span>
                                                            <span className="status ms-1">Loading</span>
                                                        </span>
                                                        :
                                                        <span>
                                                            <i><FaSave /></i>
                                                            Save
                                                        </span>
                                                }
                                            </button>
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
                            </>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}