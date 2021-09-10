import { AUTH, USER } from '../Types'

const initial = { login: false, user: {} }

const LoginReducer = (state = initial, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, login: action.login }
        case USER:
            return { ...state, user: action.user }
        default:
            return state;
    }
}

export default LoginReducer