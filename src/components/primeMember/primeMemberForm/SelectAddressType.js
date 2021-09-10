import React, { useContext } from 'react'
import { TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context'
import ToolbarBack from '../../../common/ToolbarBack'
import { Context as AuthContext } from '../../../context/AuthContext'

const SelectAddressType = (props) => {

    const { state: { user } } = useContext(AuthContext)

    const onResidentialAddressClick = () => {
        props.navigation.pop()
        props.navigation.navigate("primeMemberForm")
    }

    const onCommercialAddressClick = () => {
        props.navigation.pop()
        props.navigation.navigate("contactForm")
    }

    return (
        <SafeAreaView style={[MStyles.main, { flex: 1 }]}>

            <ToolbarBack title='Select Property Type' {...props} />

            <ScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ flexGrow: 1 }}  >

                <Animatable.View
                    animation='fadeInUpBig'
                    duration={500}
                    style={[MStyles.main, { padding: 20 }]}>

                    {
                        user && !user.prime_membership_id &&
                        // if login and not member
                        <>
                            <Text style={[MStyles.txtDescription, MStyles.center, { textAlign: 'center', marginBottom: 16, color: Colors.textGray }]}>You are not registered as prime member with us. To request services you need to register as prime member.</Text>
                            <Text style={[MStyles.txtDescriptionBold, { fontSize: 18, marginBottom: 10, marginTop: 20 }]}>STEP 1</Text>
                        </>
                    }

                    <Text style={[MStyles.txtDescription, MStyles.center, { textAlign: 'center' }]}>Please select property type where you want our services.</Text>
                    <TouchableOpacity style={MStyles.buttonParent} onPress={onResidentialAddressClick}>
                        <Text style={MStyles.themeButton}>Residential Property</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[MStyles.buttonParent, { marginTop: 20 }]} onPress={onCommercialAddressClick}>
                        <Text style={MStyles.themeButton}>Commercial Property</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        ...MStyles.txtDescriptionBold,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        backgroundColor: Colors.primary,
        shadowColor: Colors.black,
        overflow: "visible",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    }

})

export default SelectAddressType