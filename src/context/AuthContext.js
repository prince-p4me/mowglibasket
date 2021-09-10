import createDataContext from './createDataContext'

const initial = { user: null, guest: false, splashLoaded: false }

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'update_user':
            return { ...state, user: action.payload, guest: true }
        case 'delete_user':
            return { ...state, user: null, guest: true }
        case 'update_guest':
            return { ...state, guest: action.payload }
        case 'update_splash_loaded':
            return { ...state, splashLoaded: true }
        default:
            return state
    }
}

const updateUser = (dispatch) => {
    return (data) => {
        dispatch({ type: 'update_user', payload: data })
    }
}

const deleteUser = (dispatch) => {
    return () => {
        dispatch({ type: 'delete_user' })
    }
}

const updateGuest = (dispatch) => {
    return (value) => {
        dispatch({ type: 'update_guest', payload: value ? value : true })
    }
}

const updateSplashLoaded = (dispatch) => {
    return () => {
        dispatch({ type: 'update_splash_loaded' })
    }
}

export const { Context, Provider } = createDataContext(
    cartReducer,
    { updateSplashLoaded, updateGuest, updateUser, deleteUser },
    { initial }
)