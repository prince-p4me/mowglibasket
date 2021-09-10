import {SPLASH} from '../Types'

const initialState = { loaded: false }

const SplashReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPLASH:
            return { ...state, loaded: action.loaded };
        default:
            return state;
    }
}

export default SplashReducer