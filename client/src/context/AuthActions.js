export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
})

export const LoginFailure = (err) => ({
    type: "LOGIN_FAILURE",
    payload: err
})

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"
})

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user
})

export const UpdateFailure = (err) => ({
    type: "UPDATE_FAILURE",
    payload: err
})

export const Logout = () => ({
    type: "LOGOUT"
})