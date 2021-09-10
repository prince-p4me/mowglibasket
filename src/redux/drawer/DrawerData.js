import { DRAWER } from '../Types'

export const updateDrawerMenu = (data) => ({
    type: DRAWER,
    menu: data
})