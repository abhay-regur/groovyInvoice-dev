"use client"
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import FaGoogle from '@/assets/icons/faGoogle.svg';
import FaFacebook from '@/assets/icons/faFacebook.svg';
import styles from '@/styles/login.module.scss';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils'
import ErrorList from '@/components/errorList';
import { login } from '@/services/users/auth.service';
import PasswordInputField from '@/components/passwordInputField';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { useRouter } from 'next/navigation';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';



export default function LoginForm() {
    const { session } = useParams();
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState([])
    const { setToastList } = useContext(ToastMsgContext);
    const formErrors = []


    useEffect(() => {
        if ((session != null || session != '') && session == 'expired') {
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Login Expired',
                description: 'The Login session has expired, Please login again!',
            }]);
        }
    }, [])

    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const [validateErrorMessage, setvalidateErrorMessage] = useState("");

    const handleInput = ({ target }) => {
        data[target.name] = target.value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleValidation = async ({ target }) => {
        if (target.classList.contains('is-loading')) target.classList.remove('is-loading')
        if (target.name == 'username') {
            if (target.value == '') {
                target.classList.add('is-invalid');
                setvalidateErrorMessage('Email should not be empty');
            } else if (!target.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                target.classList.add('is-invalid');
                setvalidateErrorMessage('Email Format is incorrect');
            }
        }
    }

    const addLoader = ({ target }) => {
        if (!target.classList.contains('is-loading')) {
            if (target.classList.contains('is-valid')) target.classList.remove('is-valid');
            if (target.classList.contains('is-invalid')) target.classList.remove('is-invalid');
            target.classList.add('is-loading')
        }
    }

    const toggleRememberMe = () => {
        setRememberMe(current => !current)
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
                const result = await login(data, rememberMe);
                if (result.data.profileCompleted) {
                    router.push('/')
                } else {
                    router.push('/organization-setup')
                }
            } catch (error) {
                console.log(error)
                if (typeof error.response !== 'undefined' && typeof error.response.status !== 'undefined' && typeof error.response.data.message !== 'undefined') {
                    var status = error.response.status;
                    if (status == '404' || status == '401') {
                        setErrors("Username or Password is incorrect please try again.")
                    } else {
                        setErrors(genrateErrorMessage(error, '', setToastList))
                    }
                } else {
                    setErrors('Internal Error occurred!');
                }
            }
            enableSubmitButton(e.target)
        }
    }



    return (
        <div className={`${styles.loginContainer} container-fluid`}>
            <div className="row mx-0">
                <div className={`${styles.loginInnerWrapper} col-md-6`}>
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
                                                <input type="email" className="form-control" placeholder="Email address" id="loginEmail" name="username" value={data.username} onChange={handleInput} onKeyDown={addLoader} onBlur={handleValidation} aria-describedby="emailHelp" autoComplete="off" required />
                                                <div htmlFor="loginEmail" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <PasswordInputField placeholder="Password" className={`form-control`} id='loginPassword' showKeyIcon={true} name="password" value={data.password} onChange={handleInput} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 justify-content-md-start pe-0">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="keepLogged" value={rememberMe} onChange={toggleRememberMe} />
                                                    <label className="form-check-label" htmlFor="keepLogged">Keep me logged in</label>
                                                </div>
                                            </div>
                                            <div className="col-6 justify-content-md-end text-end">
                                                <span className={`${styles.companyInvoiceLoginPageForgotPassword}`}><Link href="/password/forgot">Forgot Password?</Link></span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" name="btn-submit" className="btn btn-primary">
                                                <span>Sign In</span>
                                            </button>
                                        </div>
                                    </form>
                                    <hr />
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className={`${styles.loginButtonFacebook} btn btn-outline-secondary d-flex jutify-content-around`}><i className={styles.buttonImage} ><FaFacebook /></i> Sign In</button>
                                        <button type="button" className={`${styles.loginButtonGoogle} btn btn-outline-secondary d-flex jutify-content-around`}><i className={styles.buttonImage}><FaGoogle /></i> Sign In</button>
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
    )
}
