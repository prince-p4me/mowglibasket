import React, { useState, memo } from 'react'
import {
    ScrollView, View, TouchableOpacity,
    Text, FlatList, StyleSheet, SectionList,
    // Platform, UIManager, LayoutAnimation
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { log } from '../../../common/Utils'
import FastImage from 'react-native-fast-image'
import AllCategoriesHeader from './AllCategoriesHeader'
import { HOME_DIVIDER_MARGIN } from '../../../common/Constants'

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const AllCategories = (props) => {

    log("All category view", "rendring...")

    const { data, navigateSubcategories } = props
    const [openIndex, setOpenIndex] = useState('0')

    const Header = ({ section }) => <AllCategoriesHeader
        navigateSubcategories={navigateSubcategories}
        setOpenIndex={setOpenIndex}
        openIndex={openIndex}
        section={section}
    />

    // const Header = ({ section }) => {
    //     // log('Header data', JSON.stringify(section))
    //     return (
    //         <TouchableOpacity
    //             onPress={() => {
    //                 // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    //                 if (section.items.length != 0)
    //                     setOpenIndex(section.category_id)
    //                 else
    //                     navigateSubcategories(section)
    //             }}
    //             style={{ ...MStyles.horizontal, padding: 10, flex: 1 }}>
    //             <FastImage
    //                 source={{ uri: section.category_image }}
    //                 style={{
    //                     width: 100,
    //                     backgroundColor: Colors.dividerColor,
    //                     aspectRatio: section.image_width / section.image_height,
    //                     margin: 5
    //                 }} />
    //             <View style={{ marginLeft: 10, flex: 1 }}>
    //                 <Text style={styles.catOff}>Up to {section.discount}% OFF </Text>
    //                 <Text style={styles.catName}>{section.category_name}</Text>
    //                 <Text style={styles.cateDesc}>Pulses, Atta & Other Flours, Rice & Other Grains, Dry Fruits & Nuts, Edible Oils, Ghee & Vanaspati, Spices, Salt & Sugar, Grocery Best Offers</Text>
    //             </View>
    //             <Icon name='chevron-down' size={20} color={Colors.dividerColor} />
    //         </TouchableOpacity>
    //     )
    // }

    const Item = ({ item, index, section }) => {
        // const Item = (item) => {
        // log("sub item ", JSON.stringify(section.items.length))
        return (
            <>
                {
                    section.items.length !== 0 &&
                    section.category_id == openIndex &&
                    <View style={{
                        ...MStyles.cardView,
                        //  padding: 10, 
                        margin: 16
                    }}>
                        <FlatList
                            data={section.items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <SubItem item={item} />}
                            numColumns={3}
                        // columnWrapperStyle={{ paddingHorizontal: 5 }}
                        />
                    </View>
                }
                <View style={{ height: 10, width: '100%', backgroundColor: Colors.dividerColor }} />
            </>
        )
    }

    const SubItem = ({ item }) => {
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

    return (
        <ScrollView
            horizontal
            contentContainerStyle={MStyles.main}
            style={{ marginBottom: HOME_DIVIDER_MARGIN }}
            nestedScrollEnabled={false}>
            <SectionList
                sections={data.category_data}
                keyExtractor={(item, index) => item + index}
                renderItem={Item}
                renderSectionHeader={Header}
            // SectionSeparatorComponent={() => <View style={{ height: 15, width: '100%', backgroundColor: Colors.dividerColor }} />}
            />
        </ScrollView>
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

export default memo(AllCategories)