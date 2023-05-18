import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PasswordToggler(props) {
  //Show password on eye icon click
  const [passwordShown, setPasswordShown] = useState(false)

  // Password toggle
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  function handleClick() {
    const passwordInput = document.getElementById(props.refId)
    togglePassword()
    passwordInput.type === 'password'
      ? (passwordInput.type = 'text')
      : (passwordInput.type = 'password')
  }

  return (
    <i className="toggle-visibility-wrapper" onClick={handleClick}>
      <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
    </i>
  )
}
