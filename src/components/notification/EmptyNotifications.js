import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import { View, FlatList } from 'react-native'
import EmptyNotificationsItem from './EmptyNotificationsItem'

const EmptyNotifications = (props) => {

    const dummyData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

    const renderItem = ({ item }) => {
        return <EmptyNotificationsItem />
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <View style={[MStyles.mainGray]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={dummyData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem} />
            </View>
        </SafeAreaView>
    )
}

export default EmptyNotifications