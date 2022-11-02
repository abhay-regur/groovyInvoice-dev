import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import style from '../styles/Registration.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash, faMobileRetro } from '@fortawesome/free-solid-svg-icons';
export default function Registration() {
    const [visbilty, setvisibility] = React.useState(false);
    const togglePasswordVisiblity = () => {
        setvisibility(visbilty ? false : true);
    };
    return (
        <div className={`${style.loginContainer} container-fluid`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className={`${style.loginBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12 text-center text-sm-center">
                            <h1 className={`${style.mainHeading} main-heading`}>Groovy <span className={style.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h2 className={style.subHeading}>Sign Up to <span className={style.green}>Groovy Invoice</span></h2>
                            <p>Getting Started! Please create your account</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${style.loginCard} card`}>
                                <div className="card-body p-0">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="registrationCompanyName" className="form-label">Comapny Name</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="text" className="form-control" id="registrationCompanyName" aria-describedby="companyNameHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="registrationEmail" className="form-label">Email address</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" id="registrationEmail" aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="registrationContactNumber" className="form-label">Contact Number</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faMobileRetro} /></i>
                                                <input type="email" className="form-control" id="registrationContactNumber" aria-describedby="contactNumberHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type={visbilty ? "text" : "password"} className="form-control" id="loginPassword" />
                                                <i className={`${style.toggleVisibilityWrapper}`} onClick={togglePasswordVisiblity}>
                                                    <FontAwesomeIcon icon={visbilty ? faEyeSlash : faEye} />
                                                </i>

                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginConfirmPassword" className="form-label">Confirm Password</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type={visbilty ? "text" : "password"} className="form-control" id="loginConfirmPassword" />
                                                <i className={`${style.toggleVisibilityWrapper}`} onClick={togglePasswordVisiblity}>
                                                    <FontAwesomeIcon icon={visbilty ? faEyeSlash : faEye} />
                                                </i>

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
                            <div className={`${style.registrationLinkWrapper}`}>
                                <p>Already have an account? <Link href="/login"><a>Sign in</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}