import React, { memo } from 'react'
import { View, Text} from 'react-native'
import MStyles from '../../../styles/MStyles'
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
        <View style={MStyles.main}>
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

                <View style={{ paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' }}>
                    <CategoryItem
                        item={data.product_categories[0]}
                        navigateSubcategories={navigateSubcategories} />
                    <CategoryItem
                        item={data.product_categories[1]}
                        navigateSubcategories={navigateSubcategories} />
                    <CategoryItem
                        item={data.product_categories[2]}
                        navigateSubcategories={navigateSubcategories} />
                </View>
                <View style={{ paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' }}>
                    <CategoryItem
                        item={data.product_categories[3]}
                        navigateSubcategories={navigateSubcategories} />
                    <CategoryItem
                        item={data.product_categories[4]}
                        navigateSubcategories={navigateSubcategories} />
                    <CategoryItem
                        item={data.product_categories[5]}
                        navigateSubcategories={navigateSubcategories} />
                </View>
                <View style={{ paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' }}>
                    <CategoryItem
                        item={data.product_categories[6]}
                        navigateSubcategories={navigateSubcategories} />
                    <CategoryItem
                        item={data.product_categories[7]}
                        navigateSubcategories={navigateSubcategories} />
                    <CategoryItem
                        item={data.product_categories[8]}
                        navigateSubcategories={navigateSubcategories} />
                </View>

                {/* <FlatList
                    scrollEnabled={false}
                    data={data.product_categories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={RenderItem}
                    numColumns={3}
                    columnWrapperStyle={{ paddingHorizontal: 5, alignItems: 'center' }}
                /> */}
            </View>
        </View>
    )
}


export default memo(SubCategories)