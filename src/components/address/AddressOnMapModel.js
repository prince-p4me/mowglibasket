import React, { useState, useEffect, useRef } from 'react'
import {
    View, Modal, StyleSheet, TouchableOpacity, Text,
    Image, SafeAreaView, Platform, PermissionsAndroid, Alert,
    DeviceEventEmitter
} from 'react-native'
import Colors from '../../styles/Colors'
import MStyles from '../../styles/MStyles'
import MapView from 'react-native-maps'
import { HEADER_HEIGHT } from '../../common/Constants'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'

const AddressOnMapModel = ({ visibility, setVisibility, area, onLocationGet }, props) => {

    const _map = useRef()
    const pincode = area.pincode ? area.pincode : area.postcode
    const [marker, setMarker] = useState({ latitude: 0, longitude: 0 })
    const [region, setRegion] = useState(region)
    const [myLocatyion, setMyLocation] = useState({ latitude: 0, longitude: 0 })
    const [margins, setMargins] = useState(0)
    const [gpsEnabled, setGPSEnabled] = useState({})

    let watchId;
    let clickable = true

    useEffect(() => {
        Geocoder.init("AIzaSyDfU2N49DLxew9UrFj6eAkKqojU_SvEgco")

        if (visibility) {
            requestLocationPermission();
        }

        DeviceEventEmitter.addListener('locationProviderStatusChange',
            function (status) { // only trigger when "providerListener" is enabled
                setGPSEnabled(status)
            });
        // requestLocationPermission()
        return () => { Geolocation.clearWatch() }
    }, [visibility])

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation()
            subscribeLocation()
        } else {

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    // {
                    //     title: 'Location access required',
                    //     message: 'This app needs to access your location'
                    // }
                )

                if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                    getOneTimeLocation()
                    subscribeLocation()
                } else {
                    console.warn("Permission denined")
                }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    useEffect(() => {
        _onMapReady()
    }, [visibility, gpsEnabled])

    const checkIsLocation = async () => {
        // let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
        //     message: "Enable GPS to get your current location ?",
        //     ok: "Settings",
        //     cancel: "cancel",
        //     enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        //     showDialog: true, // false => Opens the Location access page directly
        //     openLocationServices: true, // false => Directly catch method is called if location services are turned off
        //     preventOutSideTouch: false, //true => To prevent the location services window from closing when it is clicked outside
        //     preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        //     providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        // }).catch(error => {});

        let check = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        }).then((data) => {
            // setGPSEnabled(check.enabled)
            getOneTimeLocation()
            // subscribeLocation()
            // requestLocationPermission()
            // recenter()
        }).catch((err) => {
        })

        // if (check && check.status) {
        //     setGPSEnabled(check.enabled)
        //     return Object.is(check.status, "enabled");
        // }
    }


    const onLocationSelect = () => {
        if (!clickable) return

        let isFound = false;
        Geocoder.from(marker.latitude, marker.longitude)
            .then(json => {
                var result = json.results[0];
                let lastIndex = result.address_components.length - 1
                let long_name = result.address_components[lastIndex].long_name
                let short_name = result.address_components[lastIndex].short_name
                if (long_name === pincode || short_name === pincode) {
                    isFound = true;
                    return;
                }
                // for (let i = 0; i < result.address_components.length; i++) {
                //     let long_name = result.address_components[i].long_name
                //     let short_name = result.address_components[i].short_name
                //     if (long_name === pincode || short_name === pincode) {
                //         isFound = true;
                //         return;
                //     }
                // }
            })
            .catch(error => { console.warn(error) });

        setTimeout(() => {
            if (isFound) {
                // Alert.alert("Valid selection")
                onLocationGet(marker)
            } else {

                Alert.alert(
                    "Error",
                    `You have selected ${area.area_name}, but seems you are locating in other area on map`,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                            }
                        }
                    ]
                )
                // Alert.alert(`You have selected ${area.area_name}, but seems you are locating in other area on map`)
            }
        }, 800);
    }

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                // setMyLocation({
                //     latitude: JSON.stringify(position.coords.latitude),
                //     longitude: JSON.stringify(position.coords.longitude)
                // })
                setMarker({
                    latitude: JSON.stringify(position.coords.latitude),
                    longitude: JSON.stringify(position.coords.longitude)
                })
                setRegion({
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: .01,
                    longitudeDelta: .01
                })
                let positions = {
                    latitude: JSON.stringify(position.coords.latitude),
                    longitude: JSON.stringify(position.coords.longitude)
                }
            },
            (error) => {
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                // maximumAge: 1000
            }
        )
    }

    const subscribeLocation = () => {
        watchId = Geolocation.watchPosition(
            (position) => {
                // setMyLocation({
                //     latitude: JSON.stringify(position.coords.latitude),
                //     longitude: JSON.stringify(position.coords.longitude)
                // })
                setMarker({
                    latitude: JSON.stringify(position.coords.latitude),
                    longitude: JSON.stringify(position.coords.longitude)
                })
                // setRegion({
                //     latitude: JSON.stringify(position.coords.latitude),
                //     longitude: JSON.stringify(position.coords.longitude)
                // })
                setRegion({
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: .01,
                    longitudeDelta: .01
                })
            },
            (error) => {
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            }
        )
    }

    const onReasonChange = (region) => {
        // setRegion(region)
        // setMarker({ latitude: region.latitude, longitude: region.longitude })

        clickable = false
        setRegion(region)
        // setMarker({ latitude: region.latitude, longitude: region.longitude })
        setMarker({
            latitude: JSON.stringify(region.latitude),
            longitude: JSON.stringify(region.longitude)
        })
    }

    const ToolbarBack = () => {
        return (
            <SafeAreaView style={[MStyles.horizontal, {
                height: undefined,
                minHeight: HEADER_HEIGHT,
                width: '100%',
                backgroundColor: Colors.primaryDark,
                alignItems: 'center'
            }]}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50 }}>
                    <Text style={[MStyles.txtTitle, { color: Colors.white, textAlign: 'center' }]}> {props.title} </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { setVisibility(false) }}>
                    <Image source={require('../../images/back.png')} style={{ tintColor: Colors.white }} />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    const recenter = () => {
        Alert.alert(
            "",
            "Recenter your location",
            [
                // {
                //     text: "Cancel",
                //     onPress: () => { }
                // },
                {
                    text: 'Recenter',
                    onPress: () => {
                        requestLocationPermission()
                    }
                }
            ]
        )

    }

    const _onMapReady = () => {
        if (margins == 0)
            setMargins(1)
        else
            setMargins(0)
        setTimeout(() => {
            if (visibility && gpsEnabled) {
                checkIsLocation()
            }
            else if (visibility) {
                requestLocationPermission()
            }

        }, 500)
    }

    return (
        <Modal visible={visibility} transparent animationType='fade'>
            <View style={[styles.main]} >
                <View style={[styles.dialog]}>

                    <ToolbarBack {...props} title="Location" />
                    <View style={styles.mapContainer}>
                        <MapView
                            ref={_map}
                            // style={styles.map}
                            style={{ flex: 1, margin: margins }}
                            initialRegion={region}
                            onRegionChangeComplete={onReasonChange}
                            // showsUserLocation={true}
                            // followsUserLocation={true}
                            showsMyLocationButton
                            followsUserLocation
                            showsUserLocation
                            onMapReady={_onMapReady}>
                        </MapView>
                        <Image style={styles.pin} source={require('../../images/pin_map.png')} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[{ backgroundColor: Colors.primaryDark }]}
                        onPress={onLocationSelect}>
                        <Text style={[MStyles.themeButton, { padding: 13 }]}>Select This Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.transparent,
    },
    dialog: {
        flex: 1,
        backgroundColor: Colors.white
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    map: {
        flex: 1,
    },
    pin: {
        position: 'absolute',
        alignSelf: 'center',
        paddingBottom: 40,
        bottom: '54%',
        top: '46%'
        // marginBottom:30
    }
})

export default AddressOnMapModel