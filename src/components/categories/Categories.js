import React, { useState, useContext } from 'react'
import {
    View, TouchableOpacity, Text,
    SectionList, TextInput, Image
} from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarMain from '../../common/ToolbarMain'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ErrorView from '../../common/ErrorView'
import { Context as CartContext } from '../../context/CartContext'

const Categories = (props) => {

    const [openIndex, setOpenIndex] = useState("")
    const { state: { data } } = useContext(CartContext)

    const Header = () => {
        return (
            <View style={MStyles.main}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    props.navigation.navigate('search')
                }} >
                    <View style={[MStyles.homeSearch, { justifyContent: 'flex-end' }]}>
                        <TextInput
                            style={[MStyles.homeSearchInput]}
                            placeholder='Search for products'
                            pointerEvents={"none"}
                            editable={false} />
                        <Ionicons
                            name='md-search'
                            size={24} color={Colors.dividerColor}
                            style={{ position: 'absolute', paddingRight: 16, paddingBottom: 10 }} />
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => { props.navigation.navigate('search') }} >
                    <View style={[MStyles.homeSearch,  { justifyContent: 'flex-end' }]}>
                        <TextInput style={MStyles.homeSearchInput} pointerEvents='none' editable={false} placeholder='Search for products' />
                        <Ionicons name='md-search' size={24} color={Colors.dividerColor} style={{ position: 'absolute', paddingRight: 16 }} />
                    </View>
                </TouchableOpacity> */}
            </View >
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarMain {...props} title="Shop By Category" />
            {/* <ProgressDialog loading={loading} /> */}
            <View style={[MStyles.mainGray, { backgroundColor: Colors.white }]} >
                {(data && data.menu && data.menu.product_categories) ?
                    <SectionList
                        ListHeaderComponent={() => <Header />}
                        sections={data.menu.product_categories}
                        stickySectionHeadersEnabled={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item, index, section }) => {
                            return (
                                openIndex == section.id ?
                                    <TouchableOpacity
                                        style={MStyles.main}
                                        onPress={() =>
                                            // props.navigation.navigate('productList', item.id)
                                            props.navigation.navigate('productList',
                                                { type: "cat", id: item.id })
                                        } >
                                        <View style={[MStyles.divider, { marginLeft: 16 }]} />
                                        <View style={[{ padding: 16, paddingStart: 30, backgroundColor: Colors.white }]}>
                                            <Text style={MStyles.txtDescription}> {item.name} </Text>
                                        </View>
                                    </TouchableOpacity>
                                    : null
                            )
                        }}
                        renderSectionHeader={({ section: { name, id, data } }, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (data.length === 0) {
                                        props.navigation.navigate('productList', { type: 'cat', id: id })
                                    }
                                    setOpenIndex(openIndex == id ? "" : id)
                                }}>
                                    <View style={MStyles.divider} />
                                    <View style={[MStyles.horizontal, MStyles.center, { padding: 16, backgroundColor: Colors.white }]} >
                                        <Text style={[MStyles.txtDescription, { flex: 1 }]}>{name}</Text>
                                        {
                                            openIndex == id ?
                                                < Image source={require('../../images/down_arrow.png')} />
                                                :
                                                <Image source={require('../../images/right_arrow.png')} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    : <ErrorView message="Network request error" />}
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return { homeData: state.homeReducer.data }
}

export default Categories