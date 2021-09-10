import React, { useEffect, useContext, useState } from "react";
import { View } from "react-native"
import MStyles from "../../../styles/MStyles";
import { requestSubCategories } from "../../../apis/Api";

// import { Context as FilterContext } from '../../../context/FilterContext'
import { Context as CartContext } from '../../../context/CartContext'

import GroceryComponent from "../../../components/grocery/categories/Grocery";
import GroceryShimmer from "../../../components/grocery/categories/GroceryShimmer";

const Grocery = (props) => {

    // const { state, clearFilter, filtered } = useContext(FilterContext)
    const { state: { data, cart }, updateCartAndTotal, clearCart } = useContext(CartContext)

    const id = '2224'; // grocery ID
    const [myState, setMyState] = useState({ loading: true, data: {}, error: '' })

    useEffect(() => {
        serverRequestForCategories()
    }, [])

    const serverRequestForCategories = () => {
        requestSubCategories(id)
            .then(res => setMyState({ ...myState, loading: false, data: res.data }))
            .catch(err => setMyState({ ...myState, loading: false, error: err.message }))
    }

    return (
        <View style={MStyles.main}>
            {myState.loading ? <GroceryShimmer /> :
                <GroceryComponent
                    {...props}
                    myState={myState}
                    cart={cart}
                />
            }
        </View>
    )
}

export default Grocery