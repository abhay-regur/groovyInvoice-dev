import styles from '@/styles/success.module.scss';
import Link from 'next/link';

export const metadata = {
    title: 'Registration Success',
};

export default function Success() {
    return (
        <div className={`${styles.successContainer} container-fluid`}>
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
                            <p>Sign up successful!</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.successCard} card`}>
                                <div className="card-body p-0">
                                    We have sent you a link on your registered email address. Please click on the link to verify your account.
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.registrationLinkWrapper}`}>
                                <p>{false ? <Link href="/login">Sign in</Link> : <></>}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}