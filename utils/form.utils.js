const disableSubmitButton = (form, name = 'btn-submit') => {
  form.elements[name].disabled = true
  form.elements[name].classList.add('loading')
}

const enableSubmitButton = (form, name = 'btn-submit') => {
  form.elements[name].disabled = false
  form.elements[name].classList.remove('loading')
}

const disableElement = (element) => {
  element.disabled = true
  element.classList.add('loading')
}

const enableElement = (element) => {
  element.disabled = false
  element.classList.remove('loading')
}

export {
  disableSubmitButton,
  enableSubmitButton,
  disableElement,
  enableElement
}