import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Firebase from "../firebaseConfig";
import { FlatList, LongPressGestureHandler, ScrollView } from "react-native-gesture-handler";
import Toast from 'react-native-simple-toast'


export default function YourOrders({navigation}) {

    const { user } = useContext(AuthContext);

    const [listen, setListen] = useState(true);
    const [orders, setOrders] = useState([])

    Firebase.database().ref(`Customers/${user.uid}/Orders`).on('value',data => {
        if (listen) {
            if (data.val()) {
                var list = [];
                var keys = Object.keys(data.val())
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    list.push(data.val()[key])
                }
                setOrders(list);
            } else
                Toast.show("No Orders", Toast.SHORT);
            setListen(false);
        }
    });

    const pressHandler=(item)=>{
        console.log("clickedd");
   navigation.navigate('ReviewScreen',{item:item});
    }

    return (

        <View style={styles.main}>
            <ScrollView style={{ flex: 1, marginTop:10 }}>
                <FlatList data={orders}
                    renderItem={data => (
                        <TouchableOpacity onPress={()=>pressHandler(data.item)}>
                        <View style={styles.listContainer}>
                            
                            <Image source={data.item.image} style={styles.listimage} />
                            <View style={styles.list}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Order Id: {data.item.orderId}</Text>
                                <Text style={{ color: 'black' }}>Name : {data.item.productName}</Text>
                                <Text style={{ color: 'purple' }}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                <Text style={{ color: 'blue' }}>Price: {data.item.productPrice}</Text>
                                <Text style={{ color: 'black' }}>Address: {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                                <Text style={{ color: 'red' }}>{data.item.deliveryStatus}</Text>
                            </View>
                            
                        </View>
                        </TouchableOpacity>
                    )} />
            </ScrollView>
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
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 20,
        
        marginHorizontal: 20,
    },
});
