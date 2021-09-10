import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, View,  Text, TextInput, ScrollView } from 'react-native'
import MStyles from '../../../styles/MStyles'
import * as Animatable from 'react-native-animatable';
import {  requestContactUs } from '../../../apis/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import { Context as AuthContext } from '../../../context/AuthContext'
import ToolbarBack from '../../../common/ToolbarBack'
import { SHIMMER_SPEED, COLOR_DISABLED } from '../../../common/Constants';
import Shimmer from 'react-native-shimmer'

const ContactForm = (props) => {

    const { state: { user, guest }, updateGuest } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(user ? user.first_name : null);
    const [email, setEmail] = useState(user ? user.user_email : null);
    const [phone, setPhone] = useState(user ? user.phone : null);
    const [message, setMessage] = useState();

    // console.log(user)

    useEffect(() => {
        if (user) {
            setName(user.first_name)
            setEmail(user.user_email)
            setPhone(user.phone)
        }
    }, [user])

    const onSubmitClick = () => {
        if (loading)
            return

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regPhone = /^[0]?[6789]\d{9}$/;
        if (name == undefined) { alert("Please enter your name") } else
            if (email == undefined) { alert("Please enter your email") } else
                if (!reg.test(email)) { alert("Please enter a valid email") } else
                    if (phone == undefined) { alert("Please enter your phone number") } else
                        if (!regPhone.test(phone)) { alert("Please enter valid phone number") } else
                            serverRequestForContactUs()
    }

    const serverRequestForContactUs = async () => {
        // return
        setLoading(true)

        requestContactUs(user, name, email, phone, message)
            .then(response => {
                if (response.status) {
                    navigateToSuccess(response.data, response.message)
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

    const navigateToSuccess = (response, message) => {
        props.navigation.navigate("contactSuccess")
    }

    return (
        <SafeAreaView style={[MStyles.main, MStyles.center, { width: '100%', flex: 1 }]}>
            <LinearProgressDialog loading={loading} />
            <ToolbarBack title='Contact Us' {...props} />
            <ScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ width: '100%', flexGrow: 1 }}
                style={{ width: '100%' }} >
                <Shimmer
                    tilt={45}
                    animating={loading}
                    pauseDuration={SHIMMER_SPEED}
                    opacity={loading ? 0.3 : 1}
                    intensity={.3}
                    highlightLength={1}>
                    <Animatable.View
                        animation='fadeInUpBig'
                        duration={500}
                        style={[MStyles.main, { width: '100%', padding: 30 }]}>
                        <Text style={[MStyles.txtDescription, { textAlign: 'center' ,marginBottom:16}]}> In case of commercial property you need to submit this enquiry form and describe little bit about your property in property description.</Text>
                        <View style={[user ? { backgroundColor: COLOR_DISABLED, padding: 12 } : null]}>
                            <Text style={[MStyles.txtDescription]}> Name </Text>
                            <TextInput
                                value={name}
                                onChangeText={(txt) => setName(txt)}
                                editable={user ? false : true}
                                returnKeyType="next"
                                style={MStyles.textInput}
                                placeholder="Enter your full name here"
                                multiline={false}
                                maxLength={100} />
                            <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Email Address </Text>
                            <TextInput
                                value={email}
                                onChangeText={(txt) => setEmail(txt)}
                                returnKeyType="next"
                                editable={user ? false : true}
                                style={MStyles.textInput}
                                placeholder="Enter your email address"
                                multiline={false}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                maxLength={100} />
                            <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Phone Number </Text>
                            <TextInput
                                value={phone}
                                onChangeText={(txt) => setPhone(txt)}
                                editable={user ? false : true}
                                returnKeyType="next"
                                style={MStyles.textInput}
                                placeholder="Enter your phone number"
                                multiline={false}
                                keyboardType='phone-pad'
                                maxLength={10} />
                        </View>
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Property Description </Text>
                        <TextInput
                            onChangeText={(txt) => setMessage(txt)}
                            returnKeyType="done"
                            style={[MStyles.textInput, { height: undefined, maxHeight: 100 }]}
                            placeholder="Enter your property description"
                            multiline={true} />
                        <TouchableOpacity style={MStyles.buttonParent} onPress={onSubmitClick}>
                            <Text style={MStyles.themeButton}>Submit Enquiry</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </Shimmer>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactForm