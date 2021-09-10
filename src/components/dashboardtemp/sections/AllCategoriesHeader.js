import React, { memo } from 'react'
import {
    View, TouchableOpacity,
    Text, StyleSheet, Platform, UIManager
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { log } from '../../../common/Utils'
import FastImage from 'react-native-fast-image'

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const AllCategoriesHeader = (props) => {

    const { navigateSubcategories, section, openIndex, setOpenIndex } = props


    return (
        <TouchableOpacity
            onPress={() => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                if (section.items.length != 0) {
                    if (openIndex == section.category_id)
                        setOpenIndex('0')
                    else
                        setOpenIndex(section.category_id)
                }
                else {
                    navigateSubcategories(section)
                }
            }}
            style={{ ...MStyles.horizontal, padding: 10, flex: 1 }}>
            <FastImage
                source={{ uri: section.category_image }}
                style={{
                    width: 100,
                    backgroundColor: Colors.dividerColor,
                    aspectRatio: section.image_width / section.image_height,
                    margin: 5
                }} />
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.catOff}>Up to {section.discount}% OFF </Text>
                <Text style={styles.catName}>{section.category_name}</Text>
                <Text style={styles.cateDesc}>{section.category_description}</Text>
                {/* <Text style={styles.cateDesc}>Pulses, Atta & Other Flours, Rice & Other Grains, Dry Fruits & Nuts, Edible Oils, Ghee & Vanaspati, Spices, Salt & Sugar, Grocery Best Offers</Text> */}
            </View>
            <Icon name='chevron-down' size={20} color={Colors.dividerColor} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default memo(AllCategoriesHeader)