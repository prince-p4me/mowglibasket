import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import { View, FlatList, RefreshControl } from 'react-native'
import { requestNotifications } from '../../apis/Api'
import ErrorView from '../../common/ErrorView'
import ToolbarBack from '../../common/ToolbarBack'
import NotificationItem from './NotificationItem'
import EmptyNotifications from './EmptyNotifications'
import EmptyNotificationsItem from './EmptyNotificationsItem'

const Notifications = (props) => {

    const [localData, setLocalData] = useState({ loading: true })
    const [page, setPage] = useState(1);

    let tempPage = 1
    useEffect(() => {
        tempPage = 1
        serverRequestForNotification(1)
    }, [])

    const serverRequestForNotification = async (pageNo) => {
        // if (localData.loading || localData.isLoadingMore || localData.refreshing)
        //     return
        requestNotifications(pageNo)
            .then(response => {
                if (response.status) {
                    if (tempPage == 1) {
                        setLocalData({
                            ...localData, loading: false, refreshing: false, isLoadingMore: false, totalPage: response.total_page_count,
                            notifications: response.data
                        })
                    } else {
                        let allNotifications = localData.notifications;
                        allNotifications.push(...response.data)
                        setLocalData({
                            ...localData, loading: false, refreshing: false, isLoadingMore: false, totalPage: response.total_page_count,
                            notifications: allNotifications
                        })
                    }
                } else {
                    setLocalData({ ...localData, error: response.message, loading: false, refreshing: false, isLoadingMore: false })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message, refreshing: false, isLoadingMore: false })
            })
    }

    const pullTorefresh = () => {
        tempPage = 1
        setLocalData({ ...localData, refreshing: true, notifications: null })
        setPage(1)
        serverRequestForNotification(1)
    }

    const loadMore = () => {
        let newPage = page + 1;
        tempPage = newPage
        setLocalData({ ...localData, isLoadingMore: true })
        serverRequestForNotification(newPage)
        setPage(newPage)
    }

    const renderItem = ({ item }) => {
        return <NotificationItem
            {...props}
            item={item}
            loading={localData.loading}
            refreshing={localData.refreshing}
            isLoadingMore={localData.isLoadingMore} />
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title="Notifications" />
            <View style={[MStyles.mainGray]}>
                {/* <ProgressDialog loading={localData.loading} /> */}
                {localData.loading ? <EmptyNotifications /> :
                    <>
                        {
                            localData.notifications ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={localData.notifications}
                                    keyExtractor={(item) => item.notification_id}
                                    renderItem={renderItem}
                                    refreshControl={<RefreshControl refreshing={localData.refreshing} onRefresh={() => pullTorefresh()} />}
                                    onEndReached={() => {
                                        if (localData.totalPage > page) {
                                            loadMore()
                                        }
                                    }}
                                    ListFooterComponent={() => {
                                        // if (localData.isLoadingMore) return <ActivityIndicator size='large' color={Colors.primaryDark} />
                                        if (localData.isLoadingMore) return <EmptyNotificationsItem />
                                        else return null
                                    }}
                                    onEndReachedThreshold={.03}
                                />
                                : localData.error ? <ErrorView message={localData.error} /> : null
                        }
                    </>}
            </View>
        </SafeAreaView>
    )
}

// const NotificationsItem = ({ item }) => {
//     return (
//         <View style={MStyles.main}>
//             {/* <View style={{ flexDirection: 'row' }}> */}
//             {
//                 item.product_image ?
//                     <Image
//                         source={{ uri: item.product_image }}
//                         style={{ width: '100%', height: undefined, resizeMode: 'cover', aspectRatio: (item.image_width / item.image_height) }} />
//                     : null
//             }
//             <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
//                 <Text style={[MStyles.txtTitleSmall, { marginTop: 5 }]}>{item.product_title}</Text>
//                 <Text style={[MStyles.txtSubTitle, { color: Colors.textGray, marginTop: 3 }]}>{item.product_description}</Text>
//                 <Text style={[MStyles.txtDescription, { color: Colors.textGray, marginTop: 3 }]}>{item.product_date}</Text>
//             </View>
//             {/* </View> */}
//             <View style={[MStyles.divider]} />
//         </View>
//     )
// }

export default Notifications