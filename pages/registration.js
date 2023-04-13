import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/registration.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash, faMobileRetro, faBriefcase } from '@fortawesome/free-solid-svg-icons';
export default function Registration() {
    const [visbilty, setvisibility] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [comapnyName, setComapnyName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setName] = React.useState("");
    const [cellNumber, setCellNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const togglePasswordVisiblity = () => {
        setvisibility(visbilty ? false : true);
    };

    const handleSubmit = function (event) {
        event.preventDefault();
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="registrationCompanyName" className="form-label">Company Name</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faBriefcase} /></i>
                                                <input type="text" className="form-control" placeholder='Company Name' id="registrationCompanyName" value={comapnyName} onChange={(e) => setComapnyName(e.target.value)} aria-describedby="companyNameHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="registrationEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder="Email address" id="registrationEmail" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="registrationContactNumber" className="form-label">Contact Number</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faMobileRetro} /></i>
                                                <input type="email" className="form-control" placeholder="Contact Number" id="registrationContactNumber" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} aria-describedby="contactNumberHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type={visbilty ? "text" : "password"} className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} id="loginPassword" />
                                                <i className={`${styles.toggleVisibilityWrapper}`} onClick={togglePasswordVisiblity}>
                                                    <FontAwesomeIcon icon={visbilty ? faEyeSlash : faEye} />
                                                </i>

                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginConfirmPassword" className="form-label">Confirm Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type={visbilty ? "text" : "password"} className="form-control" placeholder='Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="loginConfirmPassword" />
                                                <i className={`${styles.toggleVisibilityWrapper}`} onClick={togglePasswordVisiblity}>
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
                            <div className={`${styles.registrationLinkWrapper}`}>
                                <p>Already have an account? <Link href="/login"><a>Sign in</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}