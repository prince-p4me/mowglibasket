import React, { useState, useEffect, useContext } from 'react'
import {
    View, Text, SectionList,
    StyleSheet, SafeAreaView,
    Image, TouchableOpacity, ScrollView,
    FlatList, ActivityIndicator
} from 'react-native'
import ToolbarDetail from '../../common/ToolbarDetail'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import ErrorView from '../../common/ErrorView'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import { requestProductDetail } from '../../apis/Api'
// import ProductVariations from './ProductVariations'
import { Context as CartContext } from '../../context/CartContext'
import { RUPEES, SHIMMER_SPEED } from '../../common/Constants'
import Shimmer from 'react-native-shimmer'
import FastImage from 'react-native-fast-image'
// import ProductDetailsImageItem from './ProductDetailsImageItem'
// import ProductDetailsShimmer from './ProductDetailsShimmer'
import { log } from '../../common/Utils'
import ToolbarBack from '../../common/ToolbarBack'
import Icon from 'react-native-vector-icons/Ionicons'

const CustomerSupport = (props) => {

    const [localData, setLocalData] = useState({ loading: false, imageLoading: false })
    const [open, setOpen] = useState({})

    const SUPPORT_DATA = [
        {
            title: 'Payment related queries',
            data: [
                { ques: 'How to do payment', ans: 'Online/COD' },
                { ques: 'When to do payment', ans: '24/7' },
                { ques: 'How to get refund', ans: 'No way' },
            ]
        },
        {
            title: 'Payment related queries 2',
            data: [
                { ques: 'How to do payment 2', ans: 'Online/COD' },
                { ques: 'When to do payment 2', ans: '24/7' },
                { ques: 'How to get refund 2', ans: 'No way' },
            ]
        },
        {
            title: 'Payment related queries 3',
            data: [
                { ques: 'How to do payment 3', ans: 'Online/COD' },
                { ques: 'When to do payment 3', ans: '24/7' },
                { ques: 'How to get refund 3', ans: 'No way' },
            ]
        }
    ]

    useEffect(() => {
        // serverRequestForProductDetails()
    }, [])

    const serverRequestForProductDetails = async () => {
        // if (localData.loading)
        //     return
        // setLocalData({ ...localData, loading: true })
        // requestProductDetail(props.route.params)
        //     .then(response => {
        //         if (response.status) {
        //             let image, itemCart;
        //             if (response.data.product_gallery_images) {
        //                 image = response.data.product_gallery_images[0].image;
        //             }
        //             if (cart && cart.length > 0)
        //                 cart.map((cartItem) => {
        //                     if (cartItem.product_id == response.data.product_id) {
        //                         itemCart = cartItem;
        //                         return;
        //                     }
        //                 })
        //             // initial state saved empty array
        //             let emptyArray = []
        //             if (response.data.attributes)
        //                 response.data.attributes.map((item, index) => {
        //                     emptyArray[index] = ""
        //                 })
        //             setLocalData({ ...localData, loading: false })
        //             setRequired({
        //                 ...required,
        //                 productImage: image,
        //                 selection: emptyArray,
        //                 productDetail: response.data,
        //                 cartItem: itemCart
        //             })

        //         } else {
        //             setLocalData({ ...localData, loading: false, error: response.message })
        //         }
        //     })
        //     .catch(error => {
        //         setLocalData({ ...localData, loading: false, error: error.message })
        //     })
    }

    const Item = ({ item, index, section }) => {
        return (
            <>
                {
                    log('section', JSON.stringify(item))
                }
                <TouchableOpacity
                    onPress={() => {
                        if (open.title == section.title && open.index == index) {
                            setOpen({ title: '', index: 0 })
                        } else {
                            setOpen({ title: section.title, index: index })
                        }
                    }}
                    style={[MStyles.horizontal, { alignItems: 'center', paddingEnd: 10 }]}>
                    <Text style={[MStyles.txtDescription, { padding: 10, flex: 1 }]}>{item.ques}</Text>
                    {
                        (open.title == section.title && open.index == index) ?
                            <Icon name='chevron-up' size={24} color={Colors.textDarkGray} />
                            :
                            <Icon name='chevron-down' size={24} color={Colors.textDarkGray} />
                    }
                </TouchableOpacity>
                {
                    (open.title == section.title && open.index == index) &&
                    <Text style={[MStyles.txtDescription,
                    { paddingHorizontal: 16, paddingBottom: 10, }]}>{item.ans}</Text>}
                <View style={{ height: 1, width: '100%', backgroundColor: Colors.dividerColor }} />
            </>
        )
    }

    const Contact = () => {
        return (
            <View >
                <Text style={[MStyles.txtTitle, { marginHorizontal: 10, marginTop: 10 }]}>Contact Center</Text>
                <View style={[MStyles.horizontal, { justifyContent: 'space-evenly' }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>props.navigation.navigate('writeUs')}
                        style={[MStyles.cardView,
                        {
                            padding: 8, marginVertical: 10,
                            marginLeft: 10, marginRight: 5, flex: 1
                        }]}>
                        <FastImage
                            source={require('../../images/email.png')}
                            style={{ width: 50, height: 50 }} />
                        <Text style={MStyles.txtSubTitle}>Write Us</Text>
                        <Text style={[MStyles.txtDescription, { color: Colors.textDarkGray, marginTop: 5 }]}>Incase you want to write us your questions or feedback.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[MStyles.cardView, { padding: 8, marginVertical: 10, marginRight: 10, marginLeft: 5, flex: 1 }]}>
                        <FastImage
                            source={require('../../images/phone.png')}
                            style={{ width: 50, height: 50 }} />
                        <Text style={[MStyles.txtSubTitle, { marginTop: 5 }]}>Call Us</Text>
                        <Text style={[MStyles.txtDescription, { color: Colors.textDarkGray, marginTop: 5 }]}>If this is urgent then call us between 9 AM to 8 PM.</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    return (
        <SafeAreaView style={MStyles.main}>
            {/* <ToolbarDetail {...props} cart={cart} /> */}
            <ToolbarBack {...props} title='Customer Support' />
            <SectionList
                sections={SUPPORT_DATA}
                style={{ flex: 1 }}
                keyExtractor={(item, index) => item + index}
                renderItem={Item}
                renderSectionHeader={({ section: { title } }) => (
                    // <Text style={MStyles.txtDescription}>{title}</Text>
                    <Text style={[MStyles.txtSubTitle, { backgroundColor: Colors.dividerColorLight, padding: 10 }]}>{title}</Text>
                )}
                ListFooterComponent={Contact}
            />
        </SafeAreaView>
    )
}

export default CustomerSupport