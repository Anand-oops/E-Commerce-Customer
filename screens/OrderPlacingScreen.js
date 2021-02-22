import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";
import Toast from 'react-native-simple-toast';

export default function OrderPlacingScreen(props) {

    const { user } = useContext(AuthContext);

    const address = props.route.params.address;
    const items = props.route.params.items;
    const finalPrice = props.route.params.price;
    const counters = props.route.params.counters;

    const ButtonPress = () => {
        for (var i = 0; i < items.length; i++) {
            console.log("Count", counters[i])
            var check = true;
            var item = items[i];
            item.address = address;
            item.customer = {
                customerId: user.uid,
                customerName: user.firstName + " " + user.lastName
            }
            item.deliveryStatus = 'Pending';
            var date = new Date();
            item.orderCount = counters[i];
            item.orderId = date.getTime().toString();
            item.orderDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            item.orderTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds();

            Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}/stocks`).transaction(function (currentStock) {
                console.log("Current", currentStock)
                if (parseInt(currentStock) < parseInt(counters[i])) {
                    Toast.show("Selected quantity of " + item.productName + " is not in stock", Toast.SHORT);
                    check = false;
                    return currentStock;
                } else {
                    return parseInt(currentStock) - parseInt(counters[i]);
                }
            })
            if (check) {
                console.log("SETTTT")
                Firebase.database().ref(`Customers/${user.uid}/Orders/${item.orderId}`).set(item);
                Firebase.database().ref(`Customers/${user.uid}/cart/${i}`).remove();
                Firebase.database().ref(`CustomerOrders/${item.dealerId}/${item.orderId}`).set(item);
                var notif = "Order placed from Id: " + user.uid;
                Firebase.database().ref(`Dealers/${item.dealerId}/Notifications`).push(notif);
            }
        }

        Toast.show("Order Placed");
        props.navigation.navigate('Cart');

    }

    return (

        <View style={styles.main}>

            <View style={styles.card}>
                <Text style={{ margin: 2, fontWeight: 'bold', fontSize: 20 }}>Shipping to :</Text>
                <Text style={{ margin: 2, fontStyle: 'italic', fontSize: 16, letterSpacing: 0.5, color: '#DCDCDC' }}>
                    {address.name + '\n' + address.mobile + '\n' + address.addressLine1 + '\n' + address.addressLine2 + '\n' + address.city + ' , ' + address.state + ' - ' + address.pincode}
                </Text>
                <View
                    style={{
                        margin: 2,
                        borderBottomColor: '#000a1a',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={{ flexDirection: "row", margin: 2 }}>
                    <Text style={{ flex: 1, fontSize: 18 }}>Price : </Text>
                    <Text style={{ fontSize: 18, color: '#DCDCDC' }}>{finalPrice}</Text>
                </View>
                <View style={{ flexDirection: "row", margin: 2 }}>
                    <Text style={{ flex: 1 }}>ADDITIONAL CHARGES: </Text>
                    <Text style={{ color: '#DCDCDC' }}>00.00</Text>
                </View>

                <View
                    style={{
                        margin: 2,
                        borderBottomColor: '#000a1a',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={{ flexDirection: "row", margin: 2 }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20 }}>TOTAL AMOUNT </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 0.5, color: '#DCDCDC' }}>{finalPrice}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => ButtonPress()}>
                <View style={{ borderRadius: 3, elevation: 1, margin: 6, padding: 4, backgroundColor: '#f4a460', height: 40, justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Place Your Order</Text>
                </View>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#a6b8ca',
    },
    card: {
        marginTop: 8,
        padding: 5,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#778899',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderWidth: 2,
        borderColor: '#DCDCDC',
        marginHorizontal: 4,
        marginVertical: 6,
    }
});
