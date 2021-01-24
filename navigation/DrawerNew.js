import React, { useEffect,useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import HomePage from "./AppStack";
import Profile from "./ProfileStack";
import{ AuthContext } from './AuthProvider';
import Firebase from "../firebaseConfig";
import {View,SafeAreaView, Text,  TouchableHighlight,Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';
import NewScreen from '../screens/NewScreen';

const addedItems =  [];
const DrawerNav = createDrawerNavigator();
const Stack = createStackNavigator();

const customerItems = [
  <DrawerNav.Screen name="Home" component={HomePage} 
        
        options={{
          title: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
        <DrawerNav.Screen name="Profile" component={Profile}
        
        options={{
          title: 'Profile',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
     
];


function DrawerContent (props)  {

    
    const { user, logout } = useContext(AuthContext);
    var name = "User"
    const ref = Firebase.database().ref(`Customers/${user.uid}`);
    ref.on('value', function (snapshot) {
        var data = snapshot.val();
        name = data.firstName;
    })
    return(
    <SafeAreaView style={{ flex: 1, }}>

        <View style={{ flexDirection:'row',height: 100, backgroundColor: 'white', alignItems: 'center',  marginTop: 10,paddingTop:15,paddingLeft:15 }}>
            <AntDesign name="user" size={40} color="black"  />
            <Text style={{ marginTop: 10,fontSize:20 }}> {"Hey " + name+ "!!"}</Text>
        </View>

        <ScrollView>
            <DrawerItems  {...props} />
        </ScrollView>
        <TouchableOpacity >
            <Text
                style={{ width:'100%',backgroundColor:'#eee',color: 'black', fontSize: 20, fontWeight: 'bold',height:50,textAlign:'center',paddingTop:10 }}
                onPress={() => {
                    Alert.alert("Logout", "You will be logged out...",
                    [
                        {text:"Cancel" },
                        {text:"Proceed", onPress: () => logout()}
                    ],{cancelable: false}
                    );
                } }>
                SIGN OUT</Text>
        </TouchableOpacity>
    </SafeAreaView>
)}


export default class DrawerNew extends React.Component
{
  _isMounted = false;
  constructor(props)
  {
    super(props);
    console.log('dsbhdbhsd');
    console.log('sssssssssss',addedItems);
    console.log('ddd',customerItems)
 
  }
   
  componentDidMount() {
      console.log('startted');
    this._isMounted = true;
    Firebase.database().ref('DrawerItemsList').once('value', (data) => {
        if (this._isMounted) {
            if (data.val()) {
               console.log('vaghdvg',data.val());
                for(var index=0;index<this.data.val().length;index++)
                {
                    addedItems.push(this.data.val()[index])
                }

                console.log("DrawerItems",addedItems);

              if(addedItems.length!=0)
              {

                     addedItems.map((text) => {
                  
                   customerItems.push (
                    <DrawerNav.Screen name={data.val()[index].itemName} component={


                      ({navigation}) =>(


  
                        <Stack.Navigator screenOptions={{
                            headerStyle: {
                                backgroundColor: '#ec2F4B',
                              },
                    
                              headerTintColor: '#fff',
                              headerTitleStyle: {
                                fontWeight: 'bold',
                                // alignSelf: 'center'
                               
                              },
                        }}>
                          
                            <Stack.Screen name={data.val()[index].itemName} component={NewScreen} options={{
                                title:text,
                                headerStyle: {
                                    backgroundColor: '#ec2F4B',
                                  },
                                headerTitleAlign: 'center',
                                headerLeft : () => (
                                    <Icon.Button  name = 'ios-menu' size={30}
                                    backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
                                ),
                                
                                headerRight : () => (
                                    
                                    <View style={styles.iconContainer}>
                                  <Icon.Button  name = 'md-search' size={30}
                                    backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('SearchBar')}></Icon.Button>
                             <Icon.Button  name = 'ios-cart' size={30}
                                    backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
                          </View>
                                ),
                    
                            }}/>
                    
                        </Stack.Navigator>
                    )

                    }
                
                                  options={{
                          
                                   drawerLabel:text,
                                    title:text,
                                    drawerIcon: ({color, size}) => (
                                      <Icon
                                        name="md-checkmark-circle-outline"
                                        size={size}
                                        color={color}
                                      />
                                  ),
                                    // gestureEnabled: false,
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
    this._isMounted = false;
}


  render()
  {      
       return(
         <DrawerNav.Navigator initialRouteName="Home" drawerContentOptions={{ activeBackgroundColor: '#fff', activeTintColor: '#ff788f' }} drawerContent={props => <DrawerContent {...props}/>} >
             {customerItems}
             
         </DrawerNav.Navigator>
       );
     
   
     
    
   

  }
}





const styles = StyleSheet.create({
    modalTextInput: {
        height: 40,
        width : 200,
        margin : 15,
        // padding: 5,
        // paddingLeft: 15,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        backgroundColor: 'white',
      textAlign:'center',
 },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 45,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 20,
        elevation: 2
      },
      textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight:'bold',
        
      },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    container: {
        flex: 1
      },
      icon: {
        paddingLeft: 10
      },
      iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 80
      },
      container: {
        alignItems: 'center',
    },

    headerContainer: {
        width: '90%',
        marginTop: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
 icon: {
        height: 35,
        width: 35,
        paddingHorizontal: 10
    },

  });