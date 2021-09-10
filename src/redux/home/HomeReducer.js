import { HOME } from '../Types'
const initial = { data: {} }

const HomeReducer = (state = initial, action) => {
    switch (action.type) {
        case HOME:
            return { ...state, data: action.data };

        default:
            return state;
    }
}

export default HomeReducer