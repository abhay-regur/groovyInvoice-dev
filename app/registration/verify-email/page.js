"use client"
import React, { useEffect, useState, useContext } from 'react'
import styles from '@/styles/registration.module.scss';
import Head from 'next/head';
import ErrorList from '@/components/errorList';
import { useRouter, useSearchParams } from 'next/navigation';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import { verifyEmail } from '@/services/users/registration.service';


export default function VerifyEmail() {
    const [errors, setErrors] = useState([])
    const { push } = useRouter();
    const { setToastList } = useContext(ToastMsgContext);
    const searchParams = useSearchParams();
    const token = searchParams.get('token')

    const verifyTokenHandler = async () => {
        if (token !== '') {
            try {
                await verifyEmail(token)
                push('/login')
            } catch (error) {
                setErrors(genrateErrorMessage(error, '', setToastList));
            }
        }
    }

    useEffect(() => {
        verifyTokenHandler(token);
    }, [])

    return (
        <div className={`${styles.loginContainer} container-fluid`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className={`${styles.loginBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
                <div className={`${styles.loginInnerWrapper} col-md-6`}>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center justify-content-md-start">
                            <h1 className={`${styles.mainHeading} main-heading`}>Groovy <span className={styles.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.loginCard} card`}>
                                <div className="card-body p-0">
                                    <ErrorList errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}