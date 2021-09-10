import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
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
import CategoryProductsContainer from './categoryProducts/CategoryProductsContainer'
import AllCategories from './sections/AllCategories'
import { HOME_DIVIDER_MARGIN } from '../../common/Constants'
import SearchHeader from '../home/SearchHeader'
import Colors from '../../styles/Colors'

const Dashboard = (props) => {

    const { homeData, navigation, response } = props

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
    const navigateToProductDetails = (item) => {
        props.navigation.navigate('productDetail', item.id)
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
    const getDymanicItem = (item, index) => {
        // log(index, item.section_type)
        switch (item.section_type) {
            case 'banner_slider':
                return <BannerSlider
                    {...props}
                    data={item.banner}
                    key={index.toString()}
                    onBannerClick={onBannerClick} />
            case 'banner':
                return <Banner
                    data={item}
                    key={index.toString()}
                    onBannerClick={onBannerClick} />
            case 'parent_categories':
                return <ParentCategories
                    data={item.category_data}
                    key={index.toString()}
                    navigateToGrocery={navigateToGrocery}
                    navigateToFruits={navigateToFruits}
                    navigateToVegetables={navigateToVegetables} />
            case 'first_order_offers':
                return <FirstOrderOffers
                    data={item}
                    key={index.toString()} />
            case 'category_products':
                return <View
                    key={index.toString()}
                    style={{ marginBottom: HOME_DIVIDER_MARGIN }}>
                    <CategoryProductsContainer
                        response={response}
                        item={item}
                        navigateToProductList={navigateToProductList} 
                        navigateToProductDetails={navigateToProductDetails}/>
                </View>
            case 'sub_categories':
                return <SubCategories
                    key={index.toString()}
                    data={item}
                    navigateSubcategories={navigateSubcategories} />
            case 'four_categories':
                return <FourCategories
                    key={index.toString()}
                    data={item}
                    navigateSubcategories={navigateSubcategories} />
            case 'sub_categories_discount':
                return <SubCategoryOffers
                    key={index.toString()}
                    data={item}
                    navigateSubcategories={navigateSubcategories} />
            case 'fix_discount':
                return <FixDiscount
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
                {
                    homeData.map(getDymanicItem)
                }
            </View>
        )
    }
    const MainFooter = () => {
        const item = homeData.find(item => item.section_type === 'all_categories')
        return (
            <AllCategories
                data={item}
                navigateSubcategories={navigateSubcategories}
            />
        )
    }

    return (
        <View style={[MStyles.main]}>
            <FlatList
                data={['']}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={MainHeader}
                renderItem={() => <></>}
                ListFooterComponent={MainFooter} />
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