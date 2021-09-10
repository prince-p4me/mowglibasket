import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MStyles from '../../styles/MStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import ToolbarBack from '../../common/ToolbarBack'
import FilterOpenRefine from './FilterOpenRefine'
import FilterOpenSortBy from './FilterOpenSortBy'
import { requestFilterParams } from '../../apis/Api'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import ErrorView from '../../common/ErrorView'

const Filter = (props) => {

    const { type, id, searchKeyword } = props.route.params

    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [data, setData] = useState()
    const [filterScreen, setFilterScreen] = useState(1)

    useEffect(() => {
        setLoading(true)
        serverRequestForFilterParams()
    }, [])

    const serverRequestForFilterParams = async () => {

        if (loading)
            return

        let jsonRequest = {}
        jsonRequest.type = type
        jsonRequest.filter = 0

        if (type === "search") {
            jsonRequest.keyword = searchKeyword
        } else {
            jsonRequest.term_id = id
        }

        requestFilterParams(jsonRequest)
            .then(response => {
                if (response.status) {
                    setData(response.data)
                } else {
                    setError(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError(error.message)
            })
    }

    return (
        <SafeAreaView style={MStyles.mainAuth}>
            <ToolbarBack {...props} title="Filter" />
            <View style={MStyles.main}>
                <LinearProgressDialog loading={loading} />
                {
                    data
                        ?
                        <>
                            <View style={[MStyles.horizontal]}>
                                <TouchableOpacity activeOpacity={0.5}
                                    onPress={() => setFilterScreen(1)}
                                    style={[(filterScreen == 1) ? MStyles.filterTabSelected : MStyles.filterTab]}>
                                    <Text style={[MStyles.txtTitleSmall]}>Refine by</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.5}
                                    onPress={() => setFilterScreen(2)}
                                    style={[(filterScreen != 1) ? MStyles.filterTabSelected : MStyles.filterTab]}>
                                    <Text style={[MStyles.txtTitleSmall]}>Sort by</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                (filterScreen == 1)
                                    ?
                                    <FilterOpenRefine {...props} data={data} />
                                    :
                                    <FilterOpenSortBy {...props} data={data} />
                            }
                        </>
                        : error ? <ErrorView message={error} /> : null}
            </View>
        </SafeAreaView>
    )
}

export default Filter