"use client"
import React from 'react';
import FaSave from '@/assets/icons/faSave.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import styles from "@/styles/userForm.module.scss";
import FaGear from '@/assets/icons/faGear.svg';
import ErrorList from '@/components/errorList';
import { generatePassword } from '@/utils/genratePassword.utils';

const UserForm = ({ data, setData, handleSubmit, errors, label, mode }) => {
  const genrateNewPassword = () => {
    const password = generatePassword()
    data.password = password
    data.confirmPassword = password
    let temp = Object.assign({}, data)
    setData(temp)
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
              <div className="col-12 col-lg-3 col-xl-3">
                <input type="text" className={`${styles.companyInvoiceUserFirstName} form-control`} placeholder='First Name' onChange={handleInput} name='firstName' value={data.firstName} />
              </div>
              <div className="col-12 col-lg-3 col-xl-3">
                <input type="text" className={`${styles.companyInvoiceUserLastName} form-control`} placeholder='Last Name' onChange={handleInput} name='lastName' value={data.lastName} />
              </div>
            </div>

            <div className={`${styles.companyInvoiceUserEmailWrapper} mb-4 row`}>
              <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                <label className={`${styles.companyInvoiceUserEmailLabel}`}>Email</label>
              </div>
              <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                <input type="email" className="form-control" id="companyInvoiceUserEmail" placeholder='Email' onChange={handleInput} name='email' value={data.email} disabled={mode == 'edit' ? true : false} />
              </div>
            </div>

            <div className={`${styles.companyInvoiceUserPhone} mb-4 row`}>
              <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                <label className={`${styles.companyInvoiceUserPhoneLabel}`}>Phone</label>
              </div>

              <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                <input type="tel" minLength={4} maxLength={13} className={`${styles.companyInvoiceUserMobile} form-control`} placeholder='Mobile' onChange={handleInput} name='cellNumber' value={data.cellNumber} />
              </div>
            </div>
            {mode == 'add' ? (
              <>
                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                  <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Password</label>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-6 d-flex">
                    <input type="text" className="form-control" value={data.password} name="password" onChange={handleInput} id="companyInvoiceUserPassword" placeholder='Password' />
                    <button type="button" className="btn blueOutline" onClick={() => { genrateNewPassword() }}><FaGear /></button>
                  </div>
                </div>

                <div className={`${styles.companyInvoiceUserPasswordWrapper} mb-4 row`}>
                  <div className="d-flex align-items-center col-12 col-lg-2 col-xl-2">
                    <label className={`${styles.companyInvoiceUserPasswordLabel}`}>Confirm Password</label>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-6">
                    <input type="text" className="form-control" id="companyInvoiceDesignation" value={data.confirmPassword} name="confirmPassword" onChange={handleInput} placeholder='Confirm Password' />
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