"use client"
import { React, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ErrorList from '../../../components/errorList';
import { verifyPasswordResetToken, resetPassword } from '../../../services/password/password.services'
import { disableSubmitButton, enableSubmitButton } from '../../../utils/form.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/resetPassword.module.scss';
import PasswordToggler from '../../../components/passwordToggler';


export default function ResetPasswordForm() {
    const formErrors = [];
    const [errors, setErrors] = useState([])
    const [data, setData] = useState({ password: '', confirmPassword: '' })
    const [isInvalidToken, SetIsInvalidToken] = useState(false)
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
                setErrors(error.response.data.message);
            }
            enableSubmitButton(event.target)
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
                                                    <i>
                                                        <FontAwesomeIcon icon={faKey} />
                                                    </i>
                                                    <input type="password" className="form-control" placeholder="Password" name="password" value={data.password} onChange={handleInput} id="password" />
                                                    <PasswordToggler refId="password" />

                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="loginConfirmPassword" className="form-label">Confirm Password</label>
                                                <div className={styles.innerInputIconWrapper}>
                                                    <i>
                                                        <FontAwesomeIcon icon={faKey} />
                                                    </i>
                                                    <input type="password" className="form-control" placeholder='Password' name="confirmPassword" value={data.confirmPassword} onChange={handleInput} id="confirm-password" />
                                                    <PasswordToggler refId="confirm-password" />

                                                </div>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button type="submit" name='btn-submit' className="btn btn-primary">Reset Password</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.loginLinkWrapper}`}>
                                <p><Link href="/login">Login</Link></p>
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