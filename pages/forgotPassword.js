"use client"
import { React, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FaGoogle from '../assets/icons/faGoogle.svg';
import FaFacebook from '../assets/icons/faFacebook.svg';
import styles from '../styles/forgotPassword.module.scss';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
    const URL = process.env.NEXT_PUBLIC_HOST;
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [email, setEmail] = useState("");
    const { data, status } = useSession();


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


            // signIn('credentials', {
            //     redirect: false,
            //     email,
            //     password
            // })
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
                            <h2 className={styles.subHeading}>Forgot <span className={styles.green}>Password?</span></h2>
                            <p>Please enter your registered Email Id</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.forgotPasswordCard} card`}>
                                <div className="card-body p-0">
                                    <div className={`${styles.forgotPasswordErrorMessageWrapper} ${hasError ? "" : styles.hide} `} >
                                        <div className={`${styles.forgotPasswordErrorMessage}`}>{errorMessage}</div>
                                    </div>
                                    <form onSubmit={validateLoginInput}>
                                        <div className="mb-3">
                                            <label htmlFor="forgotPasswordEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder='Email' id="forgotPasswordEmail" value={email} onChange={(e) => { setEmail(e.target.value); setHasError(false); setErrorMessage('') }} aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">Forgot Password</button>
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
            </div>
        </div>
    );
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        border: '1px solid #E3EBF2',
    },
};