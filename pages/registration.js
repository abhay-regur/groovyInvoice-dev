import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/registration.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faMobileRetro, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import PasswordToggler from '../components/passwordToggler';

export default function Registration() {
    const URL = process.env.NEXT_PUBLIC_HOST;
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false)
    const [email, setEmail] = useState("");
    const [comapnyName, setComapnyName] = useState("");
    const [cellNumber, setCellNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const sendData = async (data) => {
        try {
            const response = await fetch(URL + '/company-users/sign-up', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/JSON'
                }
            });

            const responseData = await response.json();
            if (typeof (responseData.access_token) != 'undefined' && responseData.access_token != "") {
                localStorage.setItem("accessToken", responseData.access_token);
                document.location.pathname = '/';
            } else {
                console.log(responseData.statusCode);
                setHasError(true);
                setErrorMessage(responseData.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = function (event) {
        setHasError(false);
        setErrorMessage('');
        event.preventDefault();
        if (email != '' && cellNumber != "" && password != "" && confirmPassword != "" && comapnyName != "") {
            let data = {
                "email": email,
                "companyId": comapnyName,
                "firstName": "John",
                "lastName": "Doe",
                "cellNumber": cellNumber,
                "password": password,
                "confirmPassword": confirmPassword
            };
            sendData(data);
        } else {
            setHasError(true);
            setErrorMessage('No input can be empty');
        }

    }

    return (
        <div className={`${styles.loginContainer} container-fluid`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className={`${styles.loginBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center justify-content-md-start">
                            <h1 className={`${styles.mainHeading} main-heading`}>Groovy <span className={styles.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h2 className={styles.subHeading}>Sign Up to <span className={styles.green}>Groovy Invoice</span></h2>
                            <p>Getting Started! Please create your account</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.loginCard} card`}>
                                <div className="card-body p-0">
                                    <div className={`${styles.loginErrorMessageWrapper} ${hasError ? "" : styles.hide} mb-2`} >
                                        <div className={`${styles.loginErrorMessage}`}>{errorMessage}</div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="registrationCompanyName" className="form-label">Company Name</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faBriefcase} /></i>
                                                <input type="text" className="form-control" placeholder='Company Name' id="registrationCompanyName" value={comapnyName} onChange={(e) => { setComapnyName(e.target.value); setHasError(false); setErrorMessage(''); }} aria-describedby="companyNameHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="registrationEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder="Email address" id="registrationEmail" value={email} onChange={(e) => { setEmail(e.target.value); setHasError(false); setErrorMessage(''); }} aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="registrationContactNumber" className="form-label">Contact Number</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faMobileRetro} /></i>
                                                <input type="text" className="form-control" placeholder="Contact Number" id="registrationContactNumber" value={cellNumber} onChange={(e) => { setCellNumber(e.target.value); setHasError(false); setErrorMessage(''); }} aria-describedby="contactNumberHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); setHasError(false); setErrorMessage(''); }} id="password" />
                                                <PasswordToggler refId="password" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginConfirmPassword" className="form-label">Confirm Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type="password" className="form-control" placeholder='Password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setHasError(false); setErrorMessage(''); }} id="confirm-password" />
                                                <PasswordToggler refId="confirm-password" />
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">Create an Account</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.registrationLinkWrapper}`}>
                                <p>Already have an account? <Link href="/login">Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}