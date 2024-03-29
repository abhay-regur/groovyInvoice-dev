"use client"
import { useState, useContext } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { forgotPassword } from '@/services/password/password.services.js';
import ErrorList from '@/components/errorList';
import styles from '@/styles/forgotPassword.module.scss';
import { useRouter } from 'next/navigation';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils';



export default function ForgotPasswordForm() {
    const formErrors = [];
    const { push } = useRouter();
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);
    const [data, setData] = useState({ email: '' });
    const [validateErrorMessage, setvalidateErrorMessage] = useState("");

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
                push('/password/forgot/success');
            } catch (error) {
                setErrors(genrateErrorMessage(error, '', setToastList));
                enableSubmitButton(e.target)
            }
        }
    }

    const handleValidation = ({ target }) => {
        if (target.classList.contains('is-loading')) target.classList.remove('is-loading')
        if (target.name == 'email') {
            if (target.value == '') {
                target.classList.add('is-invalid');
                setvalidateErrorMessage('Email should not be empty');
            } else if (!target.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                target.classList.add('is-invalid');
                setvalidateErrorMessage('Email Format is incorrect');
            }
        }
    }


    return (
        <div className={`${styles.forgotPasswordContainer} container-fluid`}>
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
                                                <input type="email" className="form-control" name='email' placeholder='Email' id="forgotPasswordEmail" onChange={handleInput} onBlur={handleValidation} aria-describedby="emailHelp" required />
                                                <div htmlFor="forgotPasswordEmail" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button name='btn-submit' type="submit" className="btn btn-primary">
                                                <span>Forgot Password</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.loginLinkWrapper} mt-4`}>
                                <p>Back to <Link href="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.forgotPasswordBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
            </div>
        </div>
    )
}