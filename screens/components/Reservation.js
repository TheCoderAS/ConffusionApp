import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal } from 'react-native'
import { Card } from "react-native-elements";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";

export default function Reservation(props) {
    const [guests, setGuests] = useState(1)
    const [smoking, setSmoking] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    }
    const handleReservation = () => {
        //console.log(JSON.stringify(data))
        toggleModal()
    }
    const resetForm = () => {
        setGuests(1)
        setSmoking(false)
        setDate(new Date())
        setShowModal(false)
        setOpen(false)
    }
    return (
        <ScrollView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onDismiss={() => toggleModal()}
                onRequestClose={() => toggleModal()}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Your Reservation</Text>
                    <Text style={styles.modalText}>Number of Guests: {guests}</Text>
                    <Text style={styles.modalText}>Smoking?: {smoking ? 'Yes' : 'No'}</Text>
                    <Text style={styles.modalText}>Date and Time: {moment(date).format('lll')}</Text>

                    <Button
                        onPress={() => { toggleModal(); resetForm(); }}
                        color="#512DA8"
                        title="Close"
                    />
                </View>
            </Modal>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={guests}
                    onValueChange={(value, index) => setGuests(value)}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={smoking}
                    onTintColor="#512DA8"
                    onValueChange={value => setSmoking(value)}
                ></Switch>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <Text style={{ paddingHorizontal: 10, color:'#999999' }}>{moment(date).format('lll')}</Text>
                <Button title="Pick" onPress={() => setOpen(true)} />
                <DatePicker
                    date={date}
                    mode="datetime"
                    placeholder="Select Date and Time"
                    modal
                    onConfirm={(date) => { setDate(date); setOpen(false) }}
                    onCancel={() => { setOpen(false) }}
                    minDate={new Date()}
                    open={open}
                // confirmBtnText="Confirm"
                // cancelBtnText="Cancel"
                // customStyles={{
                // dateIcon: {
                //     position: 'absolute',
                //     left: 0,
                //     top: 4,
                //     marginLeft: 0
                // },
                // dateInput: {
                //     marginLeft: 36
                // }
                // }}
                // onDateChange={(date) => {setDate(date)}}
                />
            </View>
            <View style={styles.formRow}>
                <Button
                    onPress={() => handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
        color:"#999999"
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10,
        color:'#999999'
    }

});
