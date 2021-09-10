import React, { useState, useEffect } from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../styles/Colors'
import DatePicker from 'react-native-date-picker'
import MStyles from '../styles/MStyles'
import Moment from 'moment'

const DatePickerDialog = ({ setServerDate, hideDatePicker, visibility, setDisplayDate }) => {

    const [date, setDate] = useState(new Date())
    // let initialDate 

    useEffect(()=>{
        onDateChanged(date)
    },[])

    const onDateChanged = (dates) => {
        // setDate(dates)
        Moment.locale('en');
        let newDate = Moment(dates).format('YYYY/MM/DD');
        setServerDate(newDate)

        let displayDate = Moment(dates).format('DD-MM-YYYY');
        setDisplayDate(displayDate)
    }

    return (
        <Modal visible={visibility} transparent animationType='fade'>
            <View style={[styles.main]} >
                <View style={[styles.dialog]}>
                    <View style={styles.card}>

                        <DatePicker
                            date={date}
                            onDateChange={onDateChanged}
                            mode={'date'}
                            maximumDate={date} />

                        <TouchableOpacity
                            style={[MStyles.buttonSmallParent]}
                            onPress={() => {
                                hideDatePicker()
                            }}>
                            <Text style={[MStyles.themeButtonSmall]}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.transparent,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialog: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20
    },
    card: {
        borderRadius: 20,
        alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5
    }
})

export default DatePickerDialog