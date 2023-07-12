"use client"
import Image from "next/image";
import { useContext, useState, useEffect } from 'react';
import FaSave from '../../../assets/icons/faSave.svg';
import { faCamera, faCancel } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import Loading from "./loading";
import { getCurrentUserDetails, updateCurrentPassword } from '../../../services/profile.service';
import { generatePassword } from '../../../utils/genratePassword.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastMsgContext } from '../../../context/ToastMsg.context';
import PasswordToggler from '../../../components/passwordToggler';
import ErrorList from '../../../components/errorList';
import FaCircleXmark from '../../../assets/icons/faCircleXmark.svg';
import FaGear from '../../../assets/icons/faGear.svg';
import styles from '../../../styles/profile.module.scss';
import { NavExpandedState } from '../../../context/NavState.context';

export default function ProfileComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [profileImage, setProfileImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [userCurrentPassword, setUserCurrentPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userData, setUserData] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        cellNumber: "",
    });

    const clickImageInput = function (e) {
        e.preventDefault();
        $('#fileUploadInput').trigger('click');
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleInput = ({ target }) => {
        data[target.name] = target.value
        let temp = Object.assign({}, data)
        setData(temp)
    }

    const getUserDetails = async () => {
        setErrors([]);
        const result = await getCurrentUserDetails();
        var data = result.data;
        setUserData({
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            cellNumber: data.cellNumber,
        });
        setIsLoading(false);
    }

    const genrateNewPassword = () => {
        var temp = generatePassword()
        setUserNewPassword(temp);
        setUserConfirmPassword(temp);
    }

    const previewandSetImage = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
        }
    }

    const removeSelectedImage = function (e) {
        setProfileImage("")
    }

    const handlePasswordSaveClick = async () => {
        setErrors([]);
        setPasswordErrors([]);
        const data = {
            currentPassword: userCurrentPassword,
            newPassword: userNewPassword,
            confirmPassword: userConfirmPassword
        }
        try {
            const result = await updateCurrentPassword(data);
            setToastList([{
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Your password is updated!',
                description: result.data.message,
            }]);
        } catch (error) {
            console.log(error)
            setPasswordErrors(error.response.data.message);
        }
    }

    const handleCancelClick = () => {
        setErrors([]);
        setPasswordErrors([]);
        setUserCurrentPassword('');
        setUserNewPassword('');
        setUserConfirmPassword('');
    }

    return (
        <div className={styles.container}>
            {
                isLoading ?
                    <Loading /> :
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
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <ErrorList errors={errors} />
                                                    </div>
                                                </div>
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
                                                                <input type="text" className="form-control" name="firstName" value={userData.firstName} id="companyInvoiceProfileFirstName" placeholder='First Name' onChange={(e => { handleInput(e) })} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className={`${styles.companyInvoiceUserNameWrapper} mb-1 mb-md-4 row`}>
                                                            <div className="col-12 mb-2">
                                                                <label className={`${styles.companyInvoiceProfileLastName}`}>Last Name</label>
                                                            </div>
                                                            <div className="col-12">
                                                                <input type="text" className="form-control" name="lastName" value={userData.lastName} id="companyInvoiceProfileLastName" placeholder='Last Name' onChange={(e => { handleInput(e) })} />
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
                                                                <input type="text" className="form-control" name="cellNumber" value={userData.cellNumber} id="companyInvoiceContactNumber" placeholder='Contact Number' onChange={(e => { handleInput(e) })} />
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
                                                                <input type="text" className="form-control" name="email" value={userData.email} id="companyInvoiceEmailID" placeholder='Email ID' onChange={(e => { handleInput(e) })} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-end">
                                                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                                        <div className="row">
                                                            <div className="col-12 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                                                <button className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={() => { console.log('save'); }}>
                                                                    <span>
                                                                        <i><FaSave /></i>
                                                                        Save
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="col-12 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
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
                                            <div className={`${styles.passwordDetailsWrapper}`}>
                                                <h3>Update Password</h3>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <ErrorList errors={passwordErrors} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className={`${styles.companyInvoiceCurrentPasswordWrapper} mb-1 mb-md-4 row`}>
                                                            <div className="col-12 mb-2">
                                                                <label className={`${styles.companyInvoiceCurrentPasswordID}`}>Current Password</label>
                                                            </div>
                                                            <div className="col-12 position-relative d-flex">
                                                                <input type="password" id="password" className="form-control" value={userCurrentPassword} onInput={(e) => { setUserCurrentPassword(e.target.value) }} placeholder='Current Password' />
                                                                <PasswordToggler refId="password" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className={`${styles.companyInvoicePasswordWrapper} mb-1 mb-md-4 row`}>
                                                            <div className="col-12 mb-2">
                                                                <label className={`${styles.companyInvoicePasswordID}`}>New Password</label>
                                                            </div>
                                                            <div className="col-12 d-flex">
                                                                <input type="text" className="form-control" value={userNewPassword} onInput={(e) => { setUserNewPassword(e.target.value) }} id="companyInvoiceUserPassword" placeholder=' New Password' />
                                                                <button className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className={`${styles.companyInvoiceConfirmPasswordIDWrapper} mb-1 mb-md-4 row`}>
                                                            <div className="col-12 mb-2">
                                                                <label className={`${styles.companyInvoiceConfirmPasswordID}`}>Confirm Password</label>
                                                            </div>
                                                            <div className="col-12">
                                                                <input type="text" className="form-control" id="companyInvoiceUserConfirmPassword" value={userConfirmPassword} onInput={(e) => { setUserConfirmPassword(e.target.value); }} placeholder='Confirm Password' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-end">
                                                    <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3">
                                                        <div className="row">
                                                            <div className="col-12 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                                                <button className={`${styles.companyInvoiceSavenSendButton} btn blue`} onClick={() => { handlePasswordSaveClick() }}>
                                                                    <span>
                                                                        <i><FaSave /></i>
                                                                        Update
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="col-12 col-md-4 col-lg-3 col-xl-4 mt-3 mt-sm-0 d-flex justify-content-center">
                                                                <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => { handleCancelClick() }}>
                                                                    <span>
                                                                        <i><FaCircleXmark /></i>
                                                                        Reset
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
            }
        </div>
    );
}