import { React, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/login.module.scss';
export default function Login() {
    const [visbilty, setvisibility] = useState(false);
    const togglePasswordVisiblity = () => {
        setvisibility(visbilty ? false : true);
    };

    return (
        <div className={`${styles.loginContainer} container-fluid`}>
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
                            <h2 className={styles.subHeading}>Sign Up to <span className={styles.green}>Groovy Invoice</span></h2>
                            <p>Welcome back, Please login to your account</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.loginCard} card`}>
                                <div className="card-body p-0">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="loginEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder='Email' id="loginEmail" aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type={visbilty ? "text" : "password"} placeholder="Password" className="form-control" id="loginPassword" />
                                                <i className={`${styles.toggleVisibilityWrapper}`} onClick={togglePasswordVisiblity}>
                                                    <FontAwesomeIcon icon={visbilty ? faEyeSlash : faEye} />
                                                </i>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 justify-content-md-start pe-0">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="keepLogged" />
                                                    <label className="form-check-label" htmlFor="keepLogged">Keep me logged in</label>
                                                </div>
                                            </div>
                                            <div className="col-6 justify-content-md-end text-end">
                                                <Link href="/"><a>Forgot Password</a></Link>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">Sign In</button>
                                        </div>
                                    </form>
                                    <hr />
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className={`${styles.loginButtonFacebook} btn btn-outline-secondary d-flex jutify-content-around`}><i className={styles.buttonImage} ><FontAwesomeIcon icon={faFacebook} /></i> Sign In</button>
                                        <button type="button" className={`${styles.loginButtonGoogle} btn btn-outline-secondary d-flex jutify-content-around`}><i className={styles.buttonImage}><FontAwesomeIcon icon={faGoogle} /></i> Sign In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.registrationLinkWrapper}`}>
                                <p>Don’t have an account? <Link href="/registration"><a>Register Account</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.loginBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
            </div>
        </div>
    );
}