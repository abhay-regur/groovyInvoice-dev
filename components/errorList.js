import React, { useEffect } from 'react'

export const scrollErrorsToView = () => {
  const element = document.getElementById('errors-list')
  element.scrollIntoView(false)
}

const ErrorList = (props) => {
  const errors = []
  const autoScroll = props.autoScroll === false ? false : true
  if (typeof props.errors == 'string') {
    errors.push(props.errors)
  } else if (typeof props.errors == 'object') {
    props.errors.map((error) => {
      return errors.push(error)
    })
  }

  useEffect(() => {
    if (autoScroll === true && props.errors.length > 0) {
      scrollErrorsToView()
    }
  }, [props.errors, autoScroll])

  //console.log(props.errors)

  return (
    <>
      {errors.length > 0 && (
        <ul id="errors-list" className="alert alert-danger ">
          {errors.map((error, key) => {
            return <li key={key}>{error}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default ErrorList
