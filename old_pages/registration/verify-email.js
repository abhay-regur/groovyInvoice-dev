import React, { useEffect, useState } from 'react'
import styles from '../../styles/registration.module.scss';
import Head from 'next/head';
import ErrorList from '../../components/errorList';
import { useRouter } from 'next/router';
import { verifyEmail } from '../../services/users/registration.service';

export default function VerifyEmail() {
    const [errors, setErrors] = useState([])
    const router = useRouter();
    const { token } = router.query;

    const verifyTokenHandler = async () => {
        if (token !== '') {
            try {
                await verifyEmail(token)
                router.push('/login')
            } catch (e) {

                setErrors(e.response.data.message)
            }
        }
    }

    useEffect(() => {
        if (router.isReady) {
            verifyTokenHandler(token);
        }
    }, [router.isReady])
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
