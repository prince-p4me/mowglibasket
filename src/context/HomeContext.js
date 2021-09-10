import createDataContext from './createDataContext'

const initial = { data: {} }

const homeReducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return { ...state, data: action.payload }
        case 'clear':
            return { ...state, data: {} }
        default:
            return state
    }
}

const updateHomeData = (dispatch) => {
    return (data) => {
        dispatch({ type: 'update', payload: data })
    }
}

const clearData = (dispatch) => {
    return () => {
        dispatch({ type: 'clear' })
    }
}


export const { Context, Provider } = createDataContext(
    homeReducer,
    { updateHomeData, clearData },
    { initial }
)