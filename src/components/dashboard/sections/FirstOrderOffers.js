import React, { memo } from 'react'
import { View, Text, FlatList, Dimensions, ScrollView } from 'react-native'
import MStyles from '../../../styles/MStyles'
// import { Platform, UIManager, LayoutAnimation } from 'react-native'
import { HOME_DIVIDER_MARGIN } from '../../../common/Constants'
import FirstOrderOffersItem from './FirstOrderOffersItem'
import { log } from '../../../common/Utils'
// const { width } = Dimensions.get('window')

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const FirstOrderOffers = (props) => {

    const { data } = props

    const RenderItem = ({ item, index }) => <FirstOrderOffersItem item={item} />
    log("First order offer view", "rendring...")

    return (
        <View style={{ marginBottom: HOME_DIVIDER_MARGIN }}>
            <Text style={{
                ...MStyles.txtDescriptionBold,
                fontSize: 18,
                textAlignVertical: 'center',
                flex: 1,
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginTop: 10,
                marginBottom: 5
            }}>{data.section_title}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={MStyles.main}>

                <FlatList
                    // horizontal
                    // showsHorizontalScrollIndicator={false}
                    data={data.image}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={RenderItem}
                    numColumns={3}
                    contentContainerStyle={{ paddingHorizontal: 10, justifyContent: 'center' }}
                />
            </ScrollView>
        </View>
    )
}

export default memo(FirstOrderOffers)