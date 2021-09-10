import { AUTH, USER } from '../Types'

export const updateAuthStatus = (update) => ({
    type: AUTH,
    login: update
})

export const updateUserData = (userData) => ({
    type: USER,
    user: userData
})