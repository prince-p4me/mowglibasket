import createDataContext from './createDataContext'

const initial = { clicked: false }

const clickReducer = (state, action) => {
    switch (action.type) {
        case 'clicked':
            return { ...state, clicked: true }
        case 'clean':
            return { ...state, clicked: false }
        default:
            return state
    }
}

const setClicked = (dispatch) => {
    return () => {
        dispatch({ type: 'clicked' })
        setTimeout(() => {
            dispatch({ type: 'clean' })
        }, 1000);
    }
}

const setAsyncClicked = (dispatch) => {
    return () => {
        dispatch({ type: 'clicked' })
    }
}

const setClickFree = (dispatch) => {
    return () => {
        dispatch({ type: 'clean' })
    }
}

export const { Context, Provider } = createDataContext(
    clickReducer,
    { setClicked, setAsyncClicked, setClickFree },
    { initial }
)