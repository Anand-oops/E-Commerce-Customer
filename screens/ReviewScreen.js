import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, Modal, Keyboard, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Firebase from "../firebaseConfig";
import Toast from 'react-native-simple-toast';
import { useState } from 'react';

export default function ReviewScreen(props) {


    const item = props.route.params.item;
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('');

    const giveReview = (item) => {
        console.log("clicked");
        props.navigation.navigate('WriteReview', { item: item });
    }
    const getInfo = (item) => {
        console.log("clicked");
        props.navigation.navigate('OrderDetails', { item: item });
    }

    const changeStatus = () => {
        var text = '';
        if (item.deliveryStatus === 'Pending')
            text = 'Cancelled : Pending'
        else text = 'Returned : Pending';
        Firebase.database().ref(`CustomerOrders/${item.dealerId}/${item.orderId}`).update({ deliveryStatus: text, reason: reason });
        Firebase.database().ref(`Customers/${item.customer.customerId}/Orders/${item.orderId}`).update({ deliveryStatus: text, reason: reason });
        Toast.show("Product " + text, Toast.SHORT);
        props.navigation.navigate('YourOrders');
        setReason('');
        var notif="Order "+text+" from userId: "+item.customer.customerId;
        Firebase.database().ref(`Dealers/${item.dealerId}/Notifications`).push(notif);
        var notif2="Order "+text+" from userId: "+item.customer.customerId+" for productId: "+item.orderId+ "and dealerId: "+item.dealerId;
        Firebase.database().ref(`Admin/Notifications`).push(notif2);
    }

    const closeModal = () => { setShowModal(false), setReason('') }

    return (
        <ScrollView style={{ backgroundColor: '#a6b8ca' }}>
            <View style={styles.main}>
                <View style={{ margin: 4, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{ padding: 2, height: 150, width: '98%', resizeMode: 'contain', alignSelf: 'center', }}
                            source={{ uri: item.image.uri }}
                        />
                    </View>
                    <View style={{ flex: 1 , justifyContent:'center'}}>
                        <Text style={{ color: '#3b3a30', fontSize: 24, paddingLeft: 4, textTransform: 'capitalize' }}>{item.productName}</Text>
                        <Text style={{ color: '#3b3a30', fontSize: 16, paddingLeft: 4, textTransform: 'capitalize' }}>ID : {item.orderId}</Text>
                        <Text style={{ color: 'gray', fontSize: 18, paddingLeft: 4 }}>{item.category + " : " + item.subCategory}</Text>
                        <Text style={{ color: 'gray', fontSize: 16, paddingLeft: 4 }}>{item.description}</Text>
                        <Text style={{ color: 'gray', fontSize: 16, paddingLeft: 4 }}>{item.specs}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'green', fontSize: 18, paddingLeft: 4, }}> ₹ {(item.finalPrice)}</Text>
                        </View>
                    </View>

                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: '#000a1a',
                        borderBottomWidth: 5,
                    }}
                />

                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4 }}>How's your item ?</Text>
                    <View style={{ borderRadius: 1, elevation: 1, padding: 2, margin: 10, height: 40, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', opacity: (item.deliveryStatus === 'Pending') ? 0.2 : 1 }}
                            onPress={() => {
                                if (item.deliveryStatus != 'Pending')      //Uncomment This
                                    giveReview(item)
                            }}>
                            <Text style={{ fontSize: 15, marginHorizontal: 8, flex: 1 }}>Give Review</Text>
                            <View style={{ alignSelf: 'center', marginHorizontal: 4 }}>
                                <AntDesign name="right" size={15} color="#000a1a" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: '#000a1a',
                        borderBottomWidth: 5,
                    }}
                />
                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4 }}>Order Info</Text>
                    <View style={{ borderRadius: 1, elevation: 1, padding: 2, margin: 10, height: 40, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { getInfo(item) }}>
                            <Text style={{ fontSize: 15, marginHorizontal: 8, flex: 1 }}>Order Info</Text>
                            <View style={{ alignSelf: 'center', marginHorizontal: 4 }}>
                                <AntDesign name="right" size={15} color="#000a1a" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: '#000a1a',
                        borderBottomWidth: 5,
                    }}
                />

                <TouchableOpacity style={{
                    elevation: 1, padding: 2, margin: 10, height: 40, width: 250,
                    justifyContent: 'center', alignSelf: 'center', borderRadius: 10,
                    shadowOpacity: 'transparent',
                    shadowColor: 'white',
                    backgroundColor: (item.deliveryStatus === 'Pending') ? 'orange' : ((item.deliveryStatus === 'Delivered') ? 'green' : 'transparent'), opacity: (item.deliveryStatus.includes('Cancelled') || item.deliveryStatus.includes('Returned')) ? 0 : 1
                }}
                    onPress={() => {
                        if (item.deliveryStatus === 'Pending')
                            Alert.alert("Cancel Order ?", "Your order cancellation will be requested !",
                                [
                                    { text: 'Cancel' },
                                    { text: 'Proceed', onPress: () => { setShowModal(true) } },
                                ])
                        else if (item.deliveryStatus === 'Delivered')
                            Alert.alert("Return Order ?", "Return will be requested !",
                                [
                                    { text: 'Cancel' },
                                    { text: 'Proceed', onPress: () => { setShowModal(true) } },
                                ])
                    }}>
                    <Text style={{ fontSize: 15, color: 'white', textAlign: 'center' }}>
                        {(item.deliveryStatus === 'Pending') ? 'Cancel Order' : 'Return Order'}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType='fade'
                visible={showModal}
                position='center'
                transparent={true}
                onRequestClose={() => closeModal()}>
                <View style={styles.modalContainer}>
                    <View style={styles.cardModalScreen}>
                        <Text style={{ paddingLeft: 15, marginTop: 10, }}>Reason for : {(item.deliveryStatus === 'Delivered') ? 'Return' : 'Cancellation'}</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <TextInput style={styles.modalTextInput} onChangeText={(text) => setReason(text)} value={reason} />
                        </View>

                        <View style={styles.modalButtonContainer}>
                            <View style={{ padding: 10, width: '30%' }}>
                                <Button title='Cancel' onPress={() => { Keyboard.dismiss(), closeModal() }} />
                            </View>
                            <View style={{ padding: 10, width: '30%' }}>
                                <Button title='OK' onPress={() => {
                                    if (reason.length == 0) {
                                        Keyboard.dismiss()
                                        Toast.show("Enter the reason first", Toast.SHORT);
                                    } else {
                                        Keyboard.dismiss(),
                                            setShowModal(false)
                                        changeStatus()
                                    }
                                }
                                } />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    cardModalScreen: {
        height: 200,
        width: '85%',
        borderRadius: 15,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#d8eafd'
    },
    modalTextInput: {
        width: '90%',
        marginVertical: 10,
        padding: 5,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    modalButtonContainer: {
        zIndex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },

});
