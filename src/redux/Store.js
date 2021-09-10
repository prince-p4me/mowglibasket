
import { combineReducers, createStore } from 'redux'
import SplashReducer from './splash/SplashReducer'
import LoginReducer from './auth/LoginReducer'
import DrawerReducer from './drawer/DrawerReducer'
import HomeReducer from './home/HomeReducer'

const combine = combineReducers(
    {
        SplashReducer: SplashReducer,
        loginReducer: LoginReducer,
        drawerReducer: DrawerReducer,
        homeReducer: HomeReducer
    }
)

const Store = createStore(combine)

export default Store
