"use client"
import Link from 'next/link';
import Image from "next/image";
import { useContext, useState } from 'react';
import FaSave from '../../../assets/icons/faSave.svg';
import { faCamera, faCancel } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FaCircleXmark from '../../../assets/icons/faCircleXmark.svg';
import styles from '../../../styles/profile.module.scss';
import { NavExpandedState } from '../../../context/NavState.context';
export default function ProfileComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    const [profileImage, setProfileImage] = useState("");

    const clickImageInput = function (e) {
        e.preventDefault();
        $('#fileUploadInput').trigger('click');
    }

    const previewandSetImage = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
        }
    }

    const removeSelectedImage = function (e) {
        setProfileImage("")
    }

    return (<div className={styles.container}>
        <main className={`${styles.main} ${navExpandedState ? styles.expanded : " "}`}>
            <div className="container-fluid">
                <div className={`${styles.comapnyInvoiceHeadingWrapper} row`}>
                    <div className="col-6">
                        <h2 className={`${styles.title}`}>
                            My Profile
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={`${styles.profileCard} card`}>
                            <div className="card-body">
                                <div className={`${styles.personalDetailsWrapper}`}>
                                    <h3>Personal Details</h3>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3 d-flex justify-content-center">
                                            <div className={`${styles.profileImageWrapper}`}>
                                                <Image className={`${styles.profileImageDisplay}`} src={profileImage != "" ? URL.createObjectURL(profileImage) : "/images/default_profile_icon.png"} width={125} height={125} alt="profile_Image" />
                                                <span className={`${styles.profileImageUploadWrapper}`}>
                                                    {
                                                        profileImage ?
                                                            <span onClick={(e) => { removeSelectedImage(e) }}>
                                                                <FontAwesomeIcon icon={faCancel} />
                                                            </span> :
                                                            <span onClick={(e) => { clickImageInput(e) }}>
                                                                <FontAwesomeIcon icon={faCamera} />
                                                            </span>
                                                    }
                                                    <input id='fileUploadInput' className={`${styles.fileUpload}`} type="file" accept="image/*" onChange={(e) => { previewandSetImage(e) }} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className={`${styles.companyInvoiceUserNameWrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceProfileFirstName}`}>First Name</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceProfileFirstName" placeholder='First Name' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className={`${styles.companyInvoiceUserNameWrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceProfileLastName}`}>Last Name</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceProfileLastName" placeholder='Last Name' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                        </div>
                                        <div className="col-sm-8">
                                            <div className={`${styles.companyInvoiceContactNumberWrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceContactNumber}`}>Contact Number</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceContactNumber" placeholder='Contact Number' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                        </div>
                                        <div className="col-sm-8">
                                            <div className={`${styles.companyInvoiceEmailIDWrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceEmailID}`}>Email ID</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceEmailID" placeholder='Email ID' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                            <div className="row">
                                                <div className="col-6 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                                    <button className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={() => { console.log('save'); }}>
                                                        <span>
                                                            <i><FaSave /></i>
                                                            Save
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="col-6 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                                    <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => { console.log('Cancel'); }}>
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
                    </div>
                    <div className="col-12">
                        <div className={`${styles.profileCard} card`}>
                            <div className="card-body">
                                <div className={`${styles.companyDetailsWrapper}`}>
                                    <h3>Company Details</h3>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-8">
                                            <div className={`${styles.companyInvoiceCompanyNameWrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceCompanyName}`}>Company Name</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceCompanyName" placeholder='Company Name' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-8">
                                            <div className={`${styles.companyInvoiceCompanyAddress1Wrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceCompanyAddress1}`}>Address 1</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceCompanyAddress1" placeholder='Address' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-8">
                                            <div className={`${styles.companyInvoiceCompanyAddress2Wrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceCompanyAddress2}`}>Address 2</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceCompanyAddress2" placeholder='Address' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-8">
                                            <div className={`${styles.companyInvoiceCompanyCityWrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceCompanyCity}`}>City</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceCompanyCity" placeholder='City' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-8">
                                            <div className={`${styles.companyInvoiceCompanyPostCodeWrapper} mb-1 mb-md-4 row`}>
                                                <div className="col-12 mb-2">
                                                    <label className={`${styles.companyInvoiceCompanyPostCode}`}>Postal Code</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" id="companyInvoiceCompanyPostCode" placeholder='Postal Code' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                            <div className="row">
                                                <div className="col-6 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                                    <button className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={() => { console.log('Save'); }}>
                                                        <span>
                                                            <i><FaSave /></i>
                                                            Save
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="col-6 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                                    <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => { console.log('Cancel'); }}>
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
                    </div>
                </div>
            </div>
        </main>
    </div>);
}