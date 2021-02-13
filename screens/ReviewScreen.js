import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Firebase from "../firebaseConfig";

export default function ReviewScreen(props) {


    const item = props.route.params.item;
    const giveReview = (item) => {
        console.log("clicked");
        props.navigation.navigate('WriteReview', { item: item });
    }
    const getInfo = (item) => {
        console.log("clicked");
        props.navigation.navigate('OrderDetails', { item: item });
    }

    const changeStatus = () => {
        Firebase.database().ref(`CustomerOrders/${item.dealerId}/${item.orderId}`).update({ deliveryStatus: 'Cancelled' });
        Firebase.database().ref(`Customers/${item.customer.customerId}/Orders/${item.orderId}`).update({ deliveryStatus: 'Cancelled' });
        props.navigation.navigate('YourOrders');
    }

    return (
        <ScrollView>
            <View style={styles.main}>
                <TouchableOpacity >
                    <View style={{ margin: 4, borderColor: 'white', borderRadius: 1, elevation: 1, flexDirection: 'row' }}>
                        <View style={{ borderColor: 'white', borderRadius: 1, elevation: 1, flex: 1 }}>
                            <Image
                                style={{ padding: 2, height: 150, width: '98%', resizeMode: 'stretch', alignSelf: 'center', }}
                                source={{ uri: item.image.uri }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#3b3a30', fontSize: 20, padding: 4, textTransform: 'capitalize' }}>{item.productName}</Text>
                            <Text style={{ color: 'black', fontSize: 10, paddingLeft: 4 }}>{item.description}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'green', fontSize: 14, padding: 2, }}>{"₹" + item.finalPrice}</Text>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 5,
                    }}
                />

                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4 }}>How's your item ?</Text>
                    <View style={{ borderRadius: 1, elevation: 1, padding: 2, margin: 10, height: 40, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', opacity: (item.deliveryStatus === 'Pending') ? 0.2 : 1 }}
                            onPress={() => {
                                // if (item.deliveryStatus != 'Pending')      //Uncomment This
                                giveReview(item)
                            }}>
                            <Text style={{ fontSize: 15, marginHorizontal: 8, flex: 1 }}>Give Review</Text>
                            <View style={{ alignSelf: 'center', marginHorizontal: 4 }}>
                                <AntDesign name="right" size={15} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 5,
                    }}
                />
                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4 }}>Order Info</Text>
                    <View style={{ borderRadius: 1, elevation: 1, padding: 2, margin: 10, height: 40, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>{getInfo(item)}}>
                            <Text style={{ fontSize: 15, marginHorizontal: 8, flex: 1 }}>Order Info</Text>
                            <View style={{ alignSelf: 'center', marginHorizontal: 4 }}>
                                <AntDesign name="right" size={15} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ borderRadius: 1, elevation: 1, padding: 2, margin: 10, height: 40, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, marginHorizontal: 8, flex: 1 }}>Download Invoice</Text>
                            <View style={{ alignSelf: 'center', marginHorizontal: 4 }}>
                                <AntDesign name="right" size={15} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View> */}

                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 5,
                    }}
                />

                <TouchableOpacity style={{
                    elevation: 1, padding: 2, margin: 10, height: 40, width: 250,
                    justifyContent: 'center', alignSelf: 'center', borderRadius: 10,
                    shadowOpacity:'transparent',
                    shadowColor:'white',
                    backgroundColor: (item.deliveryStatus === 'Pending') ? 'orange' : 'transparent', opacity: (item.deliveryStatus === 'Cancelled' || item.deliveryStatus === 'Delivered') ? 0.5 : 1
                }}
                    onPress={() => {
                        if (item.deliveryStatus === 'Pending')
                            Alert.alert("Cancel Order ?", "Your order will be cancelled !",
                                [
                                    { text: 'Cancel' },
                                    { text: 'Proceed', onPress: () => changeStatus() },
                                ])
                    }}>
                    <Text style={{ fontSize: 15, color: 'white', textAlign: 'center' }}>
                        Cancel Order</Text>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },


});
