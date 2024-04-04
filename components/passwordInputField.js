import React, { useState } from 'react'
import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PasswordInputField(props) {
  //Show password on eye icon click
  const [passwordShown, setPasswordShown] = useState(false)

  // Password toggle
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <>
      {props.showKeyIcon ? (
        <i>
          <FontAwesomeIcon icon={faKey} />
        </i>
      ) : ''}
      <input type={passwordShown ? "text" : "password"} placeholder={props.placeholder} className={props.className} name={props.name} value={props.value} onChange={props.onChange} id={props.id ? props.id : props.name} onBlur={props.onBlur} />
      <i className="toggle-visibility-wrapper" onClick={togglePassword}>
        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
      </i>
    </>
  )
}
