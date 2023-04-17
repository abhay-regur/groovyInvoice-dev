import { React, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FaGoogle from '../assets/icons/faGoogle.svg';
import FaFacebook from '../assets/icons/faFacebook.svg';
import styles from '../styles/login.module.scss';
import ModalForgotPassword from '../components/modalForgotPassword.js'
import Modal from 'react-modal';
import { useRouter } from 'next/router';

Modal.setAppElement('#__next');

export default function Login() {
    const URL = process.env.NEXT_PUBLIC_HOST;
    const [visbilty, setvisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const togglePasswordVisiblity = () => {
        setvisibility(visbilty ? false : true);
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    const sendData = async (data) => {
        try {
            const response = await fetch(URL + '/company-users/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/JSON'
                }
            });

            const responseData = await response.json();

            if (typeof (responseData.access_token) != 'undefined' && responseData.access_token != "") {
                localStorage.setItem("accessToken", responseData.access_token);
                document.location.pathname = '/';
            } else {
                console.log(responseData.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const validateLoginInput = function (event) {
        event.preventDefault();
        if (email != '' && password != '') {
            let data = {
                "username": email,
                "password": password
            }
            sendData(data);
        } else {
            console.log('Email or Password cannot be Empty')
        }
    }
    return (
        <div className={`${styles.loginContainer} container-fluid`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center justify-content-md-start">
                            <h1 className={`${styles.mainHeading} main-heading`}>Groovy <span className={styles.green}>Invoice</span></h1>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h2 className={styles.subHeading}>Sign Up to <span className={styles.green}>Groovy Invoice</span></h2>
                            <p>Welcome back, Please login to your account</p>
                        </div>
                        <div className="col-sm-12 justify-content-md-center">
                            <div className={`${styles.loginCard} card`}>
                                <div className="card-body p-0">
                                    <form onSubmit={validateLoginInput}>
                                        <div className="mb-3">
                                            <label htmlFor="loginEmail" className="form-label">Email address</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                                <input type="email" className="form-control" placeholder='Email' id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <div className={styles.innerInputIconWrapper}>
                                                <i>
                                                    <FontAwesomeIcon icon={faKey} />
                                                </i>
                                                <input type={visbilty ? "text" : "password"} placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="loginPassword" />
                                                <i className={`${styles.toggleVisibilityWrapper}`} onClick={togglePasswordVisiblity}>
                                                    <FontAwesomeIcon icon={visbilty ? faEyeSlash : faEye} />
                                                </i>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 justify-content-md-start pe-0">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="keepLogged" />
                                                    <label className="form-check-label" htmlFor="keepLogged">Keep me logged in</label>
                                                </div>
                                            </div>
                                            <div className="col-6 justify-content-md-end text-end">
                                                <span className={`${styles.companyInvoiceLoginPageForgotPassword}`} onClick={openModal}>Forgot Password?</span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">Sign In</button>
                                        </div>
                                    </form>
                                    <hr />
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className={`${styles.loginButtonFacebook} btn btn-outline-secondary d-flex jutify-content-around`}><i className={styles.buttonImage} ><FaFacebook /></i> Sign In</button>
                                        <button type="button" className={`${styles.loginButtonGoogle} btn btn-outline-secondary d-flex jutify-content-around`}><i className={styles.buttonImage}><FaGoogle /></i> Sign In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className={`${styles.registrationLinkWrapper}`}>
                                <p>Don’t have an account? <Link href="/registration"><a>Register Account</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.loginBackground} col-md-6 .d-none .d-lg-block .d-xl-none`}>
                </div>
            </div>

            <Modal
                className={styles.passwordResetModel}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Forgot Password Modal"
            >
                <ModalForgotPassword closeModal={closeModal} faEnvelope={faEnvelope} comment={comment} setComment={setComment} submitComment={submitComment} />

                {/* <div className={`${styles.mainModelWrapper}`}>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={closeModal}></button>
                    </div>
                    <h2 ref={(_mainModelHeading) => (mainModelHeading = _mainModelHeading)}>Forgot Password</h2>
                    <div className="mb-3">
                        <label ref={(_forgottonEmailLabel) => (forgottonEmailLabel = _forgottonEmailLabel)} htmlFor="loginEmail" className="form-label">Email address</label>
                        <div className={`input-group position-relative ${styles.innerInputIconWrapper}`}>
                            <i ref={(_iconTag) => (iconTag = _iconTag)} className={`${styles.iconTag}`}><FontAwesomeIcon icon={faEnvelope} /></i>
                            <input ref={(_emailInput) => (emailInput = _emailInput)} type="email" className="form-control" placeholder='Email' value={comment} onChange={(e) => setComment(e.target.value)} aria-describedby="emailHelp" />
                            <button className="btn btn-primary" type="button" onClick={submitComment}>Submit</button>
                        </div>
                    </div>
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="forgotPasswordEmail" placeholder="Email" value={comment} onChange={(e) => setComment(e.target.value)} aria-label="Email" />
                        </div>
                        <button className="btn btn-outline-secondary" onClick={fetchComments}>Fetch Comment</button>
                        {comments.map((comment) => {
                            return (
                                <div key={comment.id}>
                                    {comment.id} {comment.name} {comment.email}
                                    <button className="btn btn-outline-secondary" onClick={() => { deleteComment(comment.id) }}>delete</button>
                                </div>
                            )
                        })}
                    </div>
                </div> */}
            </Modal>
        </div>
    );
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        border: '1px solid #E3EBF2',
    },
};