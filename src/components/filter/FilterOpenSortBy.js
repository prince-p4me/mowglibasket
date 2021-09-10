import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
// import { RadioButton } from 'react-native-paper'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import CheckBox from '@react-native-community/checkbox'
import { Context as FilterContext } from '../../context/FilterContext'

const FilterOpenSortBy = (props) => {

    const { state, applyFilter, applySorting, clearFilter } = useContext(FilterContext)
    const { sort_by, label, max_price, min_price } = props.data
    const [selected, setSelected] = useState(state.filter ? state.filter.sortBy ? state.filter.sortBy : "" : "")

    useEffect(() => {
        setSelected(state.filter ? state.filter.sortBy ? state.filter.sortBy : "" : "")
    }, [state])

    const BrandItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => { selected == item.value ? setSelected('') : setSelected(item.value) }}>
                <View style={[MStyles.horizontal, MStyles.main, { justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 8 }]}>
                    <Text style={[MStyles.txtDescription, { fontSize: 16 }]}>
                        {item.label}
                    </Text>
                    <CheckBox
                        value={selected == item.value}
                        testID='1'
                        disabled={true}
                        boxType='square'
                        onFillColor={Colors.primaryDark}
                        tintColor={Colors.primaryDark}
                        onTintColor={Colors.primaryDark}
                        onCheckColor={Colors.white}
                        style={{ height: 20, width: 20 }}
                        animationDuration={0.2}
                        tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={MStyles.mainGray}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={sort_by.data}
                renderItem={({ item, index }) => <BrandItem index={index} item={item} />}
                keyExtractor={(item) => item.label} />
            <View style={{ justifyContent: 'flex-end', backgroundColor: Colors.white }}>
                {/* <Text style={[MStyles.txtDescription, { padding: 10, textAlign: 'center', color: Colors.textGray }]}>243 product available</Text> */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                    <TouchableOpacity
                        onPress={() => clearFilter()}
                        activeOpacity={0.5}
                        style={[MStyles.whiteButtonSmallParent, { flex: .4 }]} >
                        <Text style={[MStyles.themeButtonSmall, { fontSize: 16, color: Colors.black }]}>CLEAR ALL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let filterData = state.filter
                            // filterData.brands = state.filter.brands
                            filterData.minPrice = state.filter.minPrice !== "" ? min_price : 0
                            filterData.maxPrice = state.filter.maxPrice !== "" ? max_price : 3000
                            filterData.sortBy = state.filter.sortBy
                            // props.applyFilters(filterData)
                            // filtered(true)
                            applyFilter(filterData)
                            applySorting(selected)
                            props.navigation.pop()
                        }}
                        activeOpacity={0.5}
                        style={[MStyles.buttonSmallParent, { marginLeft: 10, flex: .4 }]} >
                        <Text style={[MStyles.themeButtonSmall, { fontSize: 16, }]}>DONE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    textStyle: {
        fontSize: 18
    },
    divideLine: {
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1,
    },
    buttonStyle: {
        padding: 10,
        borderRadius: 10,
        width: '40%'
    },
    itemStyle: {
        paddingStart: 10,
        paddingEnd: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardView: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { height: 5 },
        elevation: 4
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }
})

export default FilterOpenSortBy