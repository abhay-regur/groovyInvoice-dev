"use client"
import React, { useRef, useState } from 'react';
import FaSave from '@/assets/icons/faSave.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import styles from "@/styles/userForm.module.scss";
import FaGear from '@/assets/icons/faGear.svg';
import ErrorList from '@/components/errorList';
import { generatePassword } from '@/utils/genratePassword.utils';
import { useRouter } from 'next/navigation';

const UserForm = ({ data, setData, handleSubmit, errors, label, mode }) => {
  const { replace } = useRouter();

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [formValidationMessage, setFormValidationMessage] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cellNumber: '',
    password: '',
    confirmPassword: ''
  });

  const genrateNewPassword = () => {
    const password = generatePassword()
    data.password = password
    data.confirmPassword = password
    let temp = Object.assign({}, data)
    setData(temp);


    if (passwordRef.current.classList.value.search('is-invalid') > 0) {
      handleValidationError('password', '');
      passwordRef.current.classList.remove('is-invalid');
      passwordRef.current.classList.add('is-valid');
    }

    if (confirmPasswordRef.current.classList.value.search('is-invalid') > 0) {
      handleValidationError('confirmPassword', '');
      confirmPasswordRef.current.classList.remove('is-invalid');
      confirmPasswordRef.current.classList.add('is-valid');
    }
  }

  const handleInput = ({ target }) => {
    if (target.name == 'phone') {
      data[target.name] = (target.value == '' ? '' : (target.value).match(/[0-9]+/g)[0]);
    } else {
      data[target.name] = target.value;
    }
    let temp = Object.assign({}, data)
    setData(temp)
  }

  const handleCheckBoxChange = ({ target }) => {
    data[target.name] = !data[target.name]
    let temp = Object.assign({}, data)
    setData(temp)
  }

  const handleValidation = ({ target }) => {
    if (target.value == '') {
      target.classList.add('is-invalid');
      handleValidationError(target.name, 'Can not be empty');
    } else if (target.name == 'password' || target.name == 'confirmPassword') {
      if (target.value.length < 8 || target.value.length > 16) {
        handleValidationError(target.name, 'Password must be of 8 to 16 characters long');
        target.classList.add('is-invalid');
      } else if (target.name == 'confirmPassword' && target.value != data.password) {
        handleValidationError(target.name, 'Password do not match');
        target.classList.add('is-invalid');
      } else {
        handleValidationError(target.name, '');
        target.classList.remove('is-invalid');
        target.classList.add('is-valid');
      }
    } else {
      target.classList.remove('is-invalid');
      target.classList.add('is-valid');
      handleValidationError(target.name, '')
    }
  }

  const handleValidationError = (name, msg) => {
    formValidationMessage[name] = msg;
    let temp = Object.assign({}, formValidationMessage)
    setFormValidationMessage(temp);
  }



  return (
    <>
      <div className={`${styles.card} card`}>
        <div className={`${styles.cardBody} card-body`}>
          <h4 className={`${styles.cardTitle} card-title`}>{label}</h4>

          <hr />

          <ErrorList errors={errors} />
          <form onSubmit={handleSubmit}>
            <div className={`${styles.companyUserActiveUserWrapper} mb-4 row`}>
              <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                <label className="">Active</label>
              </div>
              <div className="col-12 col-lg-6 col-xl-6">
                <div className={`${styles.companyUserActiveUserSwitchWrapper} form-check form-switch align-items-center d-flex`}>
                  <input className={`${styles.companyUserActiveUserSwitch} form-check-input`} type="checkbox" role="switch" id="flexSwitchCheckDefault" name='active' checked={data.active} onChange={handleCheckBoxChange} />
                </div>
              </div>
            </div>

            <div className={`${styles.companyInvoiceUserNameWrapper} mb-0 mb-md-4 row`}>
              <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                <label className="">Name</label>
              </div>
              <div className="col-12 col-lg-3 col-xl-3 mb-3 mb-lg-0">
                <input type="text" className={`${styles.companyInvoiceUserFirstName} form-control`} id='firstName' placeholder='First Name' onChange={handleInput} name='firstName' value={data.firstName || ""} required onBlur={handleValidation} />
                <div htmlFor="firstName" className="ms-3 invalid-data">
                  {formValidationMessage.firstName}
                </div>
              </div>
              <div className="col-12 col-lg-3 col-xl-3">
                <input type="text" className={`${styles.companyInvoiceUserLastName} form-control`} id='lastName' placeholder='Last Name' onChange={handleInput} name='lastName' value={data.lastName || ""} />
                <div htmlFor="lastName" className="ms-3 invalid-data">
                  {formValidationMessage.lastName}
                </div>
              </div>
            </div>

            <div className={`${styles.companyInvoiceUserEmailWrapper} mb-4 row`}>
              <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                <label className={`${styles.companyInvoiceUserEmailLabel}`}>Email</label>
              </div>
              <div className="col-12 col-lg-6 col-xl-6">
                <input type="email" className="form-control" id="companyInvoiceUserEmail" placeholder='Email' onChange={handleInput} onBlur={handleValidation} name='email' value={data.email} required disabled={mode == 'edit' ? true : false} />
                <div htmlFor="companyInvoiceUserEmail" className="ms-3 invalid-data">
                  {formValidationMessage.email}
                </div>
              </div>
            </div>

            <div className={`${styles.companyInvoiceUserPhone} mb-4 row`}>
              <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                <label className={`${styles.companyInvoiceUserPhoneLabel}`}>Phone</label>
              </div>

              <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                <input type="number" minLength={4} maxLength={13} className={`${styles.companyInvoiceUserMobile} form-control`} id='cellNumber' placeholder='Mobile' onChange={handleInput} name='cellNumber' value={data.cellNumber} />
                <div htmlFor="cellNumber" className="ms-3 invalid-data">
                  {formValidationMessage.cellNumber}
                </div>
              </div>
            </div>
            {mode == 'add' ? (
              <>
                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                  <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Password</label>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-6">
                    <div className="d-flex">
                      <input type="text" className="form-control" value={data.password} ref={passwordRef} name="password" onChange={handleInput} id="companyInvoiceUserPassword" placeholder='Password' onBlur={handleValidation} />
                      <button type="button" className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button>
                    </div>
                    <div htmlFor="companyInvoiceUserPassword" className="ms-3 invalid-data">
                      {formValidationMessage.password}
                    </div>
                  </div>
                </div>

                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                  <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Confirm Password</label>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-6">
                    <input type="text" className="form-control" id="companyInvoiceDesignation" value={data.confirmPassword} ref={confirmPasswordRef} name="confirmPassword" onChange={handleInput} placeholder='Confirm Password' onBlur={handleValidation} />
                    <div htmlFor="companyInvoiceUserPassword" className="ms-3 invalid-data">
                      {formValidationMessage.confirmPassword}
                    </div>
                  </div>
                </div>
              </>
            ) : ''}

            <div className={`${styles.companyInvoiceFormButtonsWrapper} row`}>
              <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-5">
                <div className="d-flex gap-3">
                  <button type="submit" name="btn-submit" className={`${styles.companyInvoiceSavenSendButton} btn blue`}>
                    <span>
                      <i><FaSave /></i> Save
                    </span>
                  </button>
                  <button type="button" className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={() => replace('/users')}>
                    <span>
                      <i><FaCircleXmark /></i>
                      Cancel
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserForm;