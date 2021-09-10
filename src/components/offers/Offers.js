import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarMain from '../../common/ToolbarMain'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import { requestOffers } from '../../apis/Api'
import ErrorView from '../../common/ErrorView'
import { Context as ClickContext } from '../../context/ClickContext'
import OfferItem from './OfferItem'
import EmptyOffers from "./EmptyOffers";

const Offers = (props) => {

    const { state: { clicked }, setClicked } = useContext(ClickContext)
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [offers, setOffers] = useState()

    useEffect(() => {
        serverRequestForOffers()
    }, [])

    const pullToRefresh = () => {
        serverRequestForOffers()
    }

    const serverRequestForOffers = async () => {
        if (loading)
            return
        setLoading(true)

        requestOffers()
            .then(response => {
                if (response.status) {
                    setOffers(response.data)
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

    const renderItem = ({ item }) => {
        return <OfferItem item={item} {...props} />
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarMain {...props} title="Offers" />
            <View style={[MStyles.mainGray]}>
                {/* <ProgressDialog loading={loading} /> */}
                {
                    loading ? <EmptyOffers /> :
                        <>
                            {
                                offers ?
                                    <FlatList
                                        data={offers}
                                        showsVerticalScrollIndicator={false}
                                        style={{ backgroundColor: Colors.white }}
                                        keyExtractor={(item) => item.title}
                                        refreshControl={<RefreshControl refreshing={false} onRefresh={pullToRefresh} />}
                                        renderItem={renderItem}
                                    />
                                    : error ? <ErrorView message={error} /> : null
                            }
                        </>
                }
            </View>
        </SafeAreaView>
    )
}

export default Offers