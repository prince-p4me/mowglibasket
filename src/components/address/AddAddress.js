import React, { useState } from 'react'
import { requestAddAddress } from '../../apis/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddressForm from './AddressForm'

const AddAddress = (props) => {

    const { addressData } = props.route.params
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState()

    const onAddAddressClicked = (address, locationOnMap, setDefaultAddress) => {

        if (!address)
            return

        if (!address.first_name || address.first_name.trim().length === 0)
            alert("Please enter first name")
        // else if (!address.last_name || address.last_name.trim().length === 0)
        //     alert("Please enter last name")
        else if (!address.address_1 || address.address_1.trim().length === 0)
            alert("Please enter house number")
        // else if (!(
        //     addressData.area_name.includes('Rangoli Garden') ||
        //     addressData.area_name.includes('Rangoli Greens')) &&
        //     (!locationOnMap || (!locationOnMap.latitude && !locationOnMap.longitude) ||
        //         (locationOnMap.latitude == 0 && locationOnMap.longitude == 0)))
        //     alert("Please locate your address on map")
        else serverRequestForAddAddress(address, locationOnMap, setDefaultAddress);
    }

    const serverRequestForAddAddress = async (address, locationOnMap, setDefaultAddress) => {

        if (loading) return
        setLoading(true)

        let userData = await AsyncStorage.getItem('@user')
        let user = JSON.parse(userData)
        requestAddAddress(user.user_id, address, addressData, locationOnMap, setDefaultAddress)
            .then(response => {
                if (response.status) {
                    setLoading(false)
                    props.navigation.pop()
                } else {
                    setLoading(false)
                    alert(response.message)
                }
            })
            .catch(error => {
                setLoading(false)
            })
    }

    return (
        <AddressForm
            {...props}
            // user={user}
            title="Add New Address"
            loading={loading}
            area={addressData}
            address={address}
            setAddress={setAddress}
            onSubmit={onAddAddressClicked}
            defaultAddress={false} />
    )
}

export default AddAddress