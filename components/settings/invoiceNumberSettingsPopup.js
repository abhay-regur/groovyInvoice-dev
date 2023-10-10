import React, { useEffect, useState } from "react";
import RadioButton from '@/components/radioButton';
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
    var temp_data = data;
    var name = target.name || target.getAttribute('name');
    if (name != '') {
      temp_data[name] = target.value;
      let temp = Object.assign({}, temp_data)
      setData(temp)
    }
  }

  const handleRadioButtonChange = ({ target }) => {
    data[target.getAttribute('data-group')] = target.name.toLowerCase();
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
              <h5 className="modal-title"> Invoice ID</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className={`${styles.modalBody} modal-body`}>
              <div className="row">
                <div className="col-12 ">
                  <address className={`${styles.smallFont}`}>Your invoice numbers are set on auto-generate mode to save your time. Are you sure about changing this setting?</address>
                  <div className="form-check mb-1">
                    <span className={`${styles.invoiceNumberAutoGenrationRadioButtonWrapper} d-flex align-items-center`}>
                      <RadioButton
                        group="numberGenerationType"
                        name='auto-generate'
                        label="Continue auto-generating invoice numbers"
                        value={(data.numberGenerationType).toLowerCase() === 'auto-generate'}
                        onChange={handleRadioButtonChange}
                      />
                    </span>
                  </div>
                  {data.numberGenerationType == 'auto-generate' ?
                    <>
                      <div className="row mx-3 mb-3">
                        <div className="col-lg-4 pl-3">
                          <div className="mb-3">
                            <div className={`${styles.inputGroup} input-group`}>
                              <span className="input-group-text" id="invoiceIDPrefix">Prefix</span>
                              <input className="form-control" value={data.prefix} name="prefix" onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="mb-3">
                            <div className={`${styles.inputGroup} input-group`}>
                              <span className="input-group-text" id="invoiceIDNumber">Next Number</span>
                              <input className="form-control" value={data.nextNumber} name="nextNumber" onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="mb-3">
                            <div className={styles.invoiceIdPreview}>
                              <span>Preview : </span>
                              {data.prefix}-{data.nextNumber}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    : ''}
                  <div className="form-check mb-1">
                    <span className={`${styles.invoiceNumberManualGenrationRadioButtonWrapper} d-flex align-items-center`}>
                      <RadioButton
                        group="numberGenerationType"
                        name='manual'
                        label="I will add them manually each time"
                        value={(data.numberGenerationType).toLowerCase() === 'manual'}
                        onChange={handleRadioButtonChange}
                      />
                    </span>
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
