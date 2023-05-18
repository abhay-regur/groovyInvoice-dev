"use client"
import { React, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/forgotPassword.module.scss';
import PasswordToggler from '../../components/passwordToggler';

export default function ResetPassword() {
    const URL = process.env.NEXT_PUBLIC_HOST;
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter()

    useEffect(() => {
        var paramObj = router.query;
        console.log(paramObj.token);
        verifyToken(paramObj.token);

    }, []);


    const verifyToken = async (token) => {
        try {
            const response = await fetch(URL + '/users/verify-password-reset/' + token, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/JSON'
                }
            });
            if (response.status == 200) {
                console.log('ok')
            } else {
                setHasError(true);
                setErrorMessage("Link Expired");
            }
        } catch (error) {
            setHasError(true);
            setErrorMessage('error');
        }
    }

    const sendData = async (data) => {
        try {
            const response = await fetch(URL + '/users/password-reset', {
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
                setHasError(true);
                setErrorMessage(responseData.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const validateLoginInput = function (event) {
        event.preventDefault();
        setHasError(false);
        setErrorMessage('');
        if (email != '') {
            let data = {
                "email": email
            }
            sendData(data);

        } else {
            setHasError(true);
            setErrorMessage('Email or Password cannot be empty');
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
                            <h2 className={styles.subHeading}>Reset <span className={styles.green}>Password</span></h2>
                            <p>Please enter new password</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.forgotPasswordCard} card`}>
                                <div className="card-body p-0">
                                    <div className={`${styles.forgotPasswordErrorMessageWrapper} ${hasError ? "" : styles.hide} `} >
                                        <div className={`${styles.forgotPasswordErrorMessage}`}>{errorMessage}</div>
                                    </div>
                                    <form onSubmit={validateLoginInput}>
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
                                            <button type="submit" className="btn btn-primary">Reset Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.loginLinkWrapper}`}>
                                {/* <p><Link href="/login">Login</Link></p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.forgotPasswordBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
            </div>
        </div>
    );
}