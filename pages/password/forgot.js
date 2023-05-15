"use client"
import { React, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Toast from '../../components/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/forgotPassword.module.scss';
import { useRouter } from 'next/router';
import { forgotPassword } from '../../services/password/password.services.js';
import ErrorList from '../../components/errorList';
import { disableSubmitButton, enableSubmitButton } from '../../utils/form.utils';

export default function ForgotPassword() {
    const formErrors = [];
    const { push } = useRouter();
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState({ email: '' });
    const [list, setList] = useState([]);

    const handleInput = ({ target }) => {
        data[target.name] = target.value;
        let temp = Object.assign({}, data);
        setData(temp);
    }

    const handelSubmit = async (e) => {
        e.preventDefault();

        formErrors.splice(0)
        setErrors(formErrors);

        if (data.email.trim() === '') {
            formErrors.push('Valid Email Address is required')
        }

        if (formErrors.length > 0) {
            setErrors(formErrors)
            return
        } else {
            try {
                disableSubmitButton(e.target)
                await forgotPassword(data)
                setList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Email Sent',
                    description: 'Please check your email for reset link!',
                }])

                setTimeout(function () {
                    push('/login');
                }, 6000);
            } catch (error) {
                setErrors(error.response.data.message)
            }
            enableSubmitButton(e.target)
        }
    }


    return (
        <div className={`${styles.forgotPasswordContainer} container-fluid`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center justify-content-md-start">
                            <h1 className={`${styles.mainHeading} main-heading`}>Groovy <span className={styles.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h2 className={styles.subHeading}>Forgot <span className={styles.green}>Password?</span></h2>
                            <p>Please enter your registered Email Id</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.forgotPasswordCard} card`}>
                                <div className="card-body p-0">
                                    <ErrorList errors={errors} />
                                    <form id="forgot-form" onSubmit={handelSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="forgotPasswordEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" name='email' placeholder='Email' id="forgotPasswordEmail" onChange={handleInput} aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button name='btn-submit' type="submit" className="btn btn-primary">Forgot Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.loginLinkWrapper}`}>
                                <p><Link href="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.forgotPasswordBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
                <Toast
                    toastList={list}
                    autoDeleteTime={4000}
                />
            </div>
        </div>
    );
}