import React, { useState, useEffect } from 'react'

const SuccessMsg = (props) => {
  const [intMessage, setIntMessage] = useState('')
  let message = props.message

  useEffect(() => {
    if (props.autoDisappear) {
      const autoClearToId = window.setTimeout(() => {
        setIntMessage('')
      }, 10000)

      return function cleanup() {
        if (autoClearToId) window.clearTimeout(autoClearToId)
      }
    }
  }, [intMessage, props.autoDisappear])

  useEffect(() => {
    setIntMessage(message)
  }, [message])

  /*style={{ position: 'absolute', 'z-index': '1000', top: '0px', right: '0px' }} */
  return <>{intMessage.length > 0 && <div className="alert alert-success">{intMessage}</div>}</>
}

export default SuccessMsg
