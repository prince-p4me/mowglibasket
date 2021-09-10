import React, { memo } from 'react'
import { View } from 'react-native'
import MStyles from '../../../styles/MStyles'
import OffItems from './OffItems'
import { HOME_DIVIDER_MARGIN } from '../../../common/Constants'
import { log } from '../../../common/Utils'

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const SubCategoryOffers = ({ data, navigateSubcategories }) => {

    log("sub category offers view", "rendring...")

    // const RenderItem = ({ item }) => <OffItems
    //     item={item}
    //     navigateSubcategories={navigateSubcategories} />


    return (
        <View
            horizontal
            style={[MStyles.main, { marginBottom: HOME_DIVIDER_MARGIN }]}>

            <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                <OffItems
                    item={data.category_data[0]}
                    navigateSubcategories={navigateSubcategories} />
                <OffItems
                    item={data.category_data[1]}
                    navigateSubcategories={navigateSubcategories} />
                <OffItems
                    item={data.category_data[2]}
                    navigateSubcategories={navigateSubcategories} />
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                <OffItems
                    item={data.category_data[3]}
                    navigateSubcategories={navigateSubcategories} />
                <OffItems
                    item={data.category_data[4]}
                    navigateSubcategories={navigateSubcategories} />
                <OffItems
                    item={data.category_data[5]}
                    navigateSubcategories={navigateSubcategories} />
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                <OffItems
                    item={data.category_data[6]}
                    navigateSubcategories={navigateSubcategories} />
                <OffItems
                    item={data.category_data[7]}
                    navigateSubcategories={navigateSubcategories} />
                <OffItems
                    item={data.category_data[8]}
                    navigateSubcategories={navigateSubcategories} />
            </View>
        </View>
    )
}

export default memo(SubCategoryOffers)