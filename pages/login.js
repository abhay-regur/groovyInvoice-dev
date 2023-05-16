"use client"
import { React, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FaGoogle from '../assets/icons/faGoogle.svg';
import FaFacebook from '../assets/icons/faFacebook.svg';
import styles from '../styles/login.module.scss';
import { disableSubmitButton, enableSubmitButton } from '../utils/form.utils'
import ErrorList from '../components/errorList';
import { login } from '../services/users/users-login';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { push } = useRouter();
    const [errors, setErrors] = useState([])
    const formErrors = []
    const [visbilty, setvisibility] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const handleInput = ({ target }) => {
        data[target.name] = target.value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        formErrors.splice(0)
        setErrors(formErrors)

        if (data.username.trim() === '') {
            formErrors.push('Email Address is required')
        }
        if (data.password.trim() === '') {
            formErrors.push('Password is required')
        }

        if (formErrors.length > 0) {
            setErrors(formErrors)
            return
        } else {
            try {
                disableSubmitButton(e.target)
                await login(data)
                push('/')
            } catch (error) {
                setErrors(error.response.data.message)
            }
            enableSubmitButton(e.target)
        }
    }

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
                                    <ErrorList errors={errors} />

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="loginEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder='Email' id="loginEmail" name="username" value={data.username} onChange={handleInput} aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type={visbilty ? "text" : "password"} placeholder="Password" className="form-control" name="password" value={data.password} onChange={handleInput} id="loginPassword" />
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
                                                <span className={`${styles.companyInvoiceLoginPageForgotPassword}`}><Link href="/password/forgot">Forgot Password?</Link></span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" name="btn-submit" className="btn btn-primary">Sign In</button>
                                        </div>
                                    </form>
                                    <hr />
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className={`${styles.loginButtonFacebook} btn btn-outline-secondary d-flex jutify-content-around`}><i className={styles.buttonImage} ><FaFacebook /></i> Sign In</button>
                                        <button type="button" className={`${styles.loginButtonGoogle} btn btn-outline-secondary d-flex jutify-content-around`} onClick={() => signIn('google')}><i className={styles.buttonImage}><FaGoogle /></i> Sign In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.registrationLinkWrapper}`}>
                                <p>Don’t have an account? <Link href="/registration">Register Account</Link></p>
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