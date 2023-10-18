import React, { useEffect, useState, useRef, useContext } from "react";
import RadioButton from '@/components/radioButton';
import styles from "../../styles/popup.module.scss";
import { getInvoiceNumberSetting, saveInvoiceNumberSetting } from '@/services/invoice-number-setting.service';
import FaSave from '@/assets/icons/faSave.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import ErrorList from '@/components/errorList';
import { enableElement, disableElement } from '@/utils/form.utils';
import { ToastMsgContext } from '@/context/ToastMsg.context';

const InvoiceNumberSettingsPopup = ({ getInvoiceNumber }) => {
  const closeModalBtn = useRef();
  const [errors, setErrors] = useState([]);
  const { setToastList } = useContext(ToastMsgContext);
  const [data, setData] = useState({
    auto_generate: true,
    prefix_string: '',
    next_number: ''
  })

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
    data['auto_generate'] = (target.value == 'auto-generate' ? true : false);
    let temp = Object.assign({}, data)
    setData(temp)
  }

  const getData = async () => {
    const result = await getInvoiceNumberSetting();
    setData(result.data)
  }

  const closePopup = () => {
    closeModalBtn.current.click()
    getInvoiceNumber()
  }

  const handleSubmit = async (e) => {
    setErrors([])
    disableElement(e.target)
    try {
      const result = await saveInvoiceNumberSetting(data)
      setToastList([{
        id: Math.floor((Math.random() * 101) + 1),
        title: result.data.message,
        description: '',
      }]);
      closePopup()
    } catch (error) {
      setErrors(error.response.data.message)
    }
    enableElement(e.target)
  }

  useEffect(() => {
    getData()
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
              <button type="button" ref={closeModalBtn} className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className={`${styles.modalBody} modal-body`}>
              <div className="row">
                <ErrorList errors={errors} />
                <div className="col-12 ">
                  <address className={`${styles.smallFont}`}>Your invoice numbers are set on auto-generate mode to save your time. Are you sure about changing this setting?</address>
                  <div className="form-check mb-1">
                    <span className={`${styles.invoiceNumberAutoGenrationRadioButtonWrapper} d-flex align-items-center`}>
                      <RadioButton
                        group="auto_generate"
                        name='auto-generate'
                        value='auto-generate'
                        label="Continue auto-generating invoice numbers"
                        checked={data.auto_generate}
                        onChange={handleRadioButtonChange}
                      />
                    </span>
                  </div>
                  {data.auto_generate ?
                    <>
                      <div className="row mx-3 mb-3">
                        <div className="col-lg-4 pl-3">
                          <div className="mb-3">
                            <div className={`${styles.inputGroup} input-group`}>
                              <span className="input-group-text" id="invoiceIDPrefix">Prefix</span>
                              <input className="form-control" value={data.prefix_string} name="prefix_string" onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="mb-3">
                            <div className={`${styles.inputGroup} input-group`}>
                              <span className="input-group-text" id="invoiceIDNumber">Next Number</span>
                              <input className="form-control" value={data.next_number} name="next_number" onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="mb-3">
                            <div className={styles.invoiceIdPreview}>
                              <span>Preview : </span>
                              {data.prefix_string + data.next_number}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    : ''}
                  <div className="form-check mb-1">
                    <span className={`${styles.invoiceNumberManualGenrationRadioButtonWrapper} d-flex align-items-center`}>
                      <RadioButton
                        group="auto_generate"
                        name='manual'
                        value='manual'
                        label="I will add them manually each time"
                        checked={!data.auto_generate}
                        onChange={handleRadioButtonChange}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col-6">
                  <button name="btn-submit" className={`${styles.saveButton} btn blue`} type='submit' onClick={handleSubmit}>
                    <span>
                      <i><FaSave /></i>
                      Save
                    </span>
                  </button>
                </div>
                <div className="col-6">
                  <button className={`${styles.cancelButton} btn blueOutline`} type="button" data-bs-dismiss="modal" aria-label="Close">
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
    </>
  )
}

export default InvoiceNumberSettingsPopup;
