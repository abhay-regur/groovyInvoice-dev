"use client"
import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from '@/styles/registration.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileRetro, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { signUp } from '@/services/users/registration.service';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils';
import { validateInput } from '@/services/common/general.service'
import { useRouter } from 'next/navigation';
import ErrorList from '@/components/errorList';
import PasswordInputField from '@/components/passwordInputField';

export default function RegistrationForm() {
    const { push } = useRouter();
    const [errors, setErrors] = useState([]);

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
        cellNumber: 'Cannot be empty',
        password: '',
        confirmPassword: ''
    });

    const handleInput = ({ target }) => {
        data[target.name] = target.value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        disableSubmitButton(e.target)
        try {
            await signUp(data)
            push('/registration/success');
        } catch (e) {
            console.log(e);
            setErrors(e.response.data.message)
        }
        enableSubmitButton(e.target)
    }

    const addLoader = ({ target }) => {
        if (!target.classList.contains('is-loading')) {
            if (target.classList.contains('is-valid')) target.classList.remove('is-valid');
            if (target.classList.contains('is-invalid')) target.classList.remove('is-invalid');
            target.classList.add('is-loading')
        }
    }

    const handleValidation = async ({ target }) => {
        if (target.classList.contains('is-loading')) target.classList.remove('is-loading')

        if (target.name == 'email' && target.value == '') {
            handleValidationError(target.name, 'Email is Required');
        } else {
            try {
                var result = await validateInput(target.name, target.value)
                if (result.status == 200) {
                    target.classList.add('is-valid');
                }
            } catch (e) {
                handleValidationError(target.name, e.response.data.message);
                target.classList.add('is-invalid');
            }
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
                                    <ErrorList errors={errors} />
                                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="registrationCompanyName" className="form-label">Company Name</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faBriefcase} /></i>
                                                <input type="text" className="form-control" placeholder='Company Name' id="registrationCompanyName" name="companyName" value={data.companyName} onChange={handleInput} onKeyDown={addLoader} onBlur={handleValidation} aria-describedby="companyNameHelp" required />
                                                <div htmlFor="registrationCompanyName" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.companyName}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="registrationEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder="Email address" id="registrationEmail" name="email" value={data.email} onChange={handleInput} onKeyDown={addLoader} onBlur={handleValidation} aria-describedby="emailHelp" required />
                                                <div htmlFor="registrationEmail" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="registrationContactNumber" className="form-label">Contact Number</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faMobileRetro} /></i>
                                                <input type="text" className="form-control" placeholder="Contact Number" id="registrationContactNumber" name="cellNumber" value={data.cellNumber} onChange={handleInput} onKeyDown={addLoader} onBlur={handleValidation} aria-describedby="contactNumberHelp" required />
                                                <div htmlFor="registrationContactNumber" className="ms-3 invalid-feedback">
                                                    {validateErrorMessage.cellNumber}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <PasswordInputField placeholder="Password" showKeyIcon={true} name="password" value={data.password} onChange={handleInput} onBlur={handleValidation} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 has-validation">
                                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <PasswordInputField placeholder="Confirm Password" showKeyIcon={true} name="confirmPassword" value={data.confirmPassword} onChange={handleInput} onBlur={handleValidation} required />
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