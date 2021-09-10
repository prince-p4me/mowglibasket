import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text } from 'react-native'
import ToolbarBack from '../../common/ToolbarBack'
import MStyles from '../../styles/MStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import ErrorView from '../../common/ErrorView'
import { requestTermsAndConditions } from '../../apis/Api'

const Terms = (props) => {

    const [loading, setLoading] = useState()
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        if (loading) return
        setLoading(true)
        requestTermsAndConditions()
            .then(response => {
                if (response.status) {
                    setData(response.data)
                } else {
                    alert(response.message)
                    setError(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
                setError(error.message)
            })
    }, [])

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title={data ? data.post_title : ""} />
            <LinearProgressDialog loading={loading} />
            <View style={[MStyles.main]}>
                {
                    data ?
                        <ScrollView >

                            <Text style={[MStyles.txtDescription, { padding: 12 }]}>
                                {data.post_content}
                            </Text>

                        </ScrollView>
                        :
                        error ? <ErrorView message={error} /> : null}
            </View>
        </SafeAreaView>
    )
}

export default Terms