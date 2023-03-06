import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/viewInvoice.module.scss';
import ViewInvoiceTable from '../components/viewInvoiceTable.js';
import FaPen from '../assets/icons/faPen.svg';
import FaMail from '../assets/icons/faEnvelopeGreen.svg';
import FaShare from '../assets/icons/faShare.svg';
import FaBell from '../assets/icons/faBell.svg';
import FaPDF from '../assets/icons/faPDF.svg';
import FaRupee from '../assets/icons/faRupee.svg';
import FaDropDown from '../assets/icons/faDropDownGreen.svg';


export default function ViewInvoice({ navExpandedState }) {

    const [actionBarExpandedState, setactionBarExpandedState] = useState(false)
    return (<>
        <div className={styles.container}>
            <Head>
                <title>Groovy Invoice</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <div className="container-fluid">
                    <div className={`${styles.comapnyInvoiceViewInvoiceHeadWrapper} row`}>
                        <div className={`${styles.comapnyInvoiceViewInvoiceMainHeading} col-9 col-md-10 col-lg-7`}>Maximus Tempor <span className={`${styles.comapnyInvoiceViewInvoiceSubHeading}`}>#2022/09-04</span></div>
                        <div className={`${styles.companyInvoiceViewInvoiceActionBarWrapper} col-12 col-lg-7`}>
                            <nav className={`${styles.companyInvoiceViewInvoiceActionBar} navbar navbar-expand-lg`}>
                                <div className="container-fluid">
                                    <span className={`${styles.companyInvoiceViewInvoiceActionBarAction} navbar-brand`}>Action</span>
                                    <button className={`${actionBarExpandedState ? styles.rotate : ""} navbar-toggler`} type="button" onClick={() => { setactionBarExpandedState(prevCheck => !prevCheck) }}>
                                        <FaDropDown />
                                    </button>
                                    <div className={`${styles.companyInvoiceViewInvoiceActionBarCollapse} ${actionBarExpandedState ? "" : styles.collapse} navbar-collapse`} id="navbarNavDropdown">
                                        <ul className={`${styles.companyInvoiceViewInvoiceActionBarnavbarNav} navbar-nav`}>
                                            <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item`}>
                                                <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText} nav-link`}> <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaPen /></span> Edit</span>
                                            </li>
                                            <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item dropdown`}>
                                                <a className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText} nav-link dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaMail /></span>  Mail / SMS
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li><span className="dropdown-item">Action</span></li>
                                                    <li><span className="dropdown-item">Another action</span></li>
                                                    <li><span className="dropdown-item">Something else here</span></li>
                                                </ul>
                                            </li>
                                            <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item`}>
                                                <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText} nav-link`}><span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaShare /></span>Share</span>
                                            </li>
                                            <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item dropdown`}>
                                                <a className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText} nav-link dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaBell /></span>  Reminders
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li><span className="dropdown-item">Action</span></li>
                                                    <li><span className="dropdown-item">Another action</span></li>
                                                </ul>
                                            </li>
                                            <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item dropdown`}>
                                                <a className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText} nav-link dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaPDF /></span>  PDF / Print
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li><span className="dropdown-item">Action</span></li>
                                                    <li><span className="dropdown-item">Another action</span></li>
                                                </ul>
                                            </li>
                                            <li className={`${styles.companyInvoiceViewInvoiceActionBarActionItem} nav-item`}>
                                                <span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemText} nav-link`}><span className={`${styles.companyInvoiceViewInvoiceActionBarActionItemIcon}`}><FaRupee /></span>Record Payment</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-12">
                            <div className={`${styles.companyInvoiceViewInvoiceViewWrapper}`}>
                                <div className="row">
                                    <div className="col-12 col-lg-6 order-1 order-lg-0">
                                        <div className={`${styles.companyInvoiceViewInvoiceComapnyName}`}>Verities Systems</div>
                                        <div className={`${styles.comapanyInvoiceViewInvoiceComapanyDescription}`}>Donec libero massa lacinia maximus tempor ante, phasellus auctor varius libero varius purus</div>
                                    </div>
                                    <div className="col-12 col-lg-6 order-0 order-lg-1">
                                        <div className={`${styles.comapnyInvoiceViewInvoiceHeading} d-flex justify-content-end`}>Tax Invoice</div>
                                        <div className={`${styles.comapnyInvoiceViewInvoiceInvoiceDate} d-flex justify-content-end`}>#2022/09-04</div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className={`${styles.companyInvoiceViewInvoiceBillToHeading}`}>Bill To</div>
                                        <div className={`${styles.companyInvoiceViewInvoiceBillToAddressWrapper}`}>
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToName}`}>Molestiequis ornare dignissim</div>
                                            <div className={`${styles.companyInvoiceViewInvoiceBillToAddress}`}>Tempor ante phasellus auctor varius libero varius purus</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Invoice#</span>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>VS-22/02/2022/01</span>
                                        </div>
                                        <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Invoice Date</span>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>22/02/2022</span>
                                        </div>
                                        <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Terms</span>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>Due On Receipt</span>
                                        </div>
                                        <div className={`${styles.comapnyInvoiceViewInvoiceDetails} row`}>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsHeading} col-6 text-align-start`}>Due Date</span>
                                            <span className={`${styles.comapnyInvoiceViewInvoiceDetailsEntry} col-6 text-align-start`}>22/02/2022</span>
                                        </div>
                                    </div>
                                </div>
                                <ViewInvoiceTable />
                                <div className="row">
                                    <div className="col-12 col-lg-6 order-1 order-lg-0">
                                        <div className={`${styles.companyInvoiceViewInvoiceTotalInWordsWrapper}`}>
                                            <div className={`${styles.companyInvoiceViewInvoiceTotalInWordsLabel}`}>Total In Words</div>
                                            <div className={`${styles.companyInvoiceViewInvoiceTotalInWords}`}>One Thousand Three Hundred Twenty Rupees</div>
                                        </div>
                                        <div className={`${styles.companyInvoiceViewInvoiceThankYouWrapper}`}>
                                            <div className={`${styles.companyInvoiceViewInvoiceThankYou}`}>Thanks For Your Business.</div>
                                        </div>
                                        <div className={`${styles.companyInvoiceViewInvoicePaymentMethodWrapper}`}>
                                            <div className={`${styles.companyInvoiceViewInvoicePaymentMethodLabel}`}>Payment Method</div>
                                            <div className={`${styles.companyInvoiceViewInvoicePaymentMethod}`}>Bank</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6 order-0 order-lg-1">
                                        <div className={`${styles.companyInvoiceViewInvoiceTotalCard} card`}>
                                            <div className="d-flex justify-content-between">
                                                <span>Sub Total</span>
                                                <span>Rs. 1320.00</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Total</span>
                                                <span>Rs. 1320.00</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Payment Made</span>
                                                <span>-Rs. 1320.00</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <span>Balance Due</span>
                                                <span>Rs. 1320.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </>)
}