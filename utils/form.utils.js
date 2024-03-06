const disableSubmitButton = (form, name = 'btn-submit') => {
  const element = form.elements[name];
  if (element.length > 0) {
    disableElement(element[element.length - 1])
  }
}

const enableSubmitButton = (form, name = 'btn-submit') => {
  const element = form.elements[name];
  if (element.length > 0) {
    enableElement(element[element.length - 1])
  }
}

const disableElement = (element) => {
  element.disabled = true
  if (element.firstChild) {
    element.firstChild.classList.add('hide')
  }
  const childNode = document.createElement("span");
  childNode.classList.add('loading')
  childNode.textContent = 'Loading'
  element.append(childNode)
}

const enableElement = (element) => {
  element.disabled = false
  const childNode = element.getElementsByClassName('loading')
  if (childNode.length > 0) {
    element.removeChild(childNode[0])
  }
  const hiddenChild = element.getElementsByClassName('hide')
  if (hiddenChild.length > 0) {
    hiddenChild[0].classList.remove('hide')
  }
}

export {
  disableSubmitButton,
  enableSubmitButton,
  disableElement,
  enableElement
}