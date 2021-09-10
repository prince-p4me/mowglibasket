import React from 'react'

export const rootNav = React.createRef()

export function navigation(route, params) {
    rootNav.current?.navigate(route, params)
}
