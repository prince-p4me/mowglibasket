import React, { useState } from 'react'
import {
    View, Modal, StyleSheet, Text,
    TextInput, TouchableOpacity
} from 'react-native'
import Colors from '../../styles/Colors'
import MStyles from '../../styles/MStyles'

const CouponCodeDialog = ({ visibility, onSubmit, setVisibility }) => {

    const [coupon, setCoupon] = useState()

    return (
        <Modal visible={visibility} transparent animationType='fade'>
            <TouchableOpacity style={[styles.main]}
                onPress={() => setVisibility(false)}>

                <View style={[styles.dialog]}>
                    <Text style={MStyles.txtSubTitle}>Enter Coupon</Text>
                    <TextInput
                        style={MStyles.textInput}
                        placeholder="Enter coupon code here"
                        value={coupon}
                        autoCapitalize='characters'
                        onChangeText={txt => setCoupon(txt)} />
                    <TouchableOpacity
                        onPress={() => {
                            onSubmit(coupon)
                        }}
                        style={[MStyles.buttonSmallParent, styles.buttonCoupon]}>
                        <Text style={MStyles.themeButtonSmall}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    dialog: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 20,
        width: '100%',
    },
    buttonCoupon: {
        alignSelf: 'baseline',
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 16
    }
})

export default CouponCodeDialog