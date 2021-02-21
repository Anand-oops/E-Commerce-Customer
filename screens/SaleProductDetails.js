import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Firebase from '../firebaseConfig';
import { AuthContext } from '../navigation/AuthProvider';
import { useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
import StarRating from "react-native-star-rating";

export default function SaleProductDetails(props) {

    const { user } = useContext(AuthContext);
    const product = props.route.params.product;
    const [check, setCheck] = useState(true);
    const [check2, setCheck2] = useState(true);
    const [check3, setCheck3] = useState(true);
    const [item, setItem] = useState([])
    const [images, setImages] = useState([])
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);

    Firebase.database().ref(`ProductList/${product.category}/${product.subCategory}/${product.productKey}`).on('value',(data) => {
        if (check) {
            if (data.val()) {
                setItem(data.val())
                setImages(data.val().images)
            }
            setCheck(false);
        }
    })

    Firebase.database().ref(`Customers/${user.uid}`).on('value', (data) => {
        if (check2) {
            if (data.val()) {

                if (data.val().wishlist) {
                    setWishlistItems(data.val().wishlist);
                }
                if (data.val().cart) {
                    setCart(data.val().cart);
                }
            }
            setCheck2(false);
        }

    })
    Firebase.database().ref(`ProductList/${product.category}/${product.subCategory}/${product.key}/Reviews`).on('value', (data) => {
        if (check3) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                var temp = [];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    temp.push(data.val()[key]);
                }
                setReviews(temp);
                console.log("data2", reviews);
            }
            setCheck3(false);
        }

    })

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

    const addToCart = (item) => {
        console.log('add to cart ', item);
        var list = [...cartItems];

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
            setCart(list);
            Firebase.database().ref(`Customers/${user.uid}/cart`).set(list).then(() => {
                Toast.show("Added to Cart", Toast.SHORT);
            })
        }
    }

    return (
        <ScrollView style={styles.screen}>
                <View style={styles.display}>
                    <View style={styles.imageContainer}>
                        <SliderBox
                            images={images}
                            sliderBoxHeight={375}
                            circleLoop={true}
                            resizeMode={'contain'} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textTransform: 'uppercase', fontSize: 18, fontWeight: 'bold', paddingBottom: 4 }}>{item.productName}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#2f4f4f', fontSize: 15, marginRight: 6, fontWeight: 'bold' }}>{"₹" + parseFloat(item.salePrice).toFixed(2)}</Text>
                                <Text style={{ color: 'grey', fontSize: 15, marginRight: 6, textDecorationLine: 'line-through' }}>{"₹" + parseFloat(item.productPrice).toFixed(2)}</Text>
                                <Text style={{ color: '#ff4500', fontSize: 15, marginRight: 6 }}>{"(" + item.saleDiscount + " OFF)"}</Text>
                            </View>
                            <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold' }}>{"inclusive of all taxes"}</Text>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={item.rating}
                                starSize={30}
                                fullStarColor={'#ffa500'}
                                emptyStarColor={'#ff4500'}
                            />
                            <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold' }}>{"  (" + item.rating + " out of 5)"}</Text>
                            <Text style={{ fontSize: 12, color: 'orange', fontWeight: 'bold' }}>{'Hurry!! Only ' + item.stocks + ' left.'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ marginLeft: 7, fontSize: 18, color: '#2f4f4f', fontWeight: 'bold' }}>Product Details:</Text>
                        <Text style={{ marginLeft: 7, color: "grey", marginBottom: 5 }}>{item.description}</Text>

                        <Text style={{ fontSize: 18, marginLeft: 7, color: '#2f4f4f', fontWeight: 'bold' }}>Product Specifications:</Text>
                        <Text style={{ fontSize: 16, marginLeft: 7, marginBottom: 5, color: 'grey' }}>{item.specs}</Text>
                        
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <TouchableOpacity style={{ flex: 1, margin: 5, flexDirection: 'row', padding: 10, elevation: 10, borderRadius: 4, backgroundColor: 'white', alignItems: 'center', }}
                                onPress={() => { addToWishlist(item) }}>
                                <AntDesign name="hearto" size={20} color="grey" />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>WISHLIST</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, padding: 10, flexDirection: 'row', margin: 5, elevation: 10, borderRadius: 4, backgroundColor: '#dc143c', alignItems: 'center', borderColor: 'gray' }}
                                onPress={() => { addToCart(item) }}>
                                <FontAwesome name="shopping-bag" size={20} color="white" />
                                <Text style={{ fontSize: 15, color: 'white', fontStyle: 'italic', marginLeft: 10 }}>ADD TO CART</Text>
                            </TouchableOpacity>
                        </View>
                    </View>




                </View>
                <View style={styles.body}>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ marginLeft: 7, fontSize: 18, color: '#2f4f4f', fontWeight: 'bold' }}>Reviews:</Text>
                        <FlatList
                            data={reviews}
                            renderItem={({ item }) => (
                                <View style={{ margin: 4 }}>
                                    <View style={{ flexDirection: 'row', padding: 8 }}>
                                        <Entypo name="user" size={20} color="black" />
                                        <Text style={{ flex: 1, paddingHorizontal: 8, fontWeight: 'bold' }}>{item.revTitle}</Text>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={item.revRating}
                                            starSize={20}
                                            fullStarColor={'#ffa500'}
                                            emptyStarColor={'#ff4500'}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            margin: 2,
                                            borderBottomColor: 'grey',
                                            borderBottomWidth: 1,
                                        }}
                                    />
                                    <Text style={{ margin: 4 }}>{item.revDesc}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#a6b8ca',
        flex: 1,
    },

    display: {
        borderBottomWidth: 10,
        borderBottomColor: '#000a1a',
        paddingHorizontal: 10,
        paddingBottom: 10

    },

    descriptionContainer: {
        borderBottomWidth: 10,
        borderBottomColor: '#000a1a',
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
        height: 375,
    },
});