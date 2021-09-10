import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, TextInput, } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarBack from '../../common/ToolbarBack'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Search = (props) => {

    const [keyword, setKeyword] = useState("")
    const searchInput = useRef()

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            searchInput.current.focus()
        })
        return unsubscribe
    }, [props.navigation])

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title="Search Products" />
            <View style={[MStyles.mainGray]}>
                <View style={[MStyles.homeSearch, { justifyContent: 'flex-end' }]}>
                    <TextInput
                        ref={searchInput}
                        onChangeText={(txt) => setKeyword(txt)}
                        style={MStyles.homeSearchInput}
                        autoFocus={true}
                        focusable={true}
                        placeholder='Search for products'
                        returnKeyType='search'
                        onSubmitEditing={() => {
                            if (keyword)
                                props.navigation.navigate('productList', { type: "search", searchKeyword: keyword })
                        }} />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ position: 'absolute', paddingRight: 16 }}
                        onPress={() => {
                            if (keyword)
                                props.navigation.navigate('productList', { type: "search", searchKeyword: keyword })
                        }}>
                        <Ionicons
                            name='md-search' size={24}
                            color={Colors.dividerColor}
                            style={{ paddingRight: 0, paddingBottom: 10 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Search