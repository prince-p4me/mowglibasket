import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ADummy = () => {

    const promiseFuction = (value) => {
        return new Promise((firstMethod, secondMethod) => {
            firstMethod({ value })
            // if (value < 10) {
            //     firstMethod("result is" + value)
            // } else {
            //     secondMethod("This is more than 10")
            // }
        })
    }

    const checkForPromise = () => {

        const multipleRequest = [
            promiseFuction(100),
            promiseFuction(400),
            promiseFuction(800),
            promiseFuction(50),
        ]

        // promiseFuction(12)
        //     .then(res => { console.log("result = ", res) })
        //     .catch(err => { console.log("error = ", err) })

        Promise.all(multipleRequest)
            .then(responses => {
                console.log("Responses  = ", responses)
            })


    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text
                onPress={checkForPromise}
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    backgroundColor: '#dcdcdc',
                    borderRadius: 4
                }}
            >
                Check Promise
            </Text>

        </View>
    )

}

export default ADummy