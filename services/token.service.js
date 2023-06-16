export const saveToken = (tokenName, accessToken) => {
  return localStorage.setItem(tokenName, accessToken)
}
export const removeToken = (tokenName) => {
  localStorage.removeItem(tokenName)
}

export const getToken = (tokenName) => {
  const token = localStorage.getItem(tokenName)
  return token
}
