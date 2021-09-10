import React, { memo } from 'react'
import { View, TouchableOpacity, Text, } from 'react-native'
import MStyles from '../../styles/MStyles'
import { TextInput } from 'react-native-gesture-handler'
import Colors from '../../styles/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SearchHeader = (props) => {
    // const { data } = props

    return (
        <View style={MStyles.main}>
            <View style={[MStyles.homeSearch, { justifyContent: 'flex-end', }]}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        props.navigation.navigate('search')
                    }} >
                    <TextInput
                        style={[MStyles.homeSearchInput, { flex: 1 }]}
                        placeholder='Search for products'
                        pointerEvents={"none"}
                        editable={false} />
                </TouchableOpacity>
                <Ionicons
                    name='md-search'
                    size={24} color={Colors.dividerColor}
                    style={{ position: 'absolute', paddingRight: 16, paddingBottom: 10 }} />
            </View>
            {/* {
                data?.delivery_text &&
                <View style={styles.deliveryCard}>
                    <FastImage
                        style={{ width: 20, tintColor: 'black' }}
                        resizeMode='cover'
                        source={require('../../images/delivery_truck.png')} />
                    <Text style={styles.deliveryText}>{data.delivery_text}</Text>
                </View>
            } */}
        </View >
    )
}


export default memo(SearchHeader)