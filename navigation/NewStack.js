import {createStackNavigator} from 'react-navigation-stack';
import Header from '../shared/Header';
import React from 'react';
import NewScreen from '../screens/NewScreen';
import { useState } from "react";

const screens = {
    NewScreen:{  screen:NewScreen,
                 params:{kay:'key'},
                 navigationOptions: (props)=>{
                     console.log('dede bhaiiiiiii',props)
        return {
            
                headerTitle:()=><Header navigation={props.navigation} title='stack'/>,        
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
console.log("namhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhe",newStack);
export default newStack;

// const Stack=createStackNavigator();

// export default function NewStack({navigation}) {
    
//     console.log("name",navigation.getParam('name'));
//     return(
        
// <Stack.Navigator>
//     <Stack.Screen  
//     name='vh'
//     component={NewScreen} 
//     options={{
//         headerTitle:()=><Header  navigation={navigation} title={navigation.getParam('name')}/>
//     }}

//     />
// </Stack.Navigator>


//     );
// }