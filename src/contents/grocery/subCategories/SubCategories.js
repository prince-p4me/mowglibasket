import React, { useEffect, useContext, useState } from "react";
import { View } from "react-native"
import MStyles from "../../../styles/MStyles";
import { requestSubCategories } from "../../../apis/Api";

import { Context as FilterContext } from '../../../context/FilterContext'
import { Context as CartContext } from '../../../context/CartContext'

import SubCategoryComponent from "../../../components/grocery/subCategories/SubCategories";
import SubCategoriesShimmer from "../../../components/grocery/subCategories/SubCategoriesShimmer";

const SubCategories = (props) => {

    const { id, title } = props.route.params
    const { state, clearFilter, filtered } = useContext(FilterContext)
    const { state: { data, cart }, updateCartAndTotal, clearCart } = useContext(CartContext)
    const [myState, setMyState] = useState({ loading: true, data: {}, error: '' })

    useEffect(() => {
        serverRequestForCategories()
    }, [])

    const serverRequestForCategories = () => {
        requestSubCategories(id)
            .then(res => {
                setMyState({ ...myState, loading: false, data: res.data })
            })
            .catch(err => {
                setMyState({ ...myState, loading: false, error: err.message })
            })
    }

    return (
        <View style={MStyles.main}>
            {myState.loading ? <SubCategoriesShimmer /> :
                <SubCategoryComponent
                    {...props}
                    myState={myState}
                    cart={cart}
                    title={title} />
                    }
        </View>
    )
}

export default SubCategories