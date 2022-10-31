import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import style from '../styles/Login.module.scss';
export default function login() {
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
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12 text-center text-sm-center">
                            <h1 className={`${style.mainHeading} main-heading`}>Groovy <span className={style.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h2 className={style.subHeading}>Sign Up to <span className={style.green}>Groovy Invoice</span></h2>
                            <p>Welcome back, Please login to your account</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${style.loginCard} card`}>
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="loginEmail" className="form-label">Email address</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" />
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
                                        <div className="row">
                                            <div className="col-6 justify-content-md-start">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="keepLogged" />
                                                    <label className="form-check-label" htmlFor="keepLogged">Keep me logged in</label>
                                                </div>
                                            </div>
                                            <div className="col-6 justify-content-md-end">
                                                <Link href="/"><a>Forgot Password</a></Link>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">Sign In</button>
                                        </div>
                                    </form>
                                    <hr />
                                    <div className="d-flex justify-content-around">
                                        <button type="button" className="btn btn-outline-secondary d-flex jutify-content-around"> <Image className={style.buttonImage} src="/images/facebook_signin.svg" alt="facebook_signin" height={30} width={30} /> Sign In</button>
                                        <button type="button" className="btn btn-outline-secondary d-flex jutify-content-around"><Image className={style.buttonImage} src="/images/google_signin.svg" alt="google_signin" height={30} width={30} /> Sign In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${style.registrationLinkWrapper}`}>
                                <p>Don’t have an account? <Link href="/"><a>Register Account</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.loginBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
            </div>
        </div>
    );
}