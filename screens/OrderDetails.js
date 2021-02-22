import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function OrderDetails(props) {

    const [item] = useState(props.route.params.item);

    return (

        <View style={styles.main}>
            <ScrollView style={{ flex: 1, marginTop: 10 }}>

                <View >
                    <Image source={item.image} style={styles.image} />
                    <Text style={{ textTransform: 'capitalize', marginBottom: 5, textAlign: 'center' }}>{item.productName}</Text>
                    <Text style={{ marginBottom: 5, textAlign: 'center' }}>{item.description}</Text>
                    <Text style={{ marginBottom: 5, textAlign: 'center' }}>Category : {item.category}</Text>
                    <Text style={{ marginBottom: 5, textAlign: 'center' }}>Sub-Category : {item.subCategory}</Text>
                    <Text style={{ marginBottom: 5, textAlign: 'center' }}>Ordered : {item.orderCount}</Text>
                    <Text style={{ marginBottom: 5, textAlign: 'center' }}>{item.specs}</Text>
                    <View
                        style={{
                            margin: 2,
                            borderBottomColor: '#000a1a',
                            borderBottomWidth: 5,
                        }}
                    />
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginLeft: 15, marginVertical: 7 }}>Order Id : {item.orderId}</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginLeft: 15, marginBottom: 7 }}>Order Date : {item.orderDate}</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginLeft: 15, marginBottom: 7 }}>Order Time : {item.orderTime}</Text>
                    <Text style={{ color: (item.deliveryStatus === 'Pending') ? 'orange' : ((item.deliveryStatus === 'Delivered') ? 'green' : 'red'), fontWeight: 'bold', fontSize: 18, marginLeft: 15, marginBottom: 7 }}>Status : {item.deliveryStatus}</Text>
                    <View
                        style={{
                            margin: 2,
                            borderBottomColor: '#000a1a',
                            borderBottomWidth: 5,
                        }}
                    />

                    <Text style={{ fontWeight: 'bold', marginVertical: 5, marginLeft: 15, color: 'black', fontSize: 20 }}>Delivery Address</Text>
                    <Text style={{ color: 'black', marginLeft: 15, marginBottom: 3 }}>{item.address.name}  |  {item.address.mobile}</Text>
                    <Text style={{ color: 'gray', marginLeft: 15, marginBottom: 3 }}>{item.address.addressLine1} , {item.address.addressLine2}</Text>
                    <Text style={{ color: 'gray', marginLeft: 15, marginBottom: 3 }}>{item.address.landmark} , {item.address.city} , {item.address.state} - {item.address.pincode}</Text>

                    <View
                        style={{
                            margin: 2,
                            borderBottomColor: '#000a1a',
                            borderBottomWidth: 5,
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ fontWeight: 'bold', marginVertical: 10, marginLeft: 15, color: 'black', fontSize: 20 }}>Order Price</Text>
                        <Text style={{ color: 'gray', marginLeft: 15, marginVertical: 10, fontSize: 20 }}>₹ {item.finalPrice}</Text>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor:'#a6b8ca'
    },
    image: {
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});
