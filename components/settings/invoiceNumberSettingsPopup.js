import React, { useEffect, useState } from "react";
import styles from "../../styles/popup.module.scss";

const InvoiceNumberSettingsPopup = () => {
  const [data, setData] = useState({
    numberGenerationType: 'auto-generate',
    prefix: '',
    nextNumber: ''
  })

  const { Modal } = require("bootstrap");

  const toggleModal = () => {
    const myModal = new Modal("#invoice-number-settings");
    myModal.show();
  }

  const handleChange = ({ target }) => {
    data[target.name] = target.value
    let temp = Object.assign({}, data)
    setData(temp)
  }

  useEffect(() => {
    toggleModal()
  }, [])

  return (
    <>
      <div
        className={`${styles.modalWrapper} modal`}
        tabIndex="-1"
        id="invoice-number-settings"
        aria-labelledby="updateCustomerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className={`${styles.modalHeader} modal-header`}>
              <h5 className="modal-title"> Invoice Number</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 ">
                  <address className={`${styles.smallFont}`}>Your invoice numbers are set on auto-generate mode to save your time. Are you sure about changing this setting?</address>
                  <div className="form-check mb-1">
                    <label className=" d-flex align-content-center">
                      <input defaultChecked={data.numberGenerationType == 'auto-generate' ? true : false } name="numberGenerationType" type="radio" value="auto-generate" onClick={handleChange} />
                      <span>Continue auto-generating invoice numbers</span>
                    </label>
                  </div>
                  {data.numberGenerationType == 'auto-generate' ?
                    <>
                      <div className="row mx-3 mb-3">
                        <div className="col-lg-3 pl-3">
                          <small>Prefix</small>
                          <input className="form-control" value={data.prefix} name="prefix" onChange={handleChange}/>
                        </div>
                        <div className="col-lg-6">
                          <small>Next Number</small>
                          <input className="form-control" value={data.nextNumber} name="nextNumber" onChange={handleChange}/>
                        </div>
                      </div>
                    </>
                    : ''}
                  <div className="form-check mb-1">
                    <label className=" d-flex align-content-center">
                      <input defaultChecked={data.numberGenerationType == 'manual' ? true : false } name="numberGenerationType" type="radio" value="manual" onClick={handleChange} />
                      <span>I will add them manually each time</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceNumberSettingsPopup;
