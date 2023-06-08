import React from 'react'
import styles from '../../styles/success.module.scss';
import Link from 'next/link';
import Head from 'next/head';

export default function Success(props) {
    return (
        <div className={`${styles.successContainer} container-fluid`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className={`${styles.successBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center justify-content-md-start">
                            <h1 className={`${styles.mainHeading} main-heading`}>Groovy <span className={styles.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h2 className={styles.subHeading}>Success</h2>
                            <p>{props.message.subHeading}</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.successCard} card`}>
                                <div className="card-body p-0">
                                    {props.message.message}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.registrationLinkWrapper}`}>
                                <p>{props.message.showLink ? <Link href="/login">Sign in</Link> : <></>}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
