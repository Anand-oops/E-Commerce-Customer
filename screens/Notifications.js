import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity ,ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import Firebase from '../firebaseConfig';
import { AuthContext } from '../navigation/AuthProvider';
import Toast from 'react-native-simple-toast';
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from '@expo/vector-icons';


const NotificationsScreen=(props)=> {

    const [listen, setListen] = useState(true)
    const [notif, setNotif] = useState([])
    const { user } = useContext(AuthContext);
    
    Firebase.database().ref(`Customers/${user.uid}/Notifications`).on('value', data => {
        if (listen) {
            if (data.val()) {
                var list = [];
                var keys = Object.keys(data.val());
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    
                        list.push(data.val()[key])
                }
                setOrders(list.reverse());
                
            } else
                Toast.show("No Notifications", Toast.SHORT);
            setListen(false);
            
        }
    });


    return (
        <View style={styles.main}>
<Text>Notifications screen</Text>
            {/* <FlatList data={notif}
                keyExtractor={(item) => item.orderId}
                renderItem={(data) => (
                    <TouchableOpacity style={styles.listContainer} onPress={() => pressHandler(data.index)}>
                        <Image source={data.item.image} style={styles.listimage} />
                        <View >
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Order Id: {data.item.orderId}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Id: {data.item.customer.customerId}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Customer Name : {(data.item.customer.customerName != 'undefined undefined') ? data.item.customer.customerName : "No name provided"}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Order Date: {data.item.orderDate}</Text>
                            <Collapsible collapsed={searchedColl[data.index]}>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Product : {data.item.productName}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Price: {data.item.finalPrice}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Delivered At: {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'space-around', marginTop: 5 }}
                                    onPress={() => {
                                        Alert.alert("Delivered ?", "Product will be marked Delivered !",
                                            [{ text: 'Cancel' },
                                            { text: 'Proceed', onPress: () => changeStatus(data.item) }])
                                    }}>
                                    <Text style={{ color: 'red' }}>Mark as Delivered</Text>
                                    <MaterialCommunityIcons style={{ marginLeft: 20 }} name="truck-delivery-outline" size={24} color="red" />
                                </TouchableOpacity>
                            </Collapsible>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                            onPress={() => props.navigation.navigate('OrderDetails', { item: data.item })}>
                            <AntDesign name="doubleright" size={30} color='#000a1a' />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )} />
                <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator

                    size='large'
                    color="#000a1a"
                    animating={loader}

                />
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor:'#a6b8ca'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#000a1a',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 40,
        marginHorizontal: 10,
    },
});


const Stack = createStackNavigator();

export default function Notifications({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="Notifications" component={NotificationsScreen} options={{
			title: 'Notifications',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Notifications</Text>
					</View>
				</View>
			),
		}} />

	</Stack.Navigator>
)

}
