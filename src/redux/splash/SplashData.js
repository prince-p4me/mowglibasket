import { SPLASH } from '../Types'

export const updateSplashLoad = (update) => ({
    type: SPLASH,
    loaded: update
})