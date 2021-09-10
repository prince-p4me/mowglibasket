import React, { useEffect } from 'react'
import {
    View, Text, TouchableOpacity,
    StyleSheet, BackHandler, ScrollView
} from 'react-native'
import { StackActions } from '@react-navigation/native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { HEADER_HEIGHT, RUPEES } from '../../common/Constants'

const DirectBankTransferSuccess = (props) => {

    const { data } = props.route.params

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handelBackPress)
        return () => BackHandler.removeEventListener('hardwareBackPress', handelBackPress);
    }, [])

    const handelBackPress = () => {
        return true
    }

    return (
        <ScrollView style={MStyles.main}>

            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}> Payment Details </Text>
            </View>

            <Text style={styles.title}>{data.title}</Text>

            <View style={styles.border}>
                <View style={styles.row}>
                    <Text style={styles.label}>Order ID</Text>
                    <View style={styles.verticalDivider} />
                    <Text style={styles.value}>{data.order_id}</Text>
                </View>
                <View style={MStyles.divider} />
                <View style={styles.row}>
                    <Text style={styles.label}>Order Total</Text>
                    <View style={styles.verticalDivider} />
                    <Text style={styles.value}>{RUPEES} {data.total}</Text>
                </View>
            </View>

            <Text style={styles.title}>{data.bank_title}</Text>

            <View style={styles.border}>
                <View style={styles.row}>
                    <Text style={styles.label}>Bank Name</Text>
                    <View style={styles.verticalDivider} />
                    <Text style={styles.value}>{data.bank_name}</Text>
                </View>
                <View style={MStyles.divider} />
                <View style={styles.row}>
                    <Text style={styles.label} >Name In Account</Text>
                    <View style={styles.verticalDivider} />
                    <Text style={styles.value}>{data.account_name}</Text>
                </View>
                <View style={MStyles.divider} />
                <View style={styles.row}>
                    <Text style={styles.label} >Account Number</Text>
                    <View style={styles.verticalDivider} />
                    <Text style={styles.value}>{data.account_number}</Text>
                </View>
                <View style={MStyles.divider} />
                <View style={styles.row}>
                    <Text style={styles.label} >IFSC Code</Text>
                    <View style={styles.verticalDivider} />
                    <Text style={styles.value}>{data.ifsc}</Text>
                </View>
            </View>

            {
                (data.message && data.message !== "") ?
                    < Text style={styles.message}>{data.message}</Text>
                    : null
            }

            <TouchableOpacity
                onPress={() => {
                    props.navigation.dispatch({
                        ...StackActions.replace('home',
                            { screen: 'home' })
                    })
                }}
                activeOpacity={0.5}
                style={[MStyles.buttonSmallParent, styles.buttonStyle]} >
                <Text style={[MStyles.themeButtonSmall]}>GO TO HOME</Text>
            </TouchableOpacity>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    toolbar: {
        minHeight: HEADER_HEIGHT,
        backgroundColor: Colors.primaryDark,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbarTitle: {
        ...MStyles.txtTitle,
        color: Colors.white,
        textAlign: 'center'
    },
    buttonStyle: {
        marginHorizontal: 16
    },
    title: {
        ...MStyles.txtTitleSmall,
        marginTop: 10,
        marginHorizontal: 16
    },
    border: {
        borderColor: Colors.dividerColor,
        borderWidth: 1,
        margin: 16,
    },
    row: {
        flexDirection: 'row',
    },
    label: {
        ...MStyles.txtDescription,
        flex: .5,
        padding: 16
    },
    value: {
        ...MStyles.txtDescription,
        flex: .5,
        padding: 16
    },
    message: {
        ...MStyles.txtSubTitle,
        padding: 16,
        textAlign: "center"
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.dividerColor
    }
})

export default DirectBankTransferSuccess