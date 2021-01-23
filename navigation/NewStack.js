import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import NewScreen from '../screens/NewScreen';

const screens = {
    NewScreen:{  screen:NewScreen, navigationOptions: ({navigation})=>{
        console.log("Nav",navigation.getParam())
        return {
            
                headerTitle:()=><Header navigation={navigation} title='New Screen'/>,
            
        }
    } }
}

const newStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'black',height:70
        }
    }
});

export default newStack;