export const storeJWTToken = (token) => {
    localStorage.setItem("token", token)
}

export const getJWTToken = () => {
    return localStorage.getItem("token")
}

export const clearJWTToken = () => {
    localStorage.removeItem("token")
}