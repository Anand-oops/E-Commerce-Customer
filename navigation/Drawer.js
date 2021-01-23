import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { useContext } from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import AppStack from './AppStack';
import profileStack from './ProfileStack';
import NewStack from "./NewStack";
import NewScreen from "../screens/NewScreen";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from './AuthProvider';
import Firebase from '../firebaseConfig';
import React from "react";
import { View, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState } from 'react';


const customComponent = (props) => {

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

<<<<<<< HEAD
            <ScrollView>
                <DrawerItems  {...props} />
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

const delay = ms => new Promise(res => setTimeout(res,ms));
const getScreens = () => {
    const screens = {
        Home: { screen: AppStack },
        Profile: { screen: profileStack },
    }

    Firebase.database().ref('DrawerItemsList').on('value', (data) => {
        if (data.val()) {
            let list = data.val();
            for (var i = 0; i < list.length; i++) {
                screens[list[i].itemName] = { screen: NewStack };
            }
        }
    })
    
    //console.log("AddedScreens",addedScreens)
    console.log("Screens",screens)
    //console.length("Added",addedScreens)
    return screens;
}

const RootNavigationDrawer = createDrawerNavigator(getScreens(), { contentComponent: customComponent });
=======
    Home: { screen: AppStack ,params:{name:'Home'} },
    Profile: { screen: profileStack, params:{name:'Profile'} }, 
}

var length=0;
var list ;
Firebase.database().ref('DrawerItemsList').on('value',(data)=>{
    list=data.val();
    console.log("value",list);
    length = list.length;
    console.log("length",length);
    
})
const Stack=createStackNavigator();

for(var i=0;i<length;i++){
    var name=list[i].itemName;
    console.log('bsjk',name);
    screens[" "+list[i].itemName]={screen:()=>(

        <Stack.Navigator>
            <Stack.Screen name={name} component={NewScreen}/>
        </Stack.Navigator>
    ) ,params:{name :list[i].itemName}};
    console.log("screennnnnnnnnns",screens);
}


const RootNavigationDrawer = createDrawerNavigator(screens, { contentComponent: customComponent });
>>>>>>> 2be84e2a72b157cc0a12ab814425f9a16b23c41c

export default createAppContainer(RootNavigationDrawer);