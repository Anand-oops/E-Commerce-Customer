import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Firebase from "../firebaseConfig";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Toast from 'react-native-simple-toast'


export default function OrderDetails(props) {

    const { user } = useContext(AuthContext);
    const [item] = useState(props.route.params.item);

    

    

    return (

        <View style={styles.main}>
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                
                    
                       
                            <View style={styles.listContainer}>
                                <Image source={item.image} style={styles.listimage} />
                                <View style={styles.list}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Order Id: {item.orderId}</Text>
                                    <Text style={{ color: 'black' }}>Product : {item.productName}</Text>
                                    <Text style={{ color: 'purple' }}>Category : {item.category} :: {data.item.subCategory}</Text>
                                    <Text style={{ color: 'blue' }}>Price: {item.finalPrice}</Text>
                                    <Text style={{ color: 'black' }}>Delivered: {item.address.city + "," + item.address.state + " - " + item.address.pincode}</Text>
                                    <Text style={{ color: 'red', marginBottom: 5 }}>{item.deliveryStatus}</Text>
                                </View>
                            </View>
                    
                    
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
        marginTop: 5
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 40,
        marginHorizontal: 20,
    },
});
