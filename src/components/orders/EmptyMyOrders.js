import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, FlatList, StyleSheet } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import EmptyMyOrdersListItem from './EmptyMyOrdersListItem'

const EmptyList = (props) => {

    const dummyData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

    const renderItem = ({ item }) => {
        return <EmptyMyOrdersListItem />
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

const style = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    text: {
        flex: 1,
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    desc: {
        width: '25%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    addButtonContainer: {
        width: '25%',
    },
    addButton: {
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    }
})


export default EmptyList