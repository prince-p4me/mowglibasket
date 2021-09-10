import React, { useState } from 'react'
import { View, ScrollView, FlatList, SectionList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import FastImage from 'react-native-fast-image'

const AllCategoriesSubItem = ({ item, navigateSubcategories }) => {
    // log("sub Item", item)
    return (
        <TouchableOpacity
            onPress={() => navigateSubcategories(item)}
            activeOpacity={.9}
            style={{ flex: .33, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <FastImage
                        source={{ uri: item.category_image }}
                        style={{
                            width: '90%',
                            aspectRatio: item.image_width / item.image_height,
                            backgroundColor: Colors.dividerColorLight
                        }} />
                    <Text style={styles.subCatName}>{item.category_name}</Text>
                    <Text style={styles.subCatOff}>Up to 75% OFF</Text>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: Colors.dividerColorLight }} />
            </View>
            <View style={{ width: 1, height: '100%', backgroundColor: Colors.dividerColorLight }} />
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    subCatOff: {
        ...MStyles.txtDescription,
        color: 'green',
        fontSize: 12,
        textAlign: 'center'
    },
    subCatName: {
        ...MStyles.txtDescription,
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center'
    },
})


export default AllCategoriesSubItem