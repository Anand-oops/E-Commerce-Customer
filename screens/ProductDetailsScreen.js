import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { AuthContext } from '../navigation/AuthProvider';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import Firebase from '../firebaseConfig';
import Toast from 'react-native-simple-toast';
import StarRating from "react-native-star-rating";
import { Entypo } from '@expo/vector-icons';

export default function ProductDetailsScreen(props) {

    const { user } = useContext(AuthContext);
    const item = props.route.params.item;
    const [check, setcheck] = useState(true);
    const [check2, setcheck2] = useState(true);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);

    Firebase.database().ref(`Customers/${user.uid}`).on('value', (data) => {
        if (check) {
            if (data.val()) {

                if (data.val().wishlist) {
                    setWishlistItems(data.val().wishlist);
                }
                if (data.val().cart) {
                    setCart(data.val().cart);
                }
                setcheck(false);
            }
        }

    })
    Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}/Reviews`).on('value', (data) => {
        if (check2) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                var temp = [];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    temp.push(data.val()[key]);
                }
                setReviews(temp);
                setcheck2(false);
            }
        }

    })

    const addToWishlist = (item) => {
        var list = [...wishlistItems]
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
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.display}>
                    <View style={styles.imageContainer}>
                        <SliderBox
                            images={item.images}
                            sliderBoxHeight={375}
                            circleLoop={true}
                            resizeMode={'contain'} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textTransform: 'uppercase', fontSize: 18, fontWeight: 'bold', paddingBottom: 4 }}>{item.productName}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#2f4f4f', fontSize: 15, marginRight: 6, fontWeight: 'bold' }}>{"₹" + item.finalPrice}</Text>
                                <Text style={{ color: 'grey', fontSize: 15, marginRight: 6, textDecorationLine: 'line-through' }}>{"₹" + item.productPrice}</Text>
                                <Text style={{ color: '#ff4500', fontSize: 15, marginRight: 6 }}>{"(" + item.discount + " OFF)"}</Text>
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


        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    display: {
        borderBottomWidth: 10,
        borderBottomColor: '#D0D0D0',
        paddingHorizontal: 10,
        paddingBottom: 10

    },

    descriptionContainer: {
        borderBottomWidth: 10,
        borderBottomColor: '#D0D0D0',
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
        height: 375,
    },

    productlink: {
        color: 'blue',
        paddingLeft: 20,
        fontSize: 18,
        marginVertical: 10
    },

    mainImage: {
        flex: 1,
        resizeMode: 'contain',
        width: 300,
        height: 450,
    },

    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 0,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 100,
        borderWidth: 0.2,
        elevation: 1,
    },

    icon: {
        height: 30,
        width: 30,
    },

    strike: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: 16,
        marginVertical: 5,
    },

    price: {
        color: 'red',
        fontSize: 24,
    },

    body: {
        flex: 1,
    },

    descriptionHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
    },

    description: {
        fontStyle: 'italic',
        fontSize: 18,
        marginVertical: 10,
        marginLeft: 30,
    },

    reviewContainer: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
    },

    modalContainer: {
        flex: 1,

        alignItems: 'center',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    item: {
        width: '50%',
        borderWidth: 1,
        padding: 10,
    },

    modalScreen: {
        height: 300,
        width: '90%',
        elevation: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    rating: {
        width: '70%',
        marginBottom: 10,
        alignItems: 'center',
    },

    ratingText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },

    rateProduct: {
        padding: 10,
        elevation: 2,
        borderWidth: 0.1,
    },

    review: {
        padding: 20,
        backgroundColor: '#FAFAFA'
    },

    link: {
        marginVertical: 20,
        color: 'blue',
        fontSize: 16,
    },

    text: {
        textTransform: 'uppercase',
        fontSize: 20,
    },

    comments: {
        paddingHorizontal: 10,
        padding: 10,
    },

    commentBox: {
        elevation: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },

    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
    },

    image: {
        height: 40,
        width: 40,
    },

    user: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

    starCotainer: {
        width: '20%',
        marginVertical: 10,
    },

    dateText: {
        marginLeft: 20,
        marginVertical: 10,
    },

    commentText: {
        marginVertical: 5,
        fontSize: 16,
    },

    textInputContainer: {
        marginVertical: 20,
        width: '100%',
    },

    textInput: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 1,
        borderColor: 'black',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 8,
        fontSize: 16,
    },
    saveButton: {
        flex: 1,
        padding: 10,
        elevation: 10,

        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center',
    },
});