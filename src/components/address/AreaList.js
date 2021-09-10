import React, { useState, useEffect } from 'react'
import {
    SafeAreaView, KeyboardAvoidingView,
    StyleSheet, View, FlatList, TouchableOpacity, Text
} from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarBack from '../../common/ToolbarBack'
import { requestAreaList } from '../../apis/Api'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import { RefreshControl } from 'react-native'

const data = [
    {
        "area_name": "Ajmer Road",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "13",
        "pincode": "302006",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Amba Bari",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "1",
        "pincode": "302039",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Bagrana",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "48",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Bani Park",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "8",
        "pincode": "302016",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Banskho",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "53",
        "pincode": "303305",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Bassi",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "52",
        "pincode": "303301",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Bindayaka",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "20",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Collectorate",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "9",
        "pincode": "302016",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Dausa",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "54",
        "pincode": "303303",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Dehar Ka Balaji",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "3",
        "pincode": "302039",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Dhankya",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "21",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Dwarikapuri",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "10",
        "pincode": "302016",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Goner Road",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "46",
        "pincode": "302031",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Green Park",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "44",
        "pincode": "302031",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Gurjar Ki Thadi",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "59",
        "pincode": "302019",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Hathoj",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "22",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Heerapura",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "5",
        "pincode": "302021",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Industrial Area Jhotwara",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "23",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Industrial Estate",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "14",
        "pincode": "302006",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Jaipur Railway Station",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "15",
        "pincode": "302006",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Jamdoli",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "42",
        "pincode": "302031",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Jhotwara",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "24",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Kanota",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "47",
        "pincode": "303012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Khaniya",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "49",
        "pincode": "302001",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Khatipura",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "25",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Khatipura Road",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "16",
        "pincode": "302006",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Khora Bisal",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "26",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Kishanpura",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "27",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Luniyawas",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "45",
        "pincode": "302031",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Mansarover",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "57",
        "pincode": "302020",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Meena Wala",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "28",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Mundia Rampura",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "29",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Murlipura",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "4",
        "pincode": "302039",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Nangal Jaisabohra",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "30",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Neemera",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "31",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Neendar Banar",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "32",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Niwaroo",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "33",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Paldi meena agra road",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "41",
        "pincode": "302031",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Panch Batti",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "58",
        "pincode": "302001",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Panchyawala",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "7",
        "pincode": "302034",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Prem Nagar",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "43",
        "pincode": "302031",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Public Work Department (P.W.D.) Office",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "17",
        "pincode": "302006",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Raj Bhawan",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "18",
        "pincode": "302006",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Raja Park",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "51",
        "pincode": "302004",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Rangoli Garden",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "37",
        "pincode": "302021",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Rangoli Greens",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "40",
        "pincode": "302021",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Rawan Gate",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "39",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Rojda",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "34",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Sanganer",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "55",
        "pincode": "302029",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Shastri Nagar",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "11",
        "pincode": "302016",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Sindhi Colony",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "12",
        "pincode": "302016",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Sinwar",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "35",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Sirsi",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "36",
        "pincode": "302012",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Sitapura industrial area ",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "56",
        "pincode": "302022",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Station Road",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "19",
        "pincode": "302006",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Transport Nagar",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "50",
        "pincode": "302003",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Vaishali Nagar",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "6",
        "pincode": "302021",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    },
    {
        "area_name": "Vidhyadhar Nagar",
        "city": "Jaipur",
        "country": "India",
        "country_code": "IN",
        "id": "2",
        "pincode": "302039",
        "state": "Rajasthan",
        "state_code": "RJ",
        "status": "1"
    }
]

const AreaList = (props) => {

    const { localData, areaList, loading, error, navigateToAddAddress, onRefreshClick, refreshing } = props;
    // const [loading, setLoading] = useState(false)
    // const [areaList, setAreaList] = useState([])
    // const [areaServing, setAreaServing] = useState()
    // const [error, setError] = useState()

    // useEffect(() => {
    //     serverRequestForAreaList()
    // }, [])

    // const serverRequestForAreaList = async () => {
    //     if (loading) return
    //     setLoading(true)
    //     requestAreaList()
    //         .then(response => {
    //             if (response.status) {
    //                 // setAreaServing(response.area_serving)
    //                 setAreaList(response.data)
    //             }
    //             setLoading(false)
    //         })
    //         .catch(error => {
    //             setLoading(false)
    //             setError(error.message)
    //         })
    // }

    // const navigateToAddAddress = (item) => {
    //     props.navigation.pop()
    //     props.navigation.navigate("addAddress", { addressData: item })
    // }

    // const onRefreshClick = () => {
    //     setError(null)
    //     serverRequestForAreaList()
    // }

    const ListItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => navigateToAddAddress(item)}>
                    <Text style={styles.listText}> {item.area_name} </Text>
                </TouchableOpacity>
                <View style={MStyles.divider} />
            </View>
        )
    }

    // const Header = () => {
    //     return (
    //         <>
    //             {
    //                 areaServing &&
    //                 <Text style={styles.headerText}>{areaServing}</Text>
    //             }
    //         </>
    //     )
    // }

    // const EmptyView = () => {
    //     return (
    //         <View style={[MStyles.main, MStyles.center]}>
    //             {loading ? null :
    //                 <>
    //                     <Text style={[MStyles.txtSubTitle, { marginTop: 30 }]}>
    //                         {error}
    //                     </Text>
    //                     <TouchableOpacity
    //                         onPress={onRefreshClick}
    //                         style={[MStyles.buttonSmallParent]}>
    //                         <Text style={MStyles.themeButtonSmall}> Refresh </Text>
    //                     </TouchableOpacity>
    //                 </>
    //             }
    //         </View>
    //     )
    // }

    return (
        <SafeAreaView style={[MStyles.main]}>
            <KeyboardAvoidingView style={[MStyles.main]}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>

                {/* <ToolbarBack {...props} title='Select Your Area' /> */}
                {/* <LinearProgressDialog loading={loading} /> */}
                <FlatList
                    data={localData && localData.areaList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    // ListHeaderComponent={() => { return <Header /> }}
                    // renderItem={({ item }) => { return <ListItem {...item} /> }}
                    renderItem={ListItem}
                    style={{ flex: 0 }}
                    initialNumToRender={localData && localData.areaList && localData.areaList.length}
                    // ListEmptyComponent={() => { return <EmptyView /> }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshClick} />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        ...MStyles.txtDescription,
        fontSize: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#999999',
        color: '#FFF',
        textAlign: 'center'
    },
    listText: {
        ...MStyles.txtDescription,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})

export default AreaList