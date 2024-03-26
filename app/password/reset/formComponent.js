"use client"
import { React, useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ErrorList from '@/components/errorList';
import { verifyPasswordResetToken, resetPassword } from '@/services/password/password.services'
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils';
import styles from '@/styles/resetPassword.module.scss';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import PasswordInputField from '@/components/passwordInputField';


export default function ResetPasswordForm() {
    const formErrors = [];
    const [errors, setErrors] = useState([])
    const [data, setData] = useState({ password: '', confirmPassword: '' })
    const { setToastList } = useContext(ToastMsgContext);
    const [isInvalidToken, SetIsInvalidToken] = useState(false)
    const [passwordValidateErrorMessage, setPasswordValidateErrorMessage] = useState({
        password: '',
        confirmPassword: ''
    });
    const params = useSearchParams();
    const { push } = useRouter();

    useEffect(() => {
        verifyToken();
    }, []);

    const handleInput = ({ target }) => {
        data[target.name] = target.value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const verifyToken = async () => {
        try {
            await verifyPasswordResetToken(params.get('token'))
        } catch (error) {
            SetIsInvalidToken(true)
        }
    }

    const hendleSubmit = async (event) => {
        event.preventDefault();
        const token = params.get('token');
        formErrors.splice(0)
        setErrors(formErrors)
        if (formErrors.length > 0) {
            setErrors(formErrors)
            return
        } else {
            disableSubmitButton(event.target)
            try {
                await resetPassword(token, data);
                push('/password/reset/success');
            } catch (error) {
                setErrors(genrateErrorMessage(error, '', setToastList));
            }
            enableSubmitButton(event.target)
        }
    }

    const handlePasswordValidationError = (name, msg) => {
        passwordValidateErrorMessage[name] = msg;
        let temp = Object.assign({}, passwordValidateErrorMessage)
        setPasswordValidateErrorMessage(temp)
    }

    const handlePasswordValidation = ({ target }) => {
        if (target.name == 'password') {
            if (target.value == '') {
                target.classList.add('is-invalid');
                handlePasswordValidationError(target.name, 'New password is required');
            } else if (target.value.length < 8 || target.value.length > 16) {
                target.classList.add('is-invalid');
                handlePasswordValidationError(target.name, 'New password must be of 8 to 16 characters long');
            } else {
                target.classList.remove('is-invalid');
                handlePasswordValidationError(target.name, '');
            }
        } else if (target.name == 'confirmPassword') {
            if (target.value == '') {
                handlePasswordValidationError(target.name, 'Confirm password is required');
                target.classList.add('is-invalid');
            } else if (target.value != data.password) {
                handlePasswordValidationError(target.name, 'New password and confirm password must be same');
                target.classList.add('is-invalid');
            } else {
                handlePasswordValidationError(target.name, '');
                target.classList.remove('is-invalid');
            }
        }
    }

    return (
        <div className={`${styles.resetPasswordContainer} container-fluid`}>
            <div className="row mx-0">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center justify-content-md-start">
                            <h1 className={`${styles.mainHeading} main-heading`}>Groovy <span className={styles.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h2 className={styles.subHeading}>Reset <span className={styles.green}>Password</span></h2>
                            <p>Please enter new password</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.resetPasswordCard} card`}>
                                <div className="card-body p-0">
                                    <ErrorList errors={errors} />
                                    {isInvalidToken ? (
                                        <div> Token is invalid, Please check once or try again. </div>
                                    ) : (
                                        <form onSubmit={hendleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                                <div className={styles.innerInputIconWrapper}>
                                                    <PasswordInputField className={`form-control`} placeholder="Password" showKeyIcon={true} name="password" value={data.password} onBlur={handlePasswordValidation} onChange={handleInput} />
                                                </div>
                                                <div htmlFor="currentPassword" className="ms-3 invalid-data">
                                                    {passwordValidateErrorMessage.password}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="loginConfirmPassword" className="form-label">Confirm Password</label>
                                                <div className={styles.innerInputIconWrapper}>
                                                    <PasswordInputField className={`form-control`} placeholder="Confirm Password" showKeyIcon={true} name="confirmPassword" value={data.confirmPassword} onBlur={handlePasswordValidation} onChange={handleInput} />
                                                </div>
                                                <div htmlFor="currentPassword" className="ms-3 invalid-data">
                                                    {passwordValidateErrorMessage.confirmPassword}
                                                </div>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button type="submit" name='btn-submit' className="btn btn-primary">
                                                    <span>Reset Password</span>
                                                </button>
                                            </div>
                                        </form>
                                    )}
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
                <div className={`${styles.resetPasswordBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
            </div>
        </div>
    )
}