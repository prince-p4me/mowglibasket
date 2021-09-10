import createDataContext from './createDataContext'

const initial = { cart: [], cartTotal: '0', data: {} }

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'update_home_cart':
            return { ...state, data: action.homeData, cart: action.cartData }
        case 'update_cart_total':
            return { ...state, cart: action.payload, cartTotal: action.count }
        case 'delete_cart':
            return { ...state, cart: [], cartTotal: '0' }
        default:
            return state
    }
}

const updateHomeAndCartData = (dispatch) => {
    return (homeData, cartData) => {
        dispatch({ type: 'update_home_cart', homeData: homeData, cartData: cartData })
    }
}

const updateCartAndTotal = (dispatch) => {
    return (data, count) => {
        dispatch({ type: 'update_cart_total', payload: data, count: count })
    }
}

const clearCart = (dispatch) => {
    return () => {
        dispatch({ type: 'delete_cart' })
    }
}

export const { Context, Provider } = createDataContext(
    cartReducer,
    { updateHomeAndCartData, updateCartAndTotal, clearCart },
    { initial }
)