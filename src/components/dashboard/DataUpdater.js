import React, { useEffect, useContext } from 'react'
import { Context as CartContext } from '../../context/CartContext'

const dataUpdater = ({ response }) => {
    const { updateHomeAndCartData } = useContext(CartContext)

    useEffect(() => {
        if (response != null) {
            updateHomeAndCartData(response.data, response.data.cart_data)
        }
    }, [response])

    return (
        <>
        </>
    )
}

export default dataUpdater