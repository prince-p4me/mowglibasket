import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, SectionList, Image } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Context as FilterContext } from '../../context/FilterContext'
import { RUPEES } from '../../common/Constants'

const FilterOpenRefine = (props) => {

    const { state, applyFilter, clearFilter, filtered } = useContext(FilterContext)
    const { min_price, max_price, filters_data } = props.data
    const [openIndex, setOpenIndex] = useState("")

    // console.log(filters_data.length);

    const [muiltiValues, setMultiValues] = useState(
        [state.filter.minPrice ? state.filter.minPrice : 0,
        state.filter.maxPrice ? state.filter.maxPrice : max_price]
    )

    // const [brands, setBrands] = useState(props.myFilter.brands ? props.myFilter.brands : []);
    const [brands, setBrands] = useState(state.filter.brands);

    let fill = brands ? brands : []

    const Items = ({ item }) => {
        const [checkedOne, setCheckedOne] = useState(false);
        // const updateOne = () => setCheckedOne(!checkedOne);
        return (
            <TouchableOpacity onPress={() => {
                if (fill) {
                    if (!fill.includes(item.value)) {
                        fill.push(item.value)
                    } else {
                        fill.splice(fill.indexOf(item.value), 1)
                    }
                } else {
                    fill.push(item.value)
                }
                setBrands(fill)
                setCheckedOne(!checkedOne)
                // updateOne()
            }}>
                <View style={[MStyles.horizontal, { backgroundColor: Colors.white, justifyContent: 'space-between', paddingHorizontal: 20, paddingLeft: 30, paddingVertical: 8 }]}>
                    <Text style={[MStyles.txtDescription, { fontSize: 16 }]}>
                        {item.label}
                    </Text>
                    <CheckBox
                        value={fill.includes(item.value)}
                        testID='1'
                        disabled={true}
                        boxType='square'
                        // lineWidth={3}
                        // onValueChange={updateOne}
                        onFillColor={Colors.primaryDark}
                        tintColor={Colors.primaryDark}
                        onTintColor={Colors.primaryDark}
                        onCheckColor={Colors.white}
                        style={{ height: 20, width: 20 }}
                        animationDuration={0.2}
                        tintColors={{ true: Colors.primaryDark, false: Colors.textGray }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={MStyles.mainGray}>
            <SectionList
                sections={props.data.filters_data}
                stickySectionHeadersEnabled={true}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index, section }) => {
                    return (
                        openIndex == section.label ?
                            <Items item={item} />
                            : null
                    )
                }}
                renderSectionHeader={({ section: { label } }, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setOpenIndex(openIndex == label ? "" : label)
                        }}>
                            <View style={MStyles.divider} />
                            <View style={[MStyles.horizontal, MStyles.center, { padding: 16, backgroundColor: Colors.white }]} >
                                <Text style={[MStyles.txtSubTitle, { flex: 1 }, openIndex == label ? { color: Colors.primaryDark } : { color: Colors.black }]}>
                                    {label}
                                </Text>
                                {
                                    openIndex == label ?
                                        <Image source={require('../../images/down_arrow.png')} style={{ tintColor: Colors.primaryDark }} />
                                        :
                                        <Image source={require('../../images/right_arrow.png')} />
                                }
                            </View>
                        </TouchableOpacity>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <View style={[MStyles.main]}>
                            <View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, MStyles.center, { padding: 16, backgroundColor: Colors.white }]} >
                                <Text style={[MStyles.txtSubTitle, { flex: 1, color: Colors.black }]}>
                                    Price Range
                                </Text>
                            </View>
                            <View style={[MStyles.center, { paddingHorizontal: 30 }]}>
                                <MultiSlider
                                    min={min_price}
                                    max={max_price}
                                    values={muiltiValues}
                                    allowOverlap={false}
                                    trackStyle={{ backgroundColor: '#DCDCDC' }}
                                    selectedStyle={{ backgroundColor: '#F00' }}
                                    snapped={true}
                                    onValuesChangeFinish={(values) => { setMultiValues(values) }}
                                // onValuesChange={(values) => { setMultiValues(values) }}
                                />
                                <Text style={[MStyles.txtDescription, { marginBottom: 20 }]}>
                                    {RUPEES} {muiltiValues[0]}  -  {RUPEES} {muiltiValues[1]}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={{ justifyContent: 'flex-end', backgroundColor: Colors.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            // setBrands([])
                            setMultiValues([0, max_price])
                            clearFilter()
                        }}
                        activeOpacity={0.5}
                        style={[MStyles.whiteButtonSmallParent, { flex: .4 }]} >
                        <Text style={[MStyles.themeButtonSmall, { fontSize: 16, color: Colors.black }]}>
                            CLEAR ALL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let filterData = state.filter
                            // filterData.brands = brands
                            filterData.minPrice = muiltiValues[0]
                            filterData.maxPrice = muiltiValues[1]
                            filterData.sortBy = state.filter.sortBy
                            // props.applyFilters(filterData)
                            // filtered(true)
                            applyFilter(filterData)
                            props.navigation.pop()
                        }}
                        activeOpacity={0.5}
                        style={[MStyles.buttonSmallParent, { marginLeft: 10, flex: .4 }]} >
                        <Text style={[MStyles.themeButtonSmall, { fontSize: 16, }]}>
                            DONE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default FilterOpenRefine