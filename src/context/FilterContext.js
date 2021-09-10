import createDataContext from './createDataContext'

const filter = { brands: [], maxPrice: '', minPrice: '', sortBy: '' }

const filterReducer = (state, action) => {
    switch (action.type) {
        case 'update_filter':
            return { ...state, filter: action.payload, updated: true }
        case 'clear_filter':
            return { ...state, filter: { brands: [], maxPrice: '', minPrice: '', sortBy: '' }, updated: false }
        case 'apply_sorting':
            return { ...state, filter: { ...filter, sortBy: action.payload }, updated: true }
        case 'update_done':
            return { ...state, updated: action.payload }
        default:
            return state
    }
}

const applyFilter = (dispatch) => {
    return (data) => {
        dispatch({ type: 'update_filter', payload: data })
    }
}

const applySorting = (dispatch) => {
    return (data) => {
        dispatch({ type: 'apply_sorting', payload: data })
    }
}

const clearFilter = (dispatch) => {
    return () => {
        dispatch({ type: 'clear_filter' })
    }
}

const filtered = (dispatch) => {
    return (data) => {
        dispatch({ type: 'update_done', payload: data })
    }
}

export const { Context, Provider } = createDataContext(
    filterReducer,
    { applyFilter, clearFilter, applySorting, filtered },
    { filter }
)