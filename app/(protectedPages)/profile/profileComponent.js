"use client"
import Image from "next/image";
import { useContext, useState, useEffect } from 'react';
import FaSave from '@/assets/icons/faSave.svg';
import $ from 'jquery';
import Loading from "./loading";
import { getCurrentUserDetails, updateCurrentUserDetails, updateCurrentPassword } from '@/services/profile.service';
import { generatePassword } from '@/utils/genratePassword.utils';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import ErrorList from '@/components/errorList';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaCamera from '@/assets/icons/faCamera.svg';
import FaBan from '@/assets/icons/faBan.svg';
import PasswordInputField from '@/components/passwordInputField';
import { disableSubmitButton, enableSubmitButton } from '@/utils/form.utils'
import FaGear from '@/assets/icons/faGear.svg';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import styles from '@/styles/profile.module.scss';
import { NavExpandedState } from '@/context/NavState.context';

export default function ProfileComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [profileImage, setProfileImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
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
        userData[target.name] = target.value;
        let temp = Object.assign({}, userData)
        setUserData(temp);
    }

    const getUserDetails = async () => {
        setErrors([]);
        try {
            const result = await getCurrentUserDetails();
            var data = result.data;
            setUserData({
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                cellNumber: data.cellNumber,
            });
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        setIsLoading(false);
    }

    const handleUserSaveClick = async (e) => {
        e.preventDefault();
        setErrors([]);
        disableSubmitButton(e.target);
        const data = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            cellNumber: userData.cellNumber,
            active: true
        }
        try {
            const result = await updateCurrentUserDetails(data);
            if (result.status == 200) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'My Profile',
                    description: 'Details Updated Successfully',
                }]);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        enableSubmitButton(e.target);
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

    const handlePasswordSaveClick = async (e) => {
        e.preventDefault();
        setErrors([]);
        setPasswordErrors([]);
        disableSubmitButton(e.target);
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
            setUserCurrentPassword('');
            setUserNewPassword('');
            setUserConfirmPassword('');
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
        enableSubmitButton(e.target);
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
                                <div className="col-12 col-md-6">
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
                                                <h4 className="mb-0">Personal Details</h4>
                                                <hr />
                                                <form action="#" onSubmit={handleUserSaveClick}>

                                                    <div className="row">
                                                        <div className="col-12 col-md-3 d-flex justify-content-center">
                                                            <div className={`${styles.profileImageWrapper}`}>
                                                                <Image className={`${styles.profileImageDisplay}`} src={profileImage != "" ? URL.createObjectURL(profileImage) : "/images/default_profile_icon.png"} width={105} height={105} alt="profile_Image" />
                                                                <span className={`${styles.profileImageUploadWrapper}`}>
                                                                    {
                                                                        profileImage ?
                                                                            <span onClick={(e) => { removeSelectedImage(e) }}>
                                                                                <FaBan />
                                                                            </span> :
                                                                            <span onClick={(e) => { clickImageInput(e) }}>
                                                                                <FaCamera />
                                                                            </span>
                                                                    }
                                                                    <input id='fileUploadInput' className={`${styles.fileUpload}`} type="file" accept="image/*" onChange={(e) => { previewandSetImage(e) }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className={`${styles.companyInvoiceUserNameWrapper} mb-1 mb-md-2 row`}>
                                                                        <div className="col-12 mb-1">
                                                                            <label className={`${styles.companyInvoiceProfileFirstName}`}>First Name</label>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <input type="text" className="form-control" name="firstName" value={userData.firstName == null ? '' : userData.firstName} id="companyInvoiceProfileFirstName" placeholder='First Name' onChange={(e => { handleInput(e) })} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className={`${styles.companyInvoiceUserNameWrapper} mb-1 mb-md-2 row`}>
                                                                        <div className="col-12 mb-1">
                                                                            <label className={`${styles.companyInvoiceProfileLastName}`}>Last Name</label>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <input type="text" className="form-control" name="lastName" value={userData.lastName == null ? '' : userData.lastName} id="companyInvoiceProfileLastName" placeholder='Last Name' onChange={(e => { handleInput(e) })} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className={`${styles.companyInvoiceContactNumberWrapper} mb-1 mb-md-1 row`}>
                                                                        <div className="col-12 mb-1">
                                                                            <label className={`${styles.companyInvoiceContactNumber}`}>Contact Number</label>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <input type="text" className="form-control" name="cellNumber" value={userData.cellNumber} id="companyInvoiceContactNumber" placeholder='Contact Number' onChange={(e => { handleInput(e) })} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className={`${styles.companyInvoiceEmailIDWrapper} mb-2 mb-md-3 row`}>
                                                                        <div className="col-12 mb-1">
                                                                            <label className={`${styles.companyInvoiceEmailID}`}>Email ID</label>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <input type="text" className="form-control" name="email" value={userData.email} id="companyInvoiceEmailID" placeholder='Email ID' onChange={(e => { handleInput(e) })} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-8 col-md-6">
                                                                    <button className={`${styles.companyInvoiceSaveSendButton} btn blue`} name="btn-submit" type="submit">
                                                                        <span>
                                                                            <i><FaSave /></i>
                                                                            Update
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={`${styles.profileCard} card`}>
                                        <div className="card-body">
                                            <div className={`${styles.passwordDetailsWrapper}`}>
                                                <h4 className="mb-0">Update Password</h4>
                                                <hr />
                                                <form action="#" onSubmit={handlePasswordSaveClick}>
                                                    <div className="row mb-1 mb-md-2">
                                                        <div className="col-sm-8">
                                                            <ErrorList errors={passwordErrors} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <div className={`${styles.companyInvoiceCurrentPasswordWrapper} mb-1 mb-md-2 row`}>
                                                                <div className="col-12">
                                                                    <label className={`${styles.companyInvoiceCurrentPasswordID}`}>Current Password</label>
                                                                </div>
                                                                <div className="col-12 position-relative d-flex">
                                                                    <PasswordInputField placeholder="Current Password" name="password" value={userCurrentPassword} onChange={(e) => { setUserCurrentPassword(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <div className={`${styles.companyInvoicePasswordWrapper} mb-1 mb-md-2 row`}>
                                                                <div className="col-12">
                                                                    <label className={`${styles.companyInvoicePasswordID}`}>New Password</label>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="row g-0">
                                                                        <div className="col-11">
                                                                            <input type="text" className="form-control" value={userNewPassword} onInput={(e) => { setUserNewPassword(e.target.value) }} id="companyInvoiceUserPassword" placeholder=' New Password' />

                                                                        </div>
                                                                        <div className="col-1">
                                                                            <button className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <div className={`${styles.companyInvoiceConfirmPasswordIDWrapper} mb-2 mb-md-3 row`}>
                                                                <div className="col-12">
                                                                    <label className={`${styles.companyInvoiceConfirmPasswordID}`}>Confirm Password</label>
                                                                </div>
                                                                <div className="col-12">
                                                                    <input type="text" className="form-control" id="companyInvoiceUserConfirmPassword" value={userConfirmPassword} onInput={(e) => { setUserConfirmPassword(e.target.value); }} placeholder='Confirm Password' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                                                            <div className="row g-1">
                                                                <div className="col-6 col-xl-4 col-xxl-4">
                                                                    <button className={`${styles.companyInvoiceSaveSendButton} btn blue`} name="btn-submit" type="submit">
                                                                        <span>
                                                                            <i><FaSave /></i>
                                                                            Update
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                                <div className="col-6 col-xl-4 col-xxl-4">
                                                                    <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} type="reset" onClick={() => { handleCancelClick() }}>
                                                                        <span>
                                                                            <i><FaCircleXmark /></i>
                                                                            Reset
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </form>
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