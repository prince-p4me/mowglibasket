import React, { memo } from 'react'
import { View, Text, FlatList } from 'react-native'
import MStyles from '../../../styles/MStyles'
// import { Platform, UIManager, LayoutAnimation } from 'react-native'
import { ScrollView } from 'react-native'
import CategoryItem from './CategoryItem'
import { HOME_DIVIDER_MARGIN } from '../../../common/Constants'
import { log } from '../../../common/Utils'

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const SubCategories = (props) => {

    log("sub category view", "rendring...")

    const { data, navigateSubcategories } = props

    const RenderItem = ({ item }) => <CategoryItem
        item={item}
        navigateSubcategories={navigateSubcategories} />

    return (
        <ScrollView
            horizontal
            contentContainerStyle={MStyles.main}>
            <View style={{ flex: 1, marginBottom: HOME_DIVIDER_MARGIN }}>
                <Text style={{
                    ...MStyles.txtDescriptionBold,
                    fontSize: 18,
                    textAlignVertical: 'center',
                    flex: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginTop: 10
                }}>{data.section_title}</Text>
                <FlatList
                    scrollEnabled={false}
                    data={data.product_categories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={RenderItem}
                    numColumns={3}
                    columnWrapperStyle={{ paddingHorizontal: 5, alignItems: 'center' }}
                />
            </View>
        </ScrollView>
    )
}


export default memo(SubCategories)