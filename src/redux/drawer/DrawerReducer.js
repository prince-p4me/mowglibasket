import { DRAWER } from '../Types'

const initial = { menu: {} }

const DrawerReducer = (state = initial, action) => {
    switch (action.type) {
        case DRAWER:
            return { ...state, menu: action.menu }
        default:
            return state;
    }
}

export default DrawerReducer