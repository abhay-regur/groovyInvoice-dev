"use client"
import { useState, useContext } from "react";
import Link from 'next/link';
import styles from '@/styles/registration.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileRetro, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { signUp } from '@/services/users/registration.service';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils';
import { validateInput } from '@/services/common/general.service'
import { useRouter } from 'next/navigation';
import ErrorList from '@/components/errorList';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import PasswordInputField from '@/components/passwordInputField';

export default function RegistrationForm() {
    const { push } = useRouter();
    const [errors, setErrors] = useState([]);
    const { setToastList } = useContext(ToastMsgContext);

    const [data, setData] = useState({
        email: '',
        companyName: '',
        cellNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [validateErrorMessage, setvalidateErrorMessage] = useState({
        email: 'Cannot be empty',
        companyName: 'Cannot be empty',
        cellNumber: 'Cell phone number must be valid',
        password: 'Cannot be empty',
        confirmPassword: 'Cannot be empty'
    });

    const handleInput = ({ target }) => {
        if (target.name == 'cellNumber') {
            data[target.name] = (target.value == '' ? '' : target.value.replace(/[^\d\+]/g, ''));
        } else {
            data[target.name] = target.value
        }
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        disableSubmitButton(e.target)
        try {
            await signUp(data)
            push('/registration/success');
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        enableSubmitButton(e.target)
    }

    const handleValidation = async ({ target }) => {
        if (target.classList.contains('is-loading')) target.classList.remove('is-loading')
        if (target.value == '') {
            target.classList.add('is-invalid');
            handleValidationError(target.name, 'Can not be empty');
        } else if (target.name == 'cellNumber') {
            const regexp = /^\d{10}$/;
            if (regexp.test(target.value)) {
                target.classList.add('is-valid');
            } else {
                target.classList.add('is-invalid');
            }
        } else if (target.name == 'password' || target.name == 'confirmPassword') {
            if (target.value == '') {
                handleValidationError(target.name, 'Password is required');
                target.classList.add('is-invalid');
            } else if (target.value.length < 8 || target.value.length > 16) {
                handleValidationError(target.name, 'Password must be of 8 to 16 characters long');
                target.classList.add('is-invalid');
            } else {
                handleValidationError(target.name, '');
                target.classList.remove('is-invalid');
                target.classList.add('is-valid');
            }

        } else {
            try {
                var result = await validateInput(target.name, encodeURIComponent(target.value))
                if (result.status == 200) {
                    target.classList.add('is-valid');
                }
            } catch (e) {
                handleValidationError(target.name, e.response.data.message);
                target.classList.add('is-invalid');
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

    const handleValidationError = (name, msg) => {
        validateErrorMessage[name] = msg;
        let temp = Object.assign({}, validateErrorMessage)
        setvalidateErrorMessage(temp);
    }

    return (
        <div className={`${styles.loginContainer} container-fluid`}>
            <div className="row mx-0">
                <div className={`${styles.loginBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
                <div className={`${styles.loginInnerWrapper} col-md-6`}>
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
                                    <ErrorList errors={errors} />
                                    <form onSubmit={handleSubmit} className="needs-validation">
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="registrationCompanyName" className="form-label">Company Name</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faBriefcase} /></i>
                                                <input type="text" className="form-control" placeholder='Company Name' id="registrationCompanyName" name="companyName" value={data.companyName} onChange={handleInput} onKeyDown={addLoader} onBlur={handleValidation} aria-describedby="companyNameHelp" autoComplete="off" required />
                                                <div htmlFor="registrationCompanyName" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.companyName}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="registrationEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder="Email address" id="registrationEmail" name="email" value={data.email} onChange={handleInput} onKeyDown={addLoader} onBlur={handleValidation} aria-describedby="emailHelp" autoComplete="off" required />
                                                <div htmlFor="registrationEmail" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="registrationContactNumber" className="form-label">Contact Number</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faMobileRetro} /></i>
                                                <input type="tel" minLength={4} maxLength={13} className="form-control" placeholder="Contact Number" id="registrationContactNumber" name="cellNumber" value={data.cellNumber} onChange={handleInput} onKeyDown={addLoader} onBlur={handleValidation} aria-describedby="contactNumberHelp" autoComplete="off" required />
                                                <div htmlFor="registrationContactNumber" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.cellNumber}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <PasswordInputField className={`form-control ${styles.companyInvoiceRegistrationPassword}`} placeholder="Password" showKeyIcon={true} name="password" value={data.password} onChange={handleInput} onBlur={handleValidation} required />
                                                <div htmlFor="registrationPassword" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.password}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <PasswordInputField className={`form-control ${styles.companyInvoiceRegistrationPassword}`} placeholder="Confirm Password" showKeyIcon={true} name="confirmPassword" value={data.confirmPassword} onChange={handleInput} onBlur={handleValidation} required />
                                                <div htmlFor="confirmPassword" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.confirmPassword}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" name="btn-submit" className="btn btn-primary">
                                                <span>Create an Account</span>
                                            </button>
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