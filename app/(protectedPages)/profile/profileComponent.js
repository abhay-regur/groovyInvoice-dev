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
import { useCurrentUserData } from "@/context/CurrentUserData.context";
import defaultProfile from '../../../public/images/default_profile_icon.png';

export default function ProfileComponent() {
    const { navExpandedState } = useContext(NavExpandedState);
    const { setToastList } = useContext(ToastMsgContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageSet, setIsImageSet] = useState(false);
    const [profileInfoErrors, setProfileInfoErrors] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const { userInfo, setUserInfo } = useCurrentUserData();

    const [passwordValidateErrorMessage, setPasswordValidateErrorMessage] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [profileValidateErrorMessage, setProfileValidateErrorMessage] = useState({
        firstName: '',
        lastName: '',
        cellNumber: ''
    });

    const [userData, setUserData] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        cellNumber: "",
        active: true,
        profilePicFile: "/images/default_profile_icon.png"
    });

    const clickImageInput = function (e) {
        e.preventDefault();
        $('#fileUploadInput').trigger('click');
    }

    useEffect(() => {
        getUserDetails().then(() => setIsLoading(false));
    }, []);

    const handleInput = ({ target }) => {
        userData[target.name] = target.value;
        let temp = Object.assign({}, userData)
        setUserData(temp);
    }

    const getUserDetails = async () => {
        setProfileInfoErrors([]);
        try {
            const result = await getCurrentUserDetails();
            var data = result.data;
            var temp_profilephoto = "";
            if (data.profile_image != "" && data.profile_image != null) {
                temp_profilephoto = data.profile_image.replaceAll('\\', '/');
                setImageSrc(temp_profilephoto)
                setIsImageSet(true);
            }

            setUserData({
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                cellNumber: data.cellNumber,
                profilePicFile: temp_profilephoto,
            });

        } catch (error) {
            setProfileInfoErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const handleUserSaveClick = async (e) => {
        e.preventDefault();
        setProfileInfoErrors([]);
        disableSubmitButton(e.target);
        if (handleProfileValidation()) {
            var tempcurrentUserData = { ...userInfo }
            var myFormData = new FormData();
            myFormData.append('firstName', userData.firstName);
            myFormData.append('lastName', userData.lastName);
            myFormData.append('cellNumber', userData.cellNumber);
            myFormData.append('active', true);
            myFormData.append('profilePicFile', userData.profilePicFile);

            tempcurrentUserData.userName = userData.firstName + ' ' + userData.lastName;
            if (userData.profilePicFile) {
                tempcurrentUserData.userProfileImage = URL.createObjectURL(userData.profilePicFile);
            } else {
                tempcurrentUserData.userProfileImage = "";
            }

            try {
                const result = await updateCurrentUserDetails(myFormData);
                if (result.status == 200) {

                    setToastList([{
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'My Profile',
                        description: 'Details Updated Successfully',
                    }]);

                    setUserInfo(Object.assign({}, tempcurrentUserData));
                }
            } catch (error) {
                setProfileInfoErrors(genrateErrorMessage(error, '', setToastList));
            }
        }
        enableSubmitButton(e.target);
    }

    const genrateNewPassword = () => {
        var password = generatePassword()
        passwordData['newPassword'] = password;
        passwordData['confirmPassword'] = password;
        let temp = Object.assign({}, passwordData);
        setPasswordData(temp);
    }

    const previewandSetImage = function (e) {
        var temp_obj = { ...userData }
        if (e.target.files && e.target.files.length > 0) {
            temp_obj.profilePicFile = e.target.files[0];
            setImageSrc(URL.createObjectURL(e.target.files[0]));
            setUserData(temp_obj);
            setIsImageSet(true);
        }
    }

    const removeSelectedImage = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var temp_obj = { ...userData }
        temp_obj.profilePicFile = "";
        setImageSrc(defaultProfile);
        setIsImageSet(false);
        setUserData(temp_obj);
        $('#fileUploadInput').val('');
    }

    const handlePasswordSaveClick = async (e) => {
        e.preventDefault();
        setPasswordErrors([]);
        disableSubmitButton(e.target);
        if (handlePasswordValidation()) {
            try {
                const result = await updateCurrentPassword(passwordData);
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Your password is updated!',
                    description: result.data.message,
                }]);
                passwordData['currentPassword'] = '';
                passwordData['newPassword'] = '';
                passwordData['confirmPassword'] = '';
                let temp = Object.assign({}, passwordData)
                setPasswordData(temp);
            } catch (error) {
                setPasswordErrors(genrateErrorMessage(error, '', setToastList));
            }
        }
        enableSubmitButton(e.target);
    }

    const handleCancelClick = () => {
        setProfileInfoErrors([]);
        setPasswordErrors([]);
        passwordData['currentPassword'] = '';
        passwordData['newPassword'] = '';
        passwordData['confirmPassword'] = '';
        let temp = Object.assign({}, passwordData)
        setPasswordData(temp);
    }

    const imageLoader = ({ src, width, quality }) => {
        return (`${src}?w=${width}&q=${quality || 75}`);
    }

    const handlePasswordValidationError = (name, msg) => {
        passwordValidateErrorMessage[name] = msg;
        let temp = Object.assign({}, passwordValidateErrorMessage)
        setPasswordValidateErrorMessage(temp)
    }

    const handleProfileValidationError = (name, msg) => {
        profileValidateErrorMessage[name] = msg;
        let temp = Object.assign({}, profileValidateErrorMessage)
        setProfileValidateErrorMessage(temp)
    }

    const validateProfileData = (name, value) => {
        if (name == 'firstName') {
            if (value == '') {
                handleProfileValidationError(name, 'First name is required');
            } else {
                handleProfileValidationError(name, '');
            }
        }
        if (name == 'lastName') {
            if (value == '') {
                handleProfileValidationError(name, 'Last name is required');
            } else {
                handleProfileValidationError(name, '');
            }
        }
        if (name == 'cellNumber') {
            if (value == '') {
                handleProfileValidationError(name, 'Cell number is required');
            } else {
                handleProfileValidationError(name, '');
            }
        }
    }

    const handleProfileValidation = (e) => {
        if (e) {
            validateProfileData(e.target.name, e.target.value)
        } else {
            validateProfileData('firstName', userData.firstName);
            validateProfileData('lastName', userData.lastName);
            validateProfileData('cellNumber', userData.cellNumber);
            if (profileValidateErrorMessage.firstName == '' && profileValidateErrorMessage.lastName == '' && profileValidateErrorMessage.cellNumber == '') {
                return true;
            }
            return false;
        }
    }

    const validatePasswordData = (name, value) => {
        if (name == 'currentPassword') {
            if (value == '') {
                handlePasswordValidationError(name, 'Current password is required');
            } else {
                handlePasswordValidationError(name, '');
            }
        } else if (name == 'newPassword') {
            if (value == '') {
                handlePasswordValidationError(name, 'New password is required');
            } else if (value.length < 8 || value.length > 16) {
                handlePasswordValidationError(name, 'New password must be of 8 to 16 characters long');
            } else {
                handlePasswordValidationError(name, '');
            }
        } else if (name == 'confirmPassword') {
            if (value == '') {
                handlePasswordValidationError(name, 'Confirm password is required');
            } else if (value != passwordData.newPassword) {
                handlePasswordValidationError(name, 'New password and confirm password must be same');
            } else {
                handlePasswordValidationError(name, '');
            }
        }
    }

    const handlePasswordValidation = (e) => {
        if (e) {
            validatePasswordData(e.target.name, e.target.value)
        } else {
            validatePasswordData('currentPassword', passwordData.currentPassword);
            validatePasswordData('newPassword', passwordData.newPassword);
            validatePasswordData('confirmPassword', passwordData.confirmPassword);
            if (passwordValidateErrorMessage.currentPassword == '' && passwordValidateErrorMessage.newPassword == '' && passwordValidateErrorMessage.confirmPassword == '') {
                return true;
            }
            return false;
        }
    }

    const handlePasswordChange = ({ target }) => {
        passwordData[target.name] = target.value;
        let temp = Object.assign({}, passwordData)
        setPasswordData(temp);
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
                                                <ErrorList errors={profileInfoErrors} />
                                                <form action="#" onSubmit={handleUserSaveClick}>

                                                    <div className="row">
                                                        <div className="col-12 col-md-3 d-flex justify-content-center">
                                                            <div className={`${styles.profileImageWrapper}`}>
                                                                <Image className={`${styles.profileImageDisplay}`} loader={imageLoader} src={imageSrc} onError={() => setImageSrc(defaultProfile)} width={105} height={105} alt="profile_Image" />
                                                                <span className={`${styles.profileImageUploadWrapper}`}>
                                                                    {
                                                                        isImageSet ?
                                                                            <button className="btn" onClick={(e) => { removeSelectedImage(e) }}>
                                                                                <span>
                                                                                    <FaBan />
                                                                                </span>
                                                                            </button>
                                                                            :
                                                                            <button className="btn" onClick={(e) => { clickImageInput(e) }}>
                                                                                <span>
                                                                                    <FaCamera />
                                                                                </span>
                                                                            </button>

                                                                    }
                                                                    <input id='fileUploadInput' className={`${styles.fileUpload}`} type="file" accept="image/*" onChange={previewandSetImage} />
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
                                                                            <input type="text" className="form-control" name="firstName" value={userData.firstName == null ? '' : userData.firstName} id="companyInvoiceProfileFirstName" placeholder='First Name' onChange={(e => { handleInput(e) })} onBlur={handleProfileValidation} />
                                                                            <div htmlFor="firstName" className="ms-3 invalid-data"> {profileValidateErrorMessage.firstName} </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className={`${styles.companyInvoiceUserNameWrapper} mb-1 mb-md-2 row`}>
                                                                        <div className="col-12 mb-1">
                                                                            <label className={`${styles.companyInvoiceProfileLastName}`}>Last Name</label>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <input type="text" className="form-control" name="lastName" value={userData.lastName == null ? '' : userData.lastName} id="companyInvoiceProfileLastName" placeholder='Last Name' onBlur={handleProfileValidation} onChange={(e => { handleInput(e) })} />
                                                                            <div htmlFor="lastName" className="ms-3 invalid-data"> {profileValidateErrorMessage.lastName} </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className={`${styles.companyInvoiceContactNumberWrapper} mb-1 mb-md-1 row`}>
                                                                        <div className="col-12 mb-1">
                                                                            <label className={`${styles.companyInvoiceContactNumber}`}>Contact Number</label>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <input type="text" className="form-control" name="cellNumber" value={userData.cellNumber} id="companyInvoiceContactNumber" placeholder='Contact Number' onBlur={handleProfileValidation} onChange={(e => { handleInput(e) })} />
                                                                            <div htmlFor="cellNumber" className="ms-3 invalid-data"> {profileValidateErrorMessage.cellNumber} </div>
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
                                                                    <PasswordInputField placeholder="Current Password" className="form-control" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} onBlur={handlePasswordValidation} />
                                                                </div>
                                                                <div htmlFor="currentPassword" className="ms-3 invalid-data">
                                                                    {passwordValidateErrorMessage.currentPassword}
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
                                                                            <input type="text" className="form-control" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder=' New Password' onBlur={handlePasswordValidation} />
                                                                            <div htmlFor="newPassword" className="ms-3 invalid-data">
                                                                                {passwordValidateErrorMessage.newPassword}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <button type="button" className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button>
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
                                                                    <input type="text" className="form-control" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder='Confirm Password' onBlur={handlePasswordValidation} />
                                                                    <div htmlFor="confirmPassword" className="ms-3 invalid-data">
                                                                        {passwordValidateErrorMessage.confirmPassword}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                                                            <div className={`${styles.profileSubmitWrapper} row g-1 gap-3`}>
                                                                <button className={`${styles.companyInvoiceSaveSendButton} btn blue`} name="btn-submit" type="submit">
                                                                    <span>
                                                                        <i><FaSave /></i>
                                                                        Update
                                                                    </span>
                                                                </button>
                                                                <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} type="reset" onClick={() => { handleCancelClick() }}>
                                                                    <span>
                                                                        <i><FaCircleXmark /></i>
                                                                        Reset
                                                                    </span>
                                                                </button>
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