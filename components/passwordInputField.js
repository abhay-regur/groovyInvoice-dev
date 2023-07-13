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
      <input type={passwordShown ? "test" : "password"} placeholder={props.placeholder} className="form-control" name={props.name} value={props.value} onChange={props.onChange} id="password" />
      <i className="toggle-visibility-wrapper" onClick={togglePassword}>
        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
      </i>
    </>
  )
}
