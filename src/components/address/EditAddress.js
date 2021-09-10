import React, { useState } from 'react'
import { requestEditAddress } from '../../apis/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddressForm from './AddressForm'

const EditAddress = (props) => {

    const { id, defaultAddress, data } = props.route.params
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState(data)
    // const [user, setUser] = useState()


    // useEffect(() => {
    //     getUser()
    // }, [])

    // const getUser = async () => {
    //     let userData = await AsyncStorage.getItem('@user')
    //     // let user = JSON.parse(userData)
    //     setUser(JSON.parse(userData))
    // }

    const onAddAddressClicked = (address, locationOnMap, isdefault) => {

        if (!address)
            return


        if (!address.first_name || address.first_name.trim().length === 0)
            alert("Please enter first name")
        else if (!address.last_name || address.last_name.trim().length === 0)
            alert("Please enter last name")
        else if (!address.address_1 || address.address_1.trim().length === 0)
            alert("Please enter house number")
        // else if (!(
        //     address.area_name.includes('Rangoli Garden') ||
        //     address.area_name.includes('Rangoli Greens')) &&
        //     ((!address.latitude && !address.longitude) && (!locationOnMap || (!locationOnMap.latitude && !locationOnMap.longitude) ||
        //         (locationOnMap.latitude == 0 && locationOnMap.longitude == 0))))
        //     alert("Please locate your address on map")
        else serverRequestForAddAddress(locationOnMap);
    }

    const serverRequestForAddAddress = async (locationOnMap) => {
        if (loading) return
        setLoading(true)

        let userData = await AsyncStorage.getItem('@user')
        let user = JSON.parse(userData)
        requestEditAddress(user.user_id, address, locationOnMap)
            .then(response => {
                if (response.status) {
                    props.navigation.pop()
                } else {
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
            })
    }

    return (
        <AddressForm
            {...props}
            title="Edit Address"
            id={id}
            // user={user}
            address={address}
            setAddress={setAddress}
            loading={loading}
            onSubmit={onAddAddressClicked}
            defaultAddress={defaultAddress} />
    )
}

export default EditAddress