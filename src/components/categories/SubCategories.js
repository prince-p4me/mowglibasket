import React, { useState, useEffect, useContext } from 'react'
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarBack from '../../common/ToolbarBack'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import { requestSubCategories } from '../../apis/Api'
import { BANNER_RATIO } from '../../common/Constants'
import ErrorView from '../../common/ErrorView'
import { Context as ClickContext } from '../../context/ClickContext'

const Subcategories = (props) => {

    const { state: { clicked }, setClicked } = useContext(ClickContext)
    const [loading, setLoading] = useState(false)
    const [subCategories, setSubcategories] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        serverRequestForSubCategory()
    }, [])

    const serverRequestForSubCategory = () => {

        if (loading)
            return
        setLoading(true)
        requestSubCategories(props.route.params.id)
            .then(response => {
                if (response.status) {
                    setSubcategories(response.data)
                } else {
                    setError(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError(error.message)
            })
    }

    const Header = () => {
        return <View style={MStyles.main}>
            {subCategories.banner ?
                <View style={{ padding: 10 }}>
                    <Image source={{ uri: subCategories.banner }}
                        style={{ aspectRatio: BANNER_RATIO, width: '100%', height: undefined }}
                        resizeMode='cover' />
                </View> : null}
            <Text style={[MStyles.txtSubTitle, { padding: 10, fontSize: 18 }]}>Shop by Category</Text>
        </View>
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title={props.route.params.title} />
            <LinearProgressDialog loading={loading} />
            <View style={[MStyles.main]} >
                {subCategories ?
                    <FlatList
                        data={subCategories.categories}
                        keyExtractor={(item, index) => item.category_id}
                        columnWrapperStyle={{ paddingHorizontal: 5 }}
                        ListHeaderComponent={() => <Header {...props} />}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[{ padding: 0, flex: .5 }]}>
                                    <TouchableOpacity activeOpacity={0.5}
                                        style={{ flex: 1 }}
                                        onPress={() => {
                                            if (!clicked) {
                                                setClicked()
                                                props.navigation.navigate('productList', { type: 'cat', id: item.category_id })
                                            }
                                        }}>
                                        <View style={[MStyles.cardView, { flex: 1, backgroundColor: Colors.white, paddingVertical: 15, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', margin: 5 }]}>
                                            <Image source={{ uri: item.category_image }}
                                                style={{ width: 100, height: 70 }}
                                                resizeMode='cover' />
                                            <Text style={[MStyles.productQuntity, { marginTop: 10, color: Colors.black, fontWeight: '500' }]}> {item.category_name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    : error ? <ErrorView message={error} /> : null}
            </View>
        </SafeAreaView>
    )
}

export default Subcategories