import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'

const ProductVariationDialog = ({ visibility, onSelect, data, selectedVariation }) => {
    
    return (
        <Modal visible={visibility} transparent animationType='fade'>
            <View style={[styles.main]} >
                <View style={[styles.dialog]}>
                    <View style={styles.card}>
                        <FlatList
                            data={data}
                            keyExtractor={item => item.veriation_id.toString()}
                            ListHeaderComponent={() => {
                                return (
                                    <>
                                        <Text style={[MStyles.txtSubTitle, { paddingBottom: 10 }]}> Choose item </Text>
                                    </>
                                )
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        < View style={MStyles.divider} />
                                        <TouchableOpacity
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text style={[MStyles.txtDescription, styles.text,
                                            (selectedVariation &&
                                                selectedVariation.veriation_id === item.veriation_id) ?
                                                { backgroundColor: Colors.processing } : {}
                                            ]}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.transparent,
        justifyContent: 'center',
        padding: 30
    },
    dialog: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: 10
    },
    card: {
        borderRadius: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5
    },
    text: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16
    }
})

export default ProductVariationDialog