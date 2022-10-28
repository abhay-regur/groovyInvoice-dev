import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Style from '../styles/Login.module.css';
export default function login(){
    return(
        <div className='.container-fluid'>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="row mx-0">
                <div className="col-md-6">
                <h1 className='main-heading'>Groovy <span className='green'>Invoice</span></h1>
                <h2 className='subheading'>Sign Up to <span>Groovy Invoice</span></h2>
                <p>Welcome back, Please login to your account</p>
                    <div className="card" style={{width: 28+'rem;'}}>
                        <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="loginEmail" className="form-label">Email address</label>
                                <FontAwesomeIcon icon={faEnvelope}/> 
                                <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                <div className="inputWithIcon">
                                    <FontAwesomeIcon icon={faKey}/> 
                                    <input type="password" className="form-control" id="loginPassword"/>
                                    <FontAwesomeIcon icon={faEye}/> 
                                    <FontAwesomeIcon icon={faEyeSlash}/> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="keepLogged"/>
                                    <label className="form-check-label" htmlFor="keepLogged">Keep me logged in</label>
                                </div>  
                                </div>
                                <div className="col-sm-6">
                                <Link href="/"><a>Forgot Password</a></Link>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className='backgroundImage'></div>
                </div>
            </div>
        </div>
    );
}