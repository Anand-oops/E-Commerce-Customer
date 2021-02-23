import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Firebase from "../firebaseConfig";
import { AuthContext } from './AuthProvider'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, SafeAreaView, Text, ScrollView, Alert, Image } from 'react-native';
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ShopByCategory from '../screens/ShopByCategory';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SaleProductDetails from '../screens/SaleProductDetails';
import NewScreen from '../screens/NewScreen';
import WishList from "../screens/WishList";
import Cart from "../screens/Cart";
import ProceedToBuy from "../screens/ProceedToBuy";
import YourOrders from "../screens/YourOrders";
import OrderPlacingScreen from '../screens/OrderPlacingScreen'
import ReviewScreen from '../screens/ReviewScreen';
import WriteReview from '../screens/WriteReview';
import ProfileDisplayScreen from '../screens/ProfileDisplayScreen'
import ChangeEmailScreen from '../screens/ChangeEmailScreen'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import OrderDetails from "../screens/OrderDetails";
import dummyImage from "../assets/avatar.png";
import { Icon, withBadge } from 'react-native-elements';
import Notifications from "../screens/Notifications";
import { ToastAndroid } from 'react-native';

function DrawerContent(props) {

    const { user, logout } = useContext(AuthContext);
    var name = "User";
    var profileImage = Image.resolveAssetSource(dummyImage).uri;
    const ref = Firebase.database().ref(`Customers/${user.uid}`);
    ref.on('value', function (snapshot) {
        var data = snapshot.val();

        if (data.firstName) {
            name = data.firstName;
        }

        if (data.profileImage) {
            profileImage = data.profileImage;
        }
    })
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Profile') }}>
                <View style={{ flexDirection: 'row', height: 100, backgroundColor: '#778899', alignItems: 'center', padding: 15, paddingTop: 20 }}>
                    <Image style={{
                        width: 60,
                        height: 60,
                        borderRadius: 63,
                        borderWidth: 4,
                        borderColor: "white",
                        marginTop: 10,
                    }}
                        source={{ uri: profileImage }} />

                    <Text style={{ marginTop: 10, fontSize: 20 }}> {"Hey " + name + "!!"}</Text>
                </View>
            </TouchableOpacity>

            <ScrollView>
                <DrawerItemList  {...props} />
            </ScrollView>
            <TouchableOpacity
            style={{ flexDirection:'row' ,width: '100%', backgroundColor: '#778899', height: 50, paddingTop: 10 }}
            onPress={() => {
                Alert.alert("Logout", "You will be logged out...",
                    [
                        { text: "Cancel" },
                        { text: "Proceed", onPress: () => logout() }
                    ], { cancelable: false }
                );
            }} >
                <MaterialCommunityIcons name='logout' size={25} style={{paddingLeft:10}}/>
                <Text
                    style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center',flex:1}}
                    >
                    SIGN OUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default function Drawer() {
    
    const { user } = useContext(AuthContext);
    const DrawerNav = createDrawerNavigator();
    const Stack = createStackNavigator();

    const HomeStackScreen = ({ navigation }) => (
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'HomeScreen',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Home</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />

            <Stack.Screen name="SaleProductDetails" component={SaleProductDetails} options={{
                title: 'SaleProductDetails',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Details</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />

                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />

        </Stack.Navigator>
    );

    const ProfileStackScreen = ({ navigation }) => (
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="ProfileDisplay" component={ProfileDisplayScreen} options={{
                title: 'Profile',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Profile</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                ),
            }} />

            <Stack.Screen name="Edit Profile" component={ProfileScreen} options={{
                title: 'Edit Profile',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Edit Profile</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                ),
            }} />

            <Stack.Screen name="Change Email" component={ChangeEmailScreen} options={{
                title: 'Change Email',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Change Email</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                ),
            }} />

            <Stack.Screen name="Change Password" component={ChangePasswordScreen} options={{
                title: 'Change Password',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Change Password</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                ),
            }} />

        </Stack.Navigator>
    );
    const WishListStackScreen = ({ navigation }) => (
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="WishList" component={WishList} options={{
                title: 'WishList',
                headerStyle: {
                    backgroundColor: '#223240',
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Wishlist</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )

            }} />
            <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{
                title: "Details",
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Details</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />



        </Stack.Navigator>
    );
    const CartStackScreen = ({ navigation }) => (
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'


            },
        }}>
            <Stack.Screen name="Cart" component={Cart} options={{
                title: 'Cart',
                headerStyle: {
                    backgroundColor: '#223240',
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Cart</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )

            }} />

            <Stack.Screen name="ProceedToBuy" component={ProceedToBuy} options={{
                title: 'Proceed to Buy',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Add Address</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />

            <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{
                title: "Details",
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Details</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />

            <Stack.Screen name="OrderPlacingScreen" component={OrderPlacingScreen} options={{
                title: "Place Order",
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Place Order</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />

        </Stack.Navigator>
    );
    const YourOrdersStack = ({ navigation }) => (
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="YourOrders" component={YourOrders} options={{
                title: 'Your Orders',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Your Orders</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />
            <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{
                title: 'Your Order Details',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Your Orders</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />
            <Stack.Screen name="WriteReview" component={WriteReview} options={{
                title: 'Review',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Review</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} options={{
                title: 'Order Details',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Order Details</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                            console.log("wishlist open");
                            navigation.navigate('WishList');
                        }}>
                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                            console.log("cart open");
                            navigation.navigate('Cart');
                        }}>
                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                        </TouchableOpacity>

                    </View>
                )
            }} />


        </Stack.Navigator>
    );

    const fixedItems = [
        <DrawerNav.Screen name="Home" component={HomeStackScreen}

            options={{
                title: 'Home',
            }}
        />,
        <DrawerNav.Screen name="Profile" component={ProfileStackScreen}

            options={{
                title: 'Profile',
            }}
        />,
        <DrawerNav.Screen name="WishList" component={WishListStackScreen}

            options={{
                title: 'Your WishList',
            }}
        />,
        <DrawerNav.Screen name="Cart" component={CartStackScreen}

            options={{
                title: 'Your Cart',
            }}
        />,
        <DrawerNav.Screen name="Your Orders" component={YourOrdersStack}

            options={{
                title: 'Your Orders',
            }}
        />,
        <DrawerNav.Screen name="Notifications" component={Notifications}

            options={{
                title: 'Notifications',
            }}
        />
    ]

    const [drawerItems, setDrawerItems] = useState(fixedItems)
    const [cartCount, setCartCount] = useState(0);
    const [wishCount, setWishCount] = useState(0)
    const CartBadge = withBadge(cartCount)(Icon)
    const WishBadge = withBadge(wishCount)(Icon)

    useEffect(() => {
        Firebase.database().ref('DrawerItemsList').on('value', data => {
                var customerItems = fixedItems;
                if (data.val()) {
                    var addedItems = [];
                    var list = data.val();
                    for (var index = 0; index < list.length; index++) {
                        if (addedItems.includes(list[index].itemName) === false)
                            addedItems.push(list[index].itemName)
                    }
                    if (addedItems.length != 0) {
    
                        addedItems.map((text) => {
    
                            customerItems.push(
                                <DrawerNav.Screen name={text} component={
    
                                    ({ navigation }) => (
    
                                        <Stack.Navigator screenOptions={{
                                            headerTintColor: 'white',
                                            headerTitleStyle: {
                                                fontWeight: 'bold',
                                                alignSelf: 'center'
                                            },
                                        }}>
    
                                            <Stack.Screen name={text} component={ShopByCategory} options={{
                                                title: text,
                                                headerStyle: {
                                                    backgroundColor: '#223240'
                                                },
                                                headerTitle: () => (
                                                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                                                        <View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>{text}</Text>
                                                        </View>
                                                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                                                            console.log("wishlist open");
                                                            navigation.navigate('WishList');
                                                        }}>
                                                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                                                        </TouchableOpacity>
    
                                                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                                                            console.log("cart open");
                                                            navigation.navigate('Cart');
                                                        }}>
                                                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                                                        </TouchableOpacity>
    
                                                    </View>
                                                )
                                            }} />
                                            <Stack.Screen name="NewScreen" component={NewScreen} options={{
                                                title: "Explore",
                                                headerStyle: {
                                                    backgroundColor: '#223240'
                                                },
                                                headerTitle: () => (
                                                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
    
                                                        <View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Explore</Text>
                                                        </View>
                                                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                                                            console.log("wishlist open");
                                                            navigation.navigate('WishList');
                                                        }}>
                                                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                                                        </TouchableOpacity>
    
                                                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                                                            console.log("cart open");
                                                            navigation.navigate('Cart');
                                                        }}>
                                                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                                                        </TouchableOpacity>
    
                                                    </View>
                                                )
                                            }} />
                                            <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{
                                                title: "Details",
                                                headerStyle: {
                                                    backgroundColor: '#223240'
                                                },
                                                headerTitle: () => (
                                                    <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
    
                                                        <View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Details</Text>
                                                        </View>
                                                        <TouchableOpacity style={{ position: 'absolute', right: 50 }} onPress={() => {
                                                            console.log("wishlist open");
                                                            navigation.navigate('WishList');
                                                        }}>
                                                            <WishBadge type='antdesign' name='heart' size={22} color='white' />
                                                        </TouchableOpacity>
    
                                                        <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={() => {
                                                            console.log("cart open");
                                                            navigation.navigate('Cart');
                                                        }}>
                                                            <CartBadge type='entypo' name='shopping-cart' size={24} color='white' />
                                                        </TouchableOpacity>
    
                                                    </View>
                                                )
                                            }} />
    
                                        </Stack.Navigator>
                                    )
                                }
                                    options={{
    
                                        drawerLabel: text,
                                        title: text,
                                    }}
                                />
                            )
                        });
                    }
                setDrawerItems(customerItems);
            }
        })
        checkLength();
    },[cartCount,wishCount])


    const checkLength = () => {
        Firebase.database().ref(`Customers/${user.uid}`).on('value', (data) => {
            if (data.val().cart) {
                setCartCount(data.val().cart.length)
            } else {
                setCartCount(0)
            }
            if (data.val().wishlist) {
                setWishCount(data.val().wishlist.length);
            } else {
                setWishCount(0);
            } 
        })
    }

    

    return (
        <DrawerNav.Navigator initialRouteName="HomeScreen" drawerContentOptions={{activeBackgroundColor: '#a6b8ca', activeTintColor: '#0001a1'}}
            drawerContent={props => <DrawerContent {...props} />} >
            {drawerItems}
        </DrawerNav.Navigator>
    );
}