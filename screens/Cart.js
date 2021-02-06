import React from 'react';
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";
import Counter from "react-native-counters";
import Toast from 'react-native-simple-toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CheckBox } from 'react-native-elements'

export default function Cart(props) {

    const { user } = useContext(AuthContext);
    const [sumTotalPrice, setSumTotal] = useState(0);
    const [sumFinalPrice, setFinalTotal] = useState(0);
    const [listen, setListen] = useState(true);
    const [items, setItem] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [addresses, setAddresses] = useState([])
    const [addressIndex, setAddressIndex] = useState(0)
    const [addressCall , setAddressCall] = useState(true)

    const addressRBSheet = useRef();

    Firebase.database().ref(`Customers/${user.uid}`).on('value', (data) => {
        if (listen) {
            if (data.val().cart) {
                var temp = [];
                var keys = Object.keys(data.val().cart);
                console.log('keys', keys);

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val().cart[key])
                }
                setItem(temp);

                var sumProductPrice = 0;
                var sumFinalPrice = 0;
                for (var i = 0; i < temp.length; i++) {
                    sumProductPrice += temp[i].productPrice;
                    sumFinalPrice += temp[i].finalPrice;
                }
                setSumTotal(sumProductPrice);
                setFinalTotal(sumFinalPrice);
            }
            if (data.val().wishlist) {
                setWishlistItems(data.val().wishlist);
            }
            setListen(false);
        }

    })

    // Firebase.database().ref(`Customers/${user.uid}/cart`).on('child_added', function () {
    //     console.log("Cart Child Changed")
    //     setListen(true);
    // })

    Firebase.database().ref(`Customers/${user.uid}/Address`).once('value', data => {
        if(addressCall){
            if (data.val()) {
                var keys = Object.keys(data.val())
                var list = [];
                for(var i =0;i<keys.length;i++){
                    var key = keys[i];
                    list.push(data.val()[key])
                }
                console.log("List",list)
                setAddresses(list);
                setAddressCall(false)
            }
        }
    })

    const itemsPress = (item) => {
        console.log("clicked");
        props.navigation.navigate('ProductDetailsScreen', { item: item });
    }
    const ButtonPress = () => {
        console.log('proceed to buy');
        addressRBSheet.current.open();
        setAddressCall(true)
    }

    function DeleteItem(index) {
        console.log("deleted", index);
        const newArray = items;
        newArray.splice(index, 1);
        setItem(newArray);
        Firebase.database().ref(`Customers/${user.uid}/cart`).set(newArray).then(() => {
            Toast.show("Deleted", Toast.SHORT);
        })

    }
    const addToWishlist = (item) => {
        var list = [...wishlistItems]
        console.log("add to wishlist");

        var present = false;

        for (var i = 0; i < list.length; i++) {
            if (list[i].key == item.key) {
                present = true;
                break;
            }
        }
        if (present) {
            Toast.show("Already added !! ", Toast.SHORT);
        } else {
            list.push(item);
            setWishlistItems(list);
            console.log('items', wishlistItems);
            Firebase.database().ref(`Customers/${user.uid}/wishlist`).set(list).then(() => {
                Toast.show("Added to WishList", Toast.SHORT);
            })
        }

    }

    return (
        <ScrollView>
            <View style={styles.main}>


                <FlatList style={{ padding: 4 }}
                    data={items}

                    renderItem={({ item }) => (
                        <View style={{ flex: 1, margin: 2 }}>
                            <View style={{ borderRadius: 1, elevation: 1, }}>
                                <TouchableOpacity onPress={() => itemsPress(item)}>
                                    <View style={{ margin: 4, borderColor: 'white', borderRadius: 1, elevation: 1, flexDirection: 'row' }}>
                                        <View style={{ borderColor: 'white', borderRadius: 1, elevation: 1, flex: 1 }}>
                                            <Image
                                                style={{ padding: 2, height: 100, width: '98%', resizeMode: 'stretch', alignSelf: 'center', }}
                                                source={{ uri: item.image.uri }}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: '#3b3a30', fontSize: 20, padding: 4, textTransform: 'capitalize' }}>{item.productName}</Text>
                                            <Text style={{ color: 'black', fontSize: 10, paddingLeft: 4 }}>{item.description}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'green', fontSize: 14, padding: 2, }}>{"₹" + item.finalPrice}</Text>
                                                {/* <Text style={{ color: 'grey', fontSize: 14, padding: 2, textDecorationLine: 'line-through' }}>{"₹" + item.productPrice}</Text>
                                        <Text style={{ color: '#82b74b', fontSize: 14, padding: 2, }}>{item.discount + "off "}</Text> */}
                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <View style={{ margin: 4 }}>
                                    <Counter onChange={value => console.log(value)} />
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ flex: 1, margin: 5, flexDirection: 'row', padding: 10, elevation: 10, borderRadius: 4, backgroundColor: 'white', alignItems: 'center', }}
                                        onPress={() => {
                                            Alert.alert("Delete", "Are you sure ?",
                                                [
                                                    { text: "No" },
                                                    { text: "Yes", onPress: () => DeleteItem(items.indexOf(item)) }
                                                ], { cancelable: false }
                                            );
                                        }}>

                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, margin: 5, flexDirection: 'row', padding: 10, elevation: 10, borderRadius: 4, backgroundColor: 'white', alignItems: 'center', }}
                                        onPress={() => addToWishlist(item)}>

                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Move to WishList</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}>

                </FlatList>
                <View style={{ margin: 4, borderRadius: 1, elevation: 1 }}>
                    <Text style={{ margin: 2, fontWeight: 'bold' }}>PRICE DETAILS :</Text>
                    <View
                        style={{
                            margin: 2,
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                        }}
                    />
                    <View style={{ flexDirection: "row", margin: 2 }}>
                        <Text style={{ flex: 1 }}>TOTAL MRP </Text>
                        <Text>{sumTotalPrice}</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: 2 }}>
                        <Text style={{ flex: 1 }}>DISCOUNTED PRICE </Text>
                        <Text>{sumFinalPrice}</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: 2 }}>
                        <Text style={{ flex: 1 }}>ADDITIONAL CHARGES </Text>
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
                        <Text style={{ fontWeight: 'bold' }}>{sumFinalPrice}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => ButtonPress()}>
                    <View style={{ borderRadius: 3, elevation: 1, margin: 6, padding: 4, backgroundColor: '#f4a460', height: 40, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>PROCEED TO BUY</Text>
                    </View>
                </TouchableOpacity>

                <RBSheet
                    ref={addressRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={400}
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
                    <ScrollView >
                        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 5 }}>Select Address</Text>
                        
                        <FlatList data={addresses}
                            renderItem={data => (
                                <CheckBox
                                    title={data.item.name + '\n' + data.item.mobile + '\n' + data.item.addressLine1 + '\n' + data.item.addressLine2 + '\n' + data.item.city + ' , ' + data.item.state + '  ' + data.item.pincode}
                                    checked={(data.index === addressIndex) ? true : false}
                                    onPress={() => { setAddressIndex(data.index) }}
                                />
                            )}
                        />
                        <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, backgroundColor: 'black', alignSelf: 'center', width: 150, justifyContent: 'center',margin:10 }}
                            onPress={() => { setAddressCall(true), addressRBSheet.current.close(), props.navigation.navigate('ProceedToBuy') }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>Add New</Text>
                        </TouchableOpacity>

                    </ScrollView>
                    <TouchableOpacity style={styles.filterButton} onPress={() => {
                        Toast.show("Proceed", Toast.SHORT);
                        props.navigation.navigate('OrderPlacingScreen',{address: addresses[addressIndex] , items : items})
                        addressRBSheet.current.close()
                    }}>
                        <Text style={{ color: 'white' }} >Proceed</Text>
                    </TouchableOpacity>
                </RBSheet>
            </View>
        </ScrollView>
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
    filterButton: {
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
