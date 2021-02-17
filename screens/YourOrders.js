import React from 'react';
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Firebase from "../firebaseConfig";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Toast from 'react-native-simple-toast';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar, ActivityIndicator } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet'
import { CheckBox } from 'react-native-elements';
import { windowWidth } from '../shared/Dimensions'


export default function YourOrders({ navigation }) {

    const { user } = useContext(AuthContext);

    const [listen, setListen] = useState(true);
    const [orders, setOrders] = useState([])
    const [loader, setLoader] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [buttonText, setButtonText] = useState('Select Date')
    const [filtered, setFiltered] = useState([])
    const [pendingCB, setPendingCB] = useState(true);
    const [deliveredCB, setDeliveredCB] = useState(true);
    const [cancelledCB, setCancelledCB] = useState(true);
    const [returnedCB, setReturnedCB] = useState(true);

    const filterRBSheet = useRef();

    Firebase.database().ref(`Customers/${user.uid}/Orders`).on('value', data => {
        if (listen) {
            if (data.val()) {
                var list = [];
                var keys = Object.keys(data.val())
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    list.push(data.val()[key])
                }
                setOrders(list.reverse());
                setFiltered(list.reverse());
                setPendingCB(true)
                setDeliveredCB(true)
                setCancelledCB(true)
                setReturnedCB(true)
                setSelectedDate(new Date());
                setButtonText('Select Date');
            } else
                Toast.show("No Orders", Toast.SHORT);
            setListen(false);
            setLoader(false);
        }
    });

    const pressHandler = (item) => {
        console.log("clickedd");
        navigation.navigate('ReviewScreen', { item: item });
    }

    const onChange = (event, selectedDate) => {
        setShow(false)
        setPendingCB(true)
        setDeliveredCB(true)
        setCancelledCB(true)
        setReturnedCB(true)
        if (event.type === 'dismissed') {
            setSelectedDate(new Date());
            setButtonText('Select Date');
            setFiltered(orders);
        } else {
            setSelectedDate(selectedDate);
            var date = selectedDate.getDate() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getFullYear();
            setButtonText(date);
            var list = [];
            orders.map(item => {
                if (item.orderDate == date) {
                    list.push(item);
                }
            })
            setFiltered(list);
        }
    }

    const performFilter = (pen, del, can, ret) => {
        var checked = [];
        var filtered = [];
        if (pen && del && can && ret) {
            filtered = orders;
        }
        else {
            if (pen)
                checked.push('Pending')
            if (del)
                checked.push('Delivered')
            if (can)
                checked.push('Cancelled')
            if (ret)
                checked.push('Returned')
            orders.map((prod) => {
                if (checked.includes(prod.deliveryStatus)) {
                    filtered.push(prod)
                }
            })
        }
        setFiltered(filtered);
    }

    return (

        <View style={styles.main}>
            <StatusBar style='light' />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '50%', borderRadius: 10, borderWidth: 1, borderColor: 'white', padding: 2, backgroundColor: 'white', justifyContent: 'center' }}
                    onPress={() => { setShow(true) }} >
                    <Text style={{ color: 'black', textAlign: 'center' }}>{buttonText}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={selectedDate}
                        maximumDate={new Date()}
                        onChange={onChange}
                    />
                )}

                <TouchableOpacity style={{ width: '50%', borderRadius: 10, borderWidth: 1, borderColor: 'white', padding: 2, backgroundColor: 'white', justifyContent: 'center' }}
                    onPress={() => { filterRBSheet.current.open(); }} >
                    <Text style={{ color: 'black', textAlign: 'center' }}>Filter</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <FlatList data={filtered}
                    renderItem={data => (
                        <TouchableOpacity onPress={() => pressHandler(data.item)}>
                            <View style={styles.listContainer}>
                                <Image source={data.item.image} style={styles.listimage} />
                                <View style={styles.list}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Order Id: {data.item.orderId}</Text>
                                    <Text style={{ color: 'blue' }}>Order Date: {data.item.orderDate}</Text>
                                    <Text style={{ color: 'black' }}>Product : {data.item.productName}</Text>
                                    <Text style={{ color: 'purple' }}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                    <Text style={{ color: 'blue' }}>Price: {data.item.finalPrice}</Text>
                                    <Text style={{ color: 'black' }}>Delivered: {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                                    <Text style={{ color: 'red', marginBottom: 5 }}>{data.item.deliveryStatus}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )} />
            </ScrollView>
            <TouchableOpacity>
                <RBSheet
                    ref={filterRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={300}
                    animationType='fade'
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                >
                    <View >
                        <CheckBox
                            title='Pending'
                            checked={pendingCB}
                            onPress={() => setPendingCB(!pendingCB)}
                        />
                        <CheckBox
                            title='Delivered'
                            checked={deliveredCB}
                            onPress={() => setDeliveredCB(!deliveredCB)}
                        />
                        <CheckBox
                            title='Cancelled'
                            checked={cancelledCB}
                            onPress={() => setCancelledCB(!cancelledCB)}
                        />
                        <CheckBox
                            title='Returned'
                            checked={returnedCB}
                            onPress={() => setReturnedCB(!returnedCB)}
                        />
                        <View style={{ flexDirection: 'row' }} >

                            <TouchableOpacity style={styles.filterButton} onPress={() => {
                                setPendingCB(true)
                                setDeliveredCB(true)
                                setCancelledCB(true)
                                setReturnedCB(true)
                                setButtonText('Select Date');
                                setSelectedDate(new Date());
                                performFilter(true, true, true, true);
                                filterRBSheet.current.close();
                            }} >
                                <Text style={{ color: 'white' }}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton} onPress={() => {
                                setButtonText('Select Date');
                                setSelectedDate(new Date());
                                performFilter(pendingCB, deliveredCB, cancelledCB, returnedCB)
                                filterRBSheet.current.close();
                            }}>
                                <Text style={{ color: 'white' }} >Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
            </TouchableOpacity>
            <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator

                    size='large'
                    color="grey"
                    animating={loader}

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: '50%'
    },
    text: {
        color: 'blue'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'black',
        paddingHorizontal: 20,
        marginTop: 5
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 40,
        marginHorizontal: 20,
    },
    filterButton: {
        width: windowWidth / 2,
        textAlign: 'center',
        color: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 15,
        elevation: 10,
    }
});
