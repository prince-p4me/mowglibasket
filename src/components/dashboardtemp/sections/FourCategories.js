import React, { memo } from 'react'
import { View, } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import OfferGridItem from './OfferGridItem'
import { HOME_DIVIDER_MARGIN } from '../../../common/Constants'
import { log } from '../../../common/Utils'

const FourCategories = (props) => {

    const { data, navigateSubcategories } = props

    return (
        <View style={MStyles.main}>
            <View style={{ flex: 1, marginBottom: HOME_DIVIDER_MARGIN }}>

                <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <OfferGridItem item={data.category_data[0]} navigateSubcategories={navigateSubcategories} />
                    <OfferGridItem item={data.category_data[1]} navigateSubcategories={navigateSubcategories} />
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <OfferGridItem item={data.category_data[2]} navigateSubcategories={navigateSubcategories} />
                    <OfferGridItem item={data.category_data[3]} navigateSubcategories={navigateSubcategories} />
                </View>
                <View style={{ width: '100%', height: 15, backgroundColor: Colors.dividerColor, marginTop: 16 }} />
            </View>
        </View>
    )
}

export default memo(FourCategories)