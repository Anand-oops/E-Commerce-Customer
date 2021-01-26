import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/Header';
import SaleProductDetails from '../screens/SaleProductDetails'
import React from 'react';
import HomeScreen from '../screens/HomeScreen';

export default function AppStack() {
    const AppStack = createStackNavigator();

    return (
        <AppStack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <AppStack.Screen name={"Home"} component={HomeScreen} options={{
                title: "Home",
                headerStyle: {
                    backgroundColor: 'black'
                },
                headerTitle: () => <Header navigation={navigation} title={"Home"} />
            }} />

            <AppStack.Screen name={"SaleProductDetails"} component={SaleProductDetails} options={{
                title: "Details",
                headerStyle: {
                    backgroundColor: 'black'
                },
                headerTitle: () => <Header navigation={navigation} title={"Details"} />
            }}/>

        </AppStack.Navigator>
    )
}