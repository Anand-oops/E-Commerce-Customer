import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Firebase from "../firebaseConfig";
import { AuthContext } from './AuthProvider'
import { AntDesign } from '@expo/vector-icons';
import { View, TouchableOpacity, SafeAreaView, Text, ScrollView, Alert } from 'react-native';
import Header from '../shared/Header';
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ShopByCategory from '../screens/ShopByCategory';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SaleProductDetails from '../screens/SaleProductDetails';
import SubHeader from '../shared/SubHeader'
import NewScreen from '../screens/NewScreen';
import WishList from "../screens/WishList";
import Cart from "../screens/Cart";
import ProceedToBuy from "../screens/ProceedToBuy";
import YourOrders from "../screens/YourOrders";


const addedItems = [];
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
				backgroundColor: 'black'
			},
			headerTitle: () => <Header navigation={navigation} title="Home" />,
		}} />

		<Stack.Screen name="SaleProductDetails" component={SaleProductDetails} options={{
			title: 'SaleProductDetails',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => <SubHeader navigation={navigation} title="Product Details" />,
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
		<Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
			title: 'ProfileScreen',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => <Header navigation={navigation} title="Profile" />,
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
				backgroundColor: 'black',
			},
			// headerTitleAlign: 'center',
			headerTitle: () => <Header navigation={navigation} title="WishList" />,
			// headerLeft : () => (
			// 	<Icon.Button  name = 'ios-menu' size={30}
			// 	backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
			// ),



		}} />
		<Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{
			title: "Details",
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => <SubHeader navigation={navigation} title="Details" />
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
				backgroundColor: 'black',
			},
			// headerTitleAlign: 'center',
			headerTitle: () => <Header navigation={navigation} title="Cart" />,
			// headerLeft : () => (
			// 	<Icon.Button  name = 'ios-menu' size={30}
			// 	backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
			// ),



		}} />
		
		<Stack.Screen name="ProceedToBuy" component={ProceedToBuy} options={{
			title: 'Proceed to Buy',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => <SubHeader navigation={navigation} title="Proceed to Buy" />,
		}} />
		<Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{
			title: "Details",
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => <SubHeader navigation={navigation} title="Details" />
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
				backgroundColor: 'black'
			},
			headerTitle: () => <Header navigation={navigation} title="Your Orders" />,
		}} />

	</Stack.Navigator>
);

const customerItems = [
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
			// drawerLabel: () => null,
			//  title: null,
			//  drawerIcon: () => null
		}}
	/>,
	<DrawerNav.Screen name="Cart" component={CartStackScreen}

		options={{
			title: 'Your Cart',
			// drawerLabel: () => null,
			//  title: null,
			//  drawerIcon: () => null
		}}
	/>,
	<DrawerNav.Screen name="Your Orders" component={YourOrdersStack}

		options={{
			title: 'Your Orders',
			// drawerLabel: () => null,
			//  title: null,
			//  drawerIcon: () => null
		}}
	/>
];


function DrawerContent(props) {


	const { user, logout } = useContext(AuthContext);
	var name = "User"
	const ref = Firebase.database().ref(`Customers/${user.uid}`);
	ref.on('value', function (snapshot) {
		var data = snapshot.val();
		name = data.firstName;
	})
	return (
		<SafeAreaView style={{ flex: 1, }}>

			<View style={{ flexDirection: 'row', height: 100, backgroundColor: 'white', alignItems: 'center', marginTop: 10, paddingTop: 15, paddingLeft: 15 }}>
				<AntDesign name="user" size={40} color="black" />
				<Text style={{ marginTop: 10, fontSize: 20 }}> {"Hey " + name + "!!"}</Text>
			</View>

			<ScrollView>
				<DrawerItemList  {...props} />
			</ScrollView>
			<TouchableOpacity >
				<Text
					style={{ width: '100%', backgroundColor: '#eee', color: 'black', fontSize: 20, fontWeight: 'bold', height: 50, textAlign: 'center', paddingTop: 10 }}
					onPress={() => {
						Alert.alert("Logout", "You will be logged out...",
							[
								{ text: "Cancel" },
								{ text: "Proceed", onPress: () => logout() }
							], { cancelable: false }
						);
					}}>
					SIGN OUT</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}


export default class DrawerNew extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			arr: [],
		};
	}

	componentDidMount() {
		this._isMounted = true;
		Firebase.database().ref('/DrawerItemsList').once('value', (data) => {
			if (this._isMounted) {
				if (data.val()) {
					this.setState({
						arr: data.val(),
					});
					for (var index = 0; index < this.state.arr.length; index++) {
						if (this.state.arr[index] != null && addedItems.includes(this.state.arr[index].itemName) == false)
							addedItems.push(this.state.arr[index].itemName)
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
													backgroundColor: 'black'
												},
												headerTitle: () => <Header navigation={navigation} title={text} />
											}} />
											<Stack.Screen name="NewScreen" component={NewScreen} options={{
												title: "Explore",
												headerStyle: {
													backgroundColor: 'black'
												},
												headerTitle: () => <SubHeader navigation={navigation} title="Explore" />
											}} />
											<Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{
												title: "Details",
												headerStyle: {
													backgroundColor: 'black'
												},
												headerTitle: () => <SubHeader navigation={navigation} title="Details" />
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

				}
			}
		}
		);

	}
	componentWillUnmount() {
		console.log("Unmount")
		this._isMounted = false;
	}


	render() {
		return (
			<DrawerNav.Navigator initialRouteName="HomeScreen" drawerContentOptions={{ activeBackgroundColor: '#fff', activeTintColor: '#ff788f' }}
				drawerContent={props => <DrawerContent {...props} />} >
				{customerItems}
			</DrawerNav.Navigator>
		);

	}
}