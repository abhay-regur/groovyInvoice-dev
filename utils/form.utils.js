const disableSubmitButton = (form, name = 'btn-submit') => {
  form.elements[name].disabled = true
  form.elements[name].classList.add('loading')
}

const enableSubmitButton = (form, name = 'btn-submit') => {
  form.elements[name].disabled = false
  form.elements[name].classList.remove('loading')
}

export {
  disableSubmitButton,
  enableSubmitButton
}