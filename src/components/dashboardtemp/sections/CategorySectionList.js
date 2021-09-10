import React, { useState } from 'react'
import {
    View, TouchableOpacity, Text,
    FlatList, StyleSheet, SectionList
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { Platform, UIManager, LayoutAnimation } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const CategorySectionList = (props) => {

    const DATA = [
        {
            title: "0",
            data: [""]
        },
        { title: "1", data: [""] },
        { title: "2", data: [""] },
        { title: "3", data: [""] },
        { title: "4", data: [""] },
        { title: "5", data: [""] },
    ];

    const [openIndex, setOpenIndex] = useState('0')

    const Header = ({ section: { title } }) => {
        // log('Header data', JSON.stringify(title))
        return (
            <TouchableOpacity
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                    setOpenIndex(title)
                }}
                style={{ ...MStyles.horizontal, padding: 10, flex: 1 }}>
                <View style={{ width: '30%', backgroundColor: Colors.dividerColor, aspectRatio: 4 / 3 }} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.catOff}>Up to 75% OFF </Text>
                    <Text style={styles.catName}>Grocery & Staples</Text>
                    <Text style={styles.cateDesc}>Pulses, Atta & Other Flours, Rice & Other Grains, Dry Fruits & Nuts, Edible Oils, Ghee & Vanaspati, Spices, Salt & Sugar, Grocery Best Offers</Text>
                </View>
                <Icon name='chevron-down' size={20} color={Colors.dividerColor} />
            </TouchableOpacity>
        )
    }

    const Item = ({ item, index, section: { title, data } }) => {
        // log("sub item ", JSON.stringify(title))
        return (
            <>
                {
                    title == openIndex &&
                    <View style={{
                        ...MStyles.cardView,
                        //  padding: 10, 
                        margin: 16
                    }}>
                        <FlatList
                            data={["", "", "", "", "", ""]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={() => <SubItem />}
                            numColumns={3}
                        // columnWrapperStyle={{ paddingHorizontal: 5 }}
                        />
                    </View>
                }
                <View style={{ height: 10, width: '100%', backgroundColor: Colors.dividerColor }} />
            </>
        )
    }

    const SubItem = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View style={{ width: '90%', aspectRatio: 1, backgroundColor: Colors.dividerColorLight }} />
                        <Text style={styles.subCatName}>Baby Food</Text>
                        <Text style={styles.subCatOff}>Up to 75% OFF</Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: Colors.dividerColorLight }} />
                </View>
                <View style={{ width: 1, height: '100%', backgroundColor: Colors.dividerColorLight }} />
            </View>
        )
    }

    return (
        <View style={styles.itemContainer}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={Item}
                renderSectionHeader={Header}
            // SectionSeparatorComponent={() => <View style={{ height: 15, width: '100%', backgroundColor: Colors.dividerColor }} />}
            />
        </View>
    )
}


const styles = StyleSheet.create({

    itemContainer: {
        flex: 1,
    },
    catOff: {
        ...MStyles.txtDescriptionBold,
        color: 'green',
    },
    catName: {
        ...MStyles.txtDescriptionBold,
        marginTop: 5,
    },
    cateDesc: {
        ...MStyles.txtDescription,
        color: Colors.textDarkGray,
        fontSize: 12,
        marginTop: 5,
    },
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


export default CategorySectionList