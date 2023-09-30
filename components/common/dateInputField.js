import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import FaCalendar from "../../assets/icons/faCalendar.svg"
import styles from '../../styles/dateInputField.module.scss';


const DateInputField = (props) => {
  const datePickerElement = useRef()

  const openDatePicker = () => {
    datePickerElement.current.input.click()
  }
  return (
    <div className={`${styles.dateWrapper} mb-3`}>
      <label htmlFor="InvoiceDate" className="form-label">{props.label}<span className={`${styles.green}`}>*</span></label>
      <div className={`d-flex align-content-center`}>
        <DatePicker
          className="form-control"
          id={props.id}
          aria-describedby="emailHelp"
          selected={props.selected}
          onChange={props.onChange}
          ref={datePickerElement}
        />
        <i><FaCalendar onClick={openDatePicker} /></i>
      </div>
    </div>
  )
}

export default DateInputField;