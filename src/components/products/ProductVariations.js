import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'

const ProductVariations = (props) => {

    const { mapItem, mapIndex, required, doSelection } = props

    return (
        <View key={JSON.stringify(mapIndex)}>
            <View >
                {/* <View style={MStyles.divider} /> */}
                <Text style={[MStyles.txtTitle, { fontWeight: 'normal' }]}>
                    {mapItem.label}
                </Text>
            </View>
            <View style={{marginTop:10}}>
                <FlatList
                    data={mapItem.variables}
                    horizontal={true}
                    // contentContainerStyle={{ paddingHorizontal: 10 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item, index) => {
                        return (
                            <TouchableOpacity 
                            activeOpacity={0.5} 
                            onPress={() => doSelection(mapIndex, item.item)}>
                                <View
                                    style={[MStyles.center,
                                    { marginRight: 10, borderRadius: 4, borderWidth: 1, borderColor: Colors.dividerColor, paddingHorizontal: 30, paddingVertical: 10 },
                                    required.selection[mapIndex] == item.item.label ? { backgroundColor: Colors.primaryDark } : { backgroundColor: Colors.white }
                                    ]} >
                                    <Text
                                        style={[MStyles.txtSubTitle,
                                        required.selection[mapIndex] == item.item.label ? { color: Colors.white } : { color: Colors.black }]}>
                                        {item.item.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => item.label}
                />
            </View>
        </View>
    )
}

export default ProductVariations