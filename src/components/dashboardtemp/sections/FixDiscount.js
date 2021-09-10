import React, { memo } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
// import { Platform, UIManager, LayoutAnimation } from 'react-native'
import { BORDER_RADIUS, HOME_DIVIDER_MARGIN } from '../../../common/Constants'
import LinearGradient from 'react-native-linear-gradient'
import { log } from '../../../common/Utils'

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const FixDiscount = (props) => {

    log("fix discount view", "rendring...")

    const { data, navigateToDiscountedProductDetails } = props

    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigateToDiscountedProductDetails(item)}
                activeOpacity={0.9}
                style={{
                    flex: .34,
                    // width: (Dimensions.get('screen').width / 3) - 12,
                    marginHorizontal: 5,
                    borderRadius: BORDER_RADIUS,
                }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#FC5002', '#FE730F', '#FC5002']}
                    style={{
                        // marginHorizontal: 5,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        alignSelf: 'center',
                        borderRadius: BORDER_RADIUS
                        // borderBottomLeftRadius: BORDER_RADIUS,
                        // borderBottomRightRadius: BORDER_RADIUS
                    }}
                />
                <Text style={{
                    ...MStyles.txtDescriptionBold,
                    fontSize: 22,
                    padding: 10,
                    color: Colors.white,
                    flex: 1,
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }} >{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            marginBottom: HOME_DIVIDER_MARGIN,
            backgroundColor: Colors.dividerColor,
            flexDirection: 'row',
            padding: 12
        }}>
            <RenderItem item={data.image_data[0]} />
            <RenderItem item={data.image_data[1]} />
            <RenderItem item={data.image_data[2]} />
        </View>
    )
}

export default memo(FixDiscount)