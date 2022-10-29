import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import style from '../styles/Login.module.scss';
export default function login() {
    return (
        <div className={`${style.loginContainer} container-fluid`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className={`${style.mainHeading} main-heading`}>Groovy <span className={style.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center justify-content-md-center">
                            <h2 className={style.subHeading}>Sign Up to <span className={style.green}>Groovy Invoice</span></h2>
                            <p>Welcome back, Please login to your account</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${style.loginCard} card`}>
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="loginEmail" className="form-label">Email address</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={style.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type="password" className="form-control" id="loginPassword" />
                                                <i className=''>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                </i>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 justify-content-md-start">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="keepLogged" />
                                                    <label className="form-check-label" htmlFor="keepLogged">Keep me logged in</label>
                                                </div>
                                            </div>
                                            <div className="col-6 justify-content-md-end">
                                                <Link href="/"><a>Forgot Password</a></Link>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">Sign In</button>
                                        </div>
                                    </form>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div>
                                <p>Don’t have an account? <Link href="/"><a>Register Account</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.loginBackground} col-md-6`}>
                </div>
            </div>
        </div>
    );
}