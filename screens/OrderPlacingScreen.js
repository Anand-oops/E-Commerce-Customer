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

    const ButtonPress = () => {
        for (var i = 0; i < items.length; i++) {
            var item = items[i]; 
            item.address = address;
            item.customer = {
                customerId : user.uid,
                customerName : user.firstName+" "+user.lastName
            } 
            item.deliveryStatus = 'Pending';
            var date = new Date();
            item.orderId = date.getTime().toString();
            item.orderDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            item.orderTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds();
            
            Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}/stocks`).transaction(function (currentStock) {
                return currentStock-1;
            })
            
            Firebase.database().ref(`Customers/${user.uid}/Orders/${item.orderId}`).set(item);
            Firebase.database().ref(`CustomerOrders/${item.dealerId}/${item.orderId}`).set(item);
        }

        Firebase.database().ref(`Customers/${user.uid}/cart`).set(null)
        Toast.show("Order Placed");
        props.navigation.navigate('Cart');

    }

    return (

        <View style={styles.main}>

            <View style={{ margin: 4, borderRadius: 1, elevation: 1 }}>
                <Text style={{ margin: 2, fontWeight: 'bold', fontSize: 18 }}>Shipping to :</Text>
                <Text style={{ margin: 2, fontWeight: 'normal', fontStyle: 'italic' }}>
                    {address.name + '\n' + address.mobile + '\n' + address.addressLine1 + '\n' + address.addressLine2 + '\n' + address.city + ' , ' + address.state + ' - ' + address.pincode}
                </Text>
                <View
                    style={{
                        margin: 2,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={{ flexDirection: "row", margin: 2 }}>
                    <Text style={{ flex: 1 }}>Items : </Text>
                    <Text>{finalPrice}</Text>
                </View>
                <View style={{ flexDirection: "row", margin: 2 }}>
                    <Text style={{ flex: 1 }}>ADDITIONAL CHARGES: </Text>
                    <Text>00.00</Text>
                </View>

                <View
                    style={{
                        margin: 2,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={{ flexDirection: "row", margin: 2 }}>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>TOTAL AMOUNT </Text>
                    <Text style={{ fontWeight: 'bold' }}>{finalPrice}</Text>
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
        width: '100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: '50%'
    },
    text: {
        color: 'blue'
    }
});
