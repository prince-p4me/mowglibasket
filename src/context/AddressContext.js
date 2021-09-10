import createDataContext from './createDataContext'

const initial = {}

const addressReducer = (state, actions) => {
    switch (actions.type) {
        case 'address_update':
            return { ...state, address: actions.payload }
        default:
            return state
    }
}

const selectDeliveryAddress = (dispatch) => {
    return (address) => {
        dispatch({ type: 'address_update', payload: address })
    }
}

export const { Context, Provider } = createDataContext(
    addressReducer,
    { selectDeliveryAddress },
    initial
)




