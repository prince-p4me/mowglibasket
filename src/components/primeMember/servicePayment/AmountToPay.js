import React, { useState, useContext } from 'react'
import { TouchableOpacity, Text, TextInput, ScrollView } from 'react-native'
import MStyles from '../../../styles/MStyles'
import * as Animatable from 'react-native-animatable';
import { requestOrderAndPaymentDetails } from '../../../apis/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import { Context as AuthContext } from '../../../context/AuthContext'
import ToolbarBack from '../../../common/ToolbarBack'

const AmountToPay = (props) => {

    const { item } = props.route.params
    const { state: { user } } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState();

    const onAmountSubmit = () => {
        if (loading)
            return
        if (amount == undefined) { alert("Please enter amount") } else
            serverRequestForSubmitAmount()
    }

    const serverRequestForSubmitAmount = async () => {
        setLoading(true)
        requestOrderAndPaymentDetails(user.user_id, item.order_id, amount)
            .then(response => {
                if (response.status) {
                    navigatePaymentCheckout(response)
                } else {
                    alert(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }

    const navigatePaymentCheckout = (response) => {
        props.navigation.navigate("paymentCheckout", { response, amount, item })
    }

    return (
        <SafeAreaView style={[MStyles.main, MStyles.center, { width: '100%', flex: 1 }]}>
            <LinearProgressDialog loading={loading} />
            <ToolbarBack title='Payment Detail' {...props} />
            <ScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ width: '100%', flexGrow: 1 }}
                style={{ width: '100%' }} >
                <Animatable.View
                    animation='fadeInUpBig'
                    duration={500}
                    style={[MStyles.main, { width: '100%', padding: 30 }]}>
                    <Text style={[MStyles.txtDescriptionBold,{textAlign:'center'}]}> Please enter amount here that you want to pay</Text>
                    <TextInput
                        onChangeText={(txt) => setAmount(txt)}
                        returnKeyType="done"
                        style={MStyles.textInput}
                        placeholder="Enter your vegetable amount"
                        keyboardType='number-pad'
                        multiline={false}
                        maxLength={100} />
                    <TouchableOpacity
                        style={MStyles.buttonParent}
                        onPress={onAmountSubmit}>
                        <Text style={MStyles.themeButton}>Continue to Make Payment</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AmountToPay