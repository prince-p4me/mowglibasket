import React from 'react'
import {
    View, Modal, TouchableOpacity,
    StyleSheet, FlatList, Text
} from 'react-native'
import Colors from '../../styles/Colors'
import MStyles from '../../styles/MStyles'

const StateSelector = (props) => {

    const { states, visibility, setStateVisibility, address, setAddress } = props

    return (
        <Modal visible={visibility} transparent animationType='fade'>
            <View style={[styles.main]} >
                <View style={[styles.dialog]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={states}
                        keyExtractor={(items => items.value)}
                        renderItem={({ item, index }) => {
                            return <>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        setStateVisibility(false)
                                        setAddress({ ...address, state: item.label, state_code: item.value })
                                    }}>
                                    <Text style={[MStyles.txtSubTitle, styles.text]}>{item.label}</Text>
                                </TouchableOpacity>
                            </>
                        }}
                    />
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
        alignItems: 'center',
        paddingVertical: '10%'
    },
    dialog: {
        flex: 1,
        width: '90%',
        height: '60%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 5
    },
    text: {
        paddingHorizontal: 16,
        paddingVertical: 8
    }
})

export default StateSelector