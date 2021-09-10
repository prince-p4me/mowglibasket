import React, { useState } from 'react'
import { View, ScrollView, FlatList, SectionList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MStyles from '../../styles/MStyles'
import BannerSlider from './sections/BannerSlider'
import { log } from '../../common/Utils'
import Banner from './sections/Banner'
import ParentCategories from './sections/ParentCategories'
import FirstOrderOffers from './sections/FirstOrderOffers'
import SubCategories from './sections/SubCategories'
import FourCategories from './sections/FourCategories'
import SubCategoryOffers from './sections/SubCategoryOffers'
import FixDiscount from './sections/FixDiscount'
import CategoryProductsContainer from './CategoryProductsContainer'
import AllCategories from './sections/AllCategories'
import { HOME_DIVIDER_MARGIN } from '../../common/Constants'
import SearchHeader from '../home/SearchHeader'
import AllCategoriesHeader from './sections/AllCategoriesHeader'
import Colors from '../../styles/Colors'
import FastImage from 'react-native-fast-image'
import AllCategoriesSubItem from './sections/AllCategoriesSubItem'

const Dashboard = (props) => {

    const { homeData,
        // cart, 
        // data,
        // updateHomeAndCartData,
        // user, 
        navigation } = props
    const [openIndex, setOpenIndex] = useState('0')


    log("dashboard View", "rendring...")

    const onBannerClick = (item) => {
        // if (!clickable) return
        if (!item.type) return
        if (item.type === 'service') {
            navigateToServices()
        } else if (item.type === 'category') {
            if (item.have_subcategories) {
                props.navigation.navigate('subcategories', { id: item.id, })
            } else {
                props.navigation.navigate('productList', { type: 'cat', id: item.id })
            }
        } else if (item.type === 'brand') {
            props.navigation.navigate('productList', { type: 'brand', id: item.id })
        } else if (item.type === 'product') {
            props.navigation.navigate('productDetail', item.id)
        }
    }
    const navigateSubcategories = (item) => {
        if (item.have_subcategories) {
            navigation.navigate('subCategories', { id: item.category_id, title: item.category_name })
        } else {
            navigation.navigate('productList', { type: 'cat', id: item.category_id, title: item.category_name })
        }
    }
    const navigateToProductList = (id, title) => {
        props.navigation.navigate('productList', { type: 'cat', id: id, title: title })
    }
    const navigateToDiscountedProductDetails = (item) => {
        if (item.type == 'category') {
            navigateSubcategories(item)
        } else if (item.type == 'fix' || item.type == 'percent') {
            props.navigation.navigate('discountedProductList', { item: item });
        }
    }
    const navigateToGrocery = () => {
        navigation.navigate('grocery')
    }
    const navigateToFruits = () => {
        navigation.navigate('fruits')
    }
    const navigateToVegetables = () => {
        navigation.navigate('vegetable')
    }
    const navigateToServices = () => {
        props.navigation.navigate("services")
    }
    const GetDymanicItem = ({ item, index }) => {
        // log(index, item.section_type)
        switch (item.section_type) {
            case 'banner_slider':
                return <BannerSlider
                    {...props}
                    data={item.banner}
                    key={index.toString()}
                    onBannerClick={onBannerClick} />;
            case 'banner':
                return <Banner
                    data={item}
                    key={index.toString()}
                    onBannerClick={onBannerClick} />;
            case 'parent_categories':
                return <ParentCategories
                    data={item.category_data}
                    key={index.toString()}
                    navigateToGrocery={navigateToGrocery}
                    navigateToFruits={navigateToFruits}
                    navigateToVegetables={navigateToVegetables} />;
            // case 'first_order_offers':
            //     return <FirstOrderOffers
            //         data={item}
            //         key={index.toString()} />;
            case 'category_products':
                return <View
                    key={index.toString()}
                    style={{ marginBottom: HOME_DIVIDER_MARGIN }}>
                    <CategoryProductsContainer
                        item={item}
                        navigateToProductList={navigateToProductList} />
                </View>
            // case 'sub_categories':
            //     return <SubCategories
            //         key={index.toString()}
            //         data={item}
            //         navigateSubcategories={navigateSubcategories} />;
            case 'four_categories':
                return <FourCategories
                    key={index.toString()}
                    data={item}
                    navigateSubcategories={navigateSubcategories} />;
            case 'sub_categories_discount':
                return <SubCategoryOffers
                    key={index.toString()}
                    data={item}
                    navigateSubcategories={navigateSubcategories} />;
            case 'fix_discount':
                return <FixDiscount
                    key={index.toString()}
                    data={item}
                    navigateToDiscountedProductDetails={navigateToDiscountedProductDetails} />;
            case 'all_categories':
                return <AllCategories
                    key={index.toString()}
                    data={item}
                    navigateToDiscountedProductDetails={navigateToDiscountedProductDetails} />;
            default:
                break;
        }
    }

    const MainHeader = () => {
        return (
            <View>
                <SearchHeader {...props} />

                <FlatList
                    data={homeData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={GetDymanicItem}
                />
                {/* {
                    homeData.map(getDymanicItem)
                } */}
            </View>
        )
    }

    const SectionHeader = ({ section }) => <AllCategoriesHeader
        navigateSubcategories={navigateSubcategories}
        setOpenIndex={setOpenIndex}
        openIndex={openIndex}
        section={section}
    />

    const SectionItem = ({ item, index, section }) => {
        return (
            <>
                {
                    section.items.length !== 0 &&
                    section.category_id == openIndex &&
                    <View style={{
                        ...MStyles.cardView,
                        //  padding: 10, 
                        margin: 16
                    }}>
                        <FlatList
                            data={section.items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <AllCategoriesSubItem
                                item={item}
                                navigateSubcategories={navigateSubcategories}
                            />}
                            numColumns={3}
                        />
                    </View>
                }
                <View style={{ height: 10, width: '100%', backgroundColor: Colors.dividerColor }} />
            </>
        )
    }

    const MainFooter = () => {
        return (
            <AllCategories
                data={homeData[homeData.length - 1]}
                navigateSubcategories={navigateSubcategories}
            />
        )
    }

    return (
        <View style={[MStyles.main]}>
            {/* <FlatList
                data={['']}
                ListHeaderComponent={MainHeader}
                renderItem={({ item, index }) => <></>}
                ListFooterComponent={MainFooter}
            /> */}
            {/* <SectionList
                sections={homeData[homeData.length - 1].category_data}
                keyExtractor={(item, index) => item + index}
                renderItem={SectionItem}
                renderSectionHeader={SectionHeader}
                ListHeaderComponent={MainHeader}
            /> */}

            <FlatList
                data={homeData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={GetDymanicItem}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
    },
    catOff: {
        ...MStyles.txtDescriptionBold,
        color: 'green',
    },
    catName: {
        ...MStyles.txtDescriptionBold,
        marginTop: 5,
    },
    cateDesc: {
        ...MStyles.txtDescription,
        color: Colors.textDarkGray,
        fontSize: 12,
        marginTop: 5,
    },
    subCatOff: {
        ...MStyles.txtDescription,
        color: 'green',
        fontSize: 12,
        textAlign: 'center'
    },
    subCatName: {
        ...MStyles.txtDescription,
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center'
    },
})


export default Dashboard