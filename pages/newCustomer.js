import { useState } from 'react';
import ContactPerson from '../components/contactPerson';
import Address from '../components/address';
import OtherDetails from '../components/otherDetails';
import RadioButton from '../components/radioButton';
import FaSkype from '../assets/icons/faSkype.svg';
import FaSave from '../assets/icons/faSave.svg';
import FaCircleXmark from '../assets/icons/faCircleXmark.svg';
import styles from "../styles/newCustomer.module.scss";

const NewCustomer = ({ navExpandedState }) => {
    const [customerTypeSelected, setcustomerTypeSelected] = useState();
    const [ActiveTabID, setActiveTabID] = useState(1)

    const handleBusinessChange = () => {
        setcustomerTypeSelected('business');
    };

    const handleIndividualChange = () => {
        setcustomerTypeSelected('individual');
    };
    return (
        <div>
            <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
                <h2 className={`${styles.title}`}>
                    New Customer
                </h2>
                <div className="container-fluid">
                    <div className={`${styles.card} card`}>
                        <div className={`${styles.cardBody} card-body`}>
                            <h4 className={`${styles.cardTitle} card-title`}>Customer Details</h4>

                            <hr />

                            <div className={`${styles.companyCustomerTypeOptionWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className="">Customer Type</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <span className={`${styles.companyCustomerTypeSelectorMainWrapper}`}>
                                        <span className={`${styles.customerTypeBusinessRadioButtonWrapper} d-flex align-items-center`}>
                                            <RadioButton
                                                label="Business"
                                                value={customerTypeSelected === 'business'}
                                                onChange={handleBusinessChange}
                                            />
                                        </span>
                                        <span className={`${styles.customerTypeIndividualRadioButtonWrapper} d-flex align-items-center`}>
                                            <RadioButton
                                                label="Individual"
                                                value={customerTypeSelected === 'individual'}
                                                onChange={handleIndividualChange}
                                            />
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceNameWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className="">Primary Contact</label>
                                </div>
                                <div className="col-12 col-lg-2 col-xl-2">
                                    <select className={`${styles.companySalutationSelect} form-select`}>
                                        <option defaultValue>Salutation</option>
                                        <option value="ms">Ms.</option>
                                        <option value="mr">Mr.</option>
                                        <option value="mrs">Mrs.</option>
                                        <option value="dr">Dr.</option>
                                    </select>
                                </div>
                                <div className="col-12 col-lg-3 col-xl-2">
                                    <input type="text" className={`${styles.companyInvoiceNewCustomerFirstName} form-control`} placeholder='First Name' />
                                </div>
                                <div className="col-12 col-lg-3 col-xl-2">
                                    <input type="text" className={`${styles.companyInvoiceNewCustomerLastName} form-control`} placeholder='Last Name' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceComapnyNameWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceComapnyNameLabel}`}>Comapny Name</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceNewCustomerComapnyName" placeholder='Company Name' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceComapnyDisplayNameWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceComapnyDisplayNamelabel}`}>Customer Display Name <span className={`${styles.green}`}>*</span></label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <select className={`${styles.companyInvoiceComapnyDisplaySelect} form-select`}>
                                        <option defaultValue>Customer Display Name</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceComapnyEmailWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceComapnyEmailLabel}`}>Customer Email</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="email" className="form-control" id="companyInvoiceComapnyEmail" placeholder='Company Email' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceComapnyPhone} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceComapnyPhoneLabel}`}>Customer Phone</label>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <input type="text" className={`${styles.companyInvoiceComapnyWorkPhone} form-control`} placeholder='Work Phone' />
                                </div>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <input type="text" className={`${styles.companyInvoiceComapnyMobile} form-control`} placeholder='Mobile' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceComapnySkypeIDWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceComapnySkypeIDLabel}`}>Skype Name/Number</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <div className="input-group">
                                        <span className="input-group-text"><FaSkype /></span>
                                        <input type="text" className="form-control" id="companyInvoiceComapnySkypeID" placeholder='Skype name/number' />
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceDesignationWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceDesignationlabel}`}>Designation</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceDesignation" placeholder='Designation' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceDepartmentWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceDepartmentLabel}`}>Department</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceDepartment" placeholder='Department' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceComapnyWebsiteWrapper} mb-3 row`}>
                                <div className="col-12 col-lg-4 col-xl-2">
                                    <label className={`${styles.companyInvoiceComapnyWebsiteLabel}`}>Website</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" className="form-control" id="companyInvoiceComapnyWebsiteW" placeholder='Website' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceTabViewWrapper} mb-3`}>
                                <ul className={`nav ${styles.nav_tabs}`}>
                                    <li className={`nav-item ${styles.nav_item} ${ActiveTabID == 1 ? styles.active : " "}`} onClick={() => { setActiveTabID(1) }}>
                                        <span>
                                            <span className={`${styles.nav_menuName}`}>Other Details</span>
                                        </span>
                                    </li>
                                    <li className={`nav-item ${styles.nav_item} ${ActiveTabID == 2 ? styles.active : " "}`} onClick={() => { setActiveTabID(2) }}>
                                        <span>
                                            <span className={`${styles.nav_menuName}`}>Address</span>
                                        </span>
                                    </li>
                                    <li className={`nav-item me-0 ${styles.nav_item} ${ActiveTabID == 3 ? styles.active : " "}`} onClick={() => { setActiveTabID(3) }}>
                                        <span>
                                            <span className={`${styles.nav_menuName}`}>Contact Persons</span>
                                        </span>
                                    </li>
                                </ul>
                                <div className={`${styles.tab_content_wrapper} `} id="myTabContent">
                                    {ActiveTabID == 1 ? <OtherDetails /> : " "}
                                    {ActiveTabID == 2 ? <Address /> : " "}
                                    {ActiveTabID == 3 ? <ContactPerson /> : " "}
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
                                <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                    <div className="row">
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                            <button className={`${styles.companyInvoiceSavenSendButton} btn blue`}>
                                                <span>
                                                    <i><FaSave /></i>
                                                    Save
                                                </span>
                                            </button>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-4">
                                            <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`}>
                                                <span>
                                                    <i><FaCircleXmark /></i>
                                                    Cancel
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NewCustomer;