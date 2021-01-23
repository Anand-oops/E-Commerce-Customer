import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from "./AppStack";
import Profile from "./ProfileStack";
import{ AuthContext } from '../components/context';
import ProductList from './ProductList';
import Firebase from "../firebaseConfig";
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';


import {AsyncStorage, FlatList,View,  TouchableHighlight,Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';

const addedItems =  [];
const DrawerNav = createDrawerNavigator();
const Stack = createStackNavigator();
// const HomeStackScreen =({navigation}) =>(
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#ec2F4B',
//           },

//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
           
//           },
//     }}>
//         <Stack.Screen name="Home" component={Home} options={{
//             title:'Home',
//             headerStyle: {
//                 backgroundColor: '#ec2F4B',
//               },
//             headerTitleAlign: 'center',
//             headerLeft : () => (
//                 <Icon.Button  name = 'ios-menu' size={30}
//                 backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//             ),
            
//             headerRight : () => (
                                    
//               <View style={styles.iconContainer}>
//             <Icon.Button  name = 'md-search' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('SearchBar')}></Icon.Button>
//        <Icon.Button  name = 'ios-cart' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
//        </View>
//             ),

//         }}/>

//     </Stack.Navigator>
// );


// const CartScreenStackScreen =({navigation}) =>(
//     <Stack.Navigator
    
//     screenOptions={{
//         headerStyle: {
//             backgroundColor: '#ec2F4B',
//           },
//           gestureEnabled: false ,
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             alignSelf: 'center'
//           },
//     }}>


      
//         <Stack.Screen name="CartScreen" component={CartScreen} options={{
//             title:'CartScreen',
//             gestureEnabled: false,
//             headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//           headerTitleAlign: 'center',
//           // headerLeft : () => (
//           //     <Icon.Button  name = 'ios-menu' size={30}
//           //     backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//           // ),
//         }}/>

//     </Stack.Navigator>
// );


// const OrderScreenStackScreen =({navigation}) =>(
//   <Stack.Navigator
  
//   screenOptions={{
//       headerStyle: {
//           backgroundColor: '#ec2F4B',
//         },
//         gestureEnabled: false ,
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           alignSelf: 'center'
//         },
//   }}>


    
//       <Stack.Screen name="OrderScreen" component={OrderScreen} options={{
//           title:'OrderScreen',
//           gestureEnabled: false,
//       }}/>

//   </Stack.Navigator>
// );


// const SearchBarStackScreen =({navigation}) =>(
//     <Stack.Navigator screenOptions={{
//       headerShown:false,

//         // headerStyle: {
//         //     backgroundColor: '#ec2F4B',
//         //   },

//         //   headerTintColor: '#fff',
//         //   headerTitleStyle: {
//         //     fontWeight: 'bold',
//         //     alignSelf: 'center'
//         //   },
//         //   headerLeft : () => (
//         //     <Icon.Button  name = 'ios-arrow-round-back' size={30}
//         //     backgroundColor = '#ec2F4B' onPress={() => navigation.goBack()}></Icon.Button>
//         // ),
//     }}>
//         <Stack.Screen name="SearchBar" component={SearchBar1} options={{
//             title:'SearchBar',
//             headerTitleAlign: 'center',
//             header : null,
//         }}/>

//     </Stack.Navigator>
// );

// const OTPAuthStackScreen =({navigation}) =>(
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#ec2F4B',
//           },

//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             alignSelf: 'center'
//           },
//     }}>
//         <Stack.Screen name="OTPAuth" component={OTPAuth} options={{
//             title:'OTPAuth',
            
//         }}/>

//     </Stack.Navigator>
// );


// const AdminStackScreen =({navigation}) =>(
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#ec2F4B',
//           },

//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             alignSelf: 'center'
//           },
//     }}>
//         <Stack.Screen name="Admin" component={Admin} options={{
//             title:'Admin',
//             // headerShown: false,
//             headerStyle: {
//                 backgroundColor: '#ec2F4B',
//               },
//             headerTitleAlign: 'center',
//             headerLeft : () => (
//                 <Icon.Button  name = 'ios-menu' size={30}
//                 backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//             ),
//             headerRight : () => (
                
//               //     <View style={styles.iconContainer}>
//               //   <Icon.Button  name = 'md-search' size={30}
//               //     backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//            <Icon.Button  name = 'md-create' size={30}
//                   backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('AddItems')}></Icon.Button>
//       //   </View>
//               ),
//         }}/>

//     </Stack.Navigator>
// );


// const DealerStackScreen =({navigation}) =>(
//   <Stack.Navigator screenOptions={{
//       headerStyle: {
//           backgroundColor: '#ec2F4B',
//         },

//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           alignSelf: 'center'
//         },
//   }}>
//       <Stack.Screen name="Dealer" component={Dealer} options={{
//           title:'Dealer',
//           // headerShown: false,
//           headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//           headerTitleAlign: 'center',
//           headerLeft : () => (
//               <Icon.Button  name = 'ios-menu' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//           ),
        
//       }}/>

//   </Stack.Navigator>
// );


// const DealerProductsStackScreen =({navigation}) =>(
//   <Stack.Navigator screenOptions={{
//       headerStyle: {
//           backgroundColor: '#ec2F4B',
//         },

//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           alignSelf: 'center'
//         },
//   }}>
//       <Stack.Screen name="DealerProducts" component={DealerProducts} options={{
//           title:'Dealer Products',
//           // headerShown: false,
//           headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//           headerTitleAlign: 'center',
//           headerLeft : () => (
//               <Icon.Button  name = 'ios-menu' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//           ),
        
//       }}/>

// //   </Stack.Navigator>
// // );


// // const AdminOrdersStackScreen =({navigation}) =>(
// //   <Stack.Navigator screenOptions={{
// //       headerStyle: {
// //           backgroundColor: '#ec2F4B',
// //         },

// //         headerTintColor: '#fff',
// //         headerTitleStyle: {
// //           fontWeight: 'bold',
// //           alignSelf: 'center'
// //         },
// //   }}>
// //       <Stack.Screen name="AdminOrders" component={AdminOrders} options={{
// //           title:'Admin Orders',
// //           // headerShown: false,
// //           headerStyle: {
// //               backgroundColor: '#ec2F4B',
// //             },
// //           headerTitleAlign: 'center',
// //           headerLeft : () => (
// //               <Icon.Button  name = 'ios-menu' size={30}
// //               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
// //           ),
        
// //       }}/>

// //   </Stack.Navigator>
// // );

// // const PendingListStackScreen =({navigation}) =>(
// //   <Stack.Navigator screenOptions={{
// //       headerStyle: {
// //           backgroundColor: '#ec2F4B',
// //         },

// //         headerTintColor: '#fff',
// //         headerTitleStyle: {
// //           fontWeight: 'bold',
// //           alignSelf: 'center'
// //         },
// //   }}>
// //       <Stack.Screen name="PendingList" component={PendingList} options={{
// //           title:'Pending List',
// //           // headerShown: false,
// //           headerStyle: {
// //               backgroundColor: '#ec2F4B',
// //             },
// //           headerTitleAlign: 'center',
// //           headerLeft : () => (
// //               <Icon.Button  name = 'ios-menu' size={30}
// //               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
// //           ),
        
// //       }}/>

// //   </Stack.Navigator>
// // );

// const ProductDetailStackScreen =({navigation}) =>(


  
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#ec2F4B',
//           },

//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             // alignSelf: 'center'
           
//           },
//     }}>
      
//         <Stack.Screen name={ 'ProductDetailst'} component={ProductDetailScreen} options={{
//             title:'ProductDetails',
//             headerStyle: {
//                 backgroundColor: '#ec2F4B',
//               },
//             headerTitleAlign: 'center',
//             headerLeft : () => (
//                 <Icon.Button  name = 'ios-menu' size={30}
//                 backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//             ),
            
//             headerRight : () => (
                
//                 <View style={styles.iconContainer}>
//               <Icon.Button  name = 'md-search' size={30}
//                 backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('SearchBar')}></Icon.Button>
//          <Icon.Button  name = 'ios-cart' size={30}
//                 backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
//       </View>
//             ),

//         }}/>



//     </Stack.Navigator>
// );


// const WishListStackScreen =({navigation}) =>(
//   <Stack.Navigator screenOptions={{
//       headerStyle: {
//           backgroundColor: '#ec2F4B',
//         },
//       //   headerShown: false,
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           // alignSelf: 'center'
         
//         },
//   }}>
//       <Stack.Screen name="WishList" component={WishList} options={{
//           title:'WishList',
//           headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//           headerTitleAlign: 'center',
//           headerLeft : () => (
//               <Icon.Button  name = 'ios-menu' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//           ),

            

//       }}/>



//   </Stack.Navigator>
// );


// const ProductListStackScreen =({navigation}) =>(
//   <Stack.Navigator screenOptions={{
//       headerStyle: {
//           backgroundColor: '#ec2F4B',
//         },
//       //   headerShown: false,
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           // alignSelf: 'center'
         
//         },
//   }}>
//       <Stack.Screen name="ProductList" component={ProductList} options={{
//           title:'ProductList',
//           headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//           headerTitleAlign: 'center',
//           headerLeft : () => (
//               <Icon.Button  name = 'ios-menu' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//           ),

            

//       }}/>



//   </Stack.Navigator>
// );

// const ProfileScreenStackScreen =({navigation}) =>(
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#ec2F4B',
//           },
//         //   headerShown: false,
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             // alignSelf: 'center'
           
//           },
//     }}>
//         <Stack.Screen name="Profile" component={ProfileScreen} options={{
//             title:'Profile',
//             headerStyle: {
//                 backgroundColor: '#ec2F4B',
//               },
//             headerTitleAlign: 'center',
//             headerLeft : () => (
//                 <Icon.Button  name = 'ios-menu' size={30}
//                 backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//             ),

              

//         }}/>

//     </Stack.Navigator>
// );


// const ProfileScreenDealerStackScreen =({navigation}) =>(
//   <Stack.Navigator screenOptions={{
//       headerStyle: {
//           backgroundColor: '#ec2F4B',
//         },
//       //   headerShown: false,
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           // alignSelf: 'center'
         
//         },
//   }}>
//       <Stack.Screen name="Profile" component={ProfileScreenDealer} options={{
//           title:'Profile',
//           headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//           headerTitleAlign: 'center',
//           headerLeft : () => (
//               <Icon.Button  name = 'ios-menu' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//           ),

            

//       }}/>

//   </Stack.Navigator>
// );

// const EditProfileScreenStackScreen =({navigation}) =>(
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#ec2F4B',
//           },
//         //   headerShown: false,
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             // alignSelf: 'center'
           
//           },
//     }}>
//         <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
//             title:'Edit Profile',
//             headerStyle: {
//                 backgroundColor: '#ec2F4B',
//               },
//             headerTitleAlign: 'center',
//             headerLeft : () => (
//                 <Icon.Button  name = 'ios-menu' size={30}
//                 backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//             ),

              

//         }}/>

//     </Stack.Navigator>
// );

// const AddItemsStackScreen =({navigation}) =>(
//   <Stack.Navigator screenOptions={{
//       headerStyle: {
//           backgroundColor: '#ec2F4B',
//         },
//       //   headerShown: false,
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           // alignSelf: 'center'
         
//         },
//   }}>
//       <Stack.Screen name="AddItems" component={Popup} options={{
//           title:'Add Items',
//           headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//           headerTitleAlign: 'center',
//           headerLeft : () => (
//               <Icon.Button  name = 'ios-menu' size={30}
//               backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//           ),

            

//       }}/>

//   </Stack.Navigator>
// );


// const adminItems = [
//   <DrawerNav.Screen name="Admin" component={AdminStackScreen} 
        
//   options={{
//     title: 'Admin',
//     drawerIcon: ({color, size}) => (
//       <Icon
//         name="md-checkmark-circle-outline"
//         size={size}
//         color={color}
//       />
//     ),
//     // gestureEnabled: false,
//   }}
  
//   />,

//   <DrawerNav.Screen name="AddItems" component={AddItemsStackScreen}
  
//   options={{
//     title: 'AddItems',
//     drawerIcon: ({color, size}) => (
//       <Icon
//         name="md-checkmark-circle-outline"
//         size={size}
//         color={color}
//       />
//     ),
//     // gestureEnabled: false,
//   }}
//   />
//   ,
//   <DrawerNav.Screen name="PendingList" component={PendingListStackScreen}
        
//         options={{
//           title: 'PendingList',
//           drawerIcon: ({color, size}) => (
//             <Icon
//               name="md-checkmark-circle-outline"
//               size={size}
//               color={color}
//             />
//           ),
//           // gestureEnabled: false,
//         }}
//         />

//   ,
//   <DrawerNav.Screen name="AdminOrders" component={AdminOrdersStackScreen}
        
//         options={{
//           title: 'AdminOrders',
//           drawerIcon: ({color, size}) => (
//             <Icon
//               name="md-checkmark-circle-outline"
//               size={size}
//               color={color}
//             />
//           ),
//           // gestureEnabled: false,
//         }}
//         />,
        

// ];


// const dealerItems = [

// <DrawerNav.Screen name="EditProfile1" component={ProfileScreenDealerStackScreen} 
           
//            options={{
//              title: 'Profile',
//              drawerIcon: ({color, size}) => (
//                <Icon
//                  name="md-checkmark-circle-outline"
//                  size={size}
//                  color={color}
//                />
//              ),
//              // gestureEnabled: false,
//            }}
//            />,

//   <DrawerNav.Screen name="Dealer" component={DealerStackScreen}
        
//         options={{
//           title: 'Dealer',
//           drawerIcon: ({color, size}) => (
//             <Icon
//               name="md-checkmark-circle-outline"
//               size={size}
//               color={color}
//             />
//           ),
//           // gestureEnabled: false,
//         }}
//         />,
        
//         <DrawerNav.Screen name="DealerProducts" component={DealerProductsStackScreen}
        
//         options={{
//           title: 'DealerProducts',
//           drawerIcon: ({color, size}) => (
//             <Icon
//               name="md-checkmark-circle-outline"
//               size={size}
//               color={color}
//             />
//           ),
//           // gestureEnabled: false,
//         }}
//         />

// ];
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
    //     <DrawerNav.Screen name='WishList' component={WishListStackScreen}

    //     options={{

    //      drawerLabel:'WishList',
    //       title:'WishList',
    //       drawerIcon: ({color, size}) => (
    //         <Icon
    //           name="md-checkmark-circle-outline"
    //           size={size}
    //           color={color}
    //         />
    //     ),
    //       // gestureEnabled: false,
    // }}
    //     />,  
];

// function Popup()
// {
  
//     const [text,setText] = React.useState('');
//     const [modalVisible, setModalVisible] = React.useState(false);

    
 
//     return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>ITEM TO BE ADDED</Text>
//             <TextInput style={styles.modalTextInput} placeholder='Enter the item name' onChangeText={text => setText(text)}   />

//             <TouchableHighlight
//               style={{ ...styles.openButton,  paddingTop:8, marginTop:40,
//                 paddingBottom:15,
//                 marginLeft:40,
//                 marginRight:30,
//                 backgroundColor:'#ec2F4B',
//                 borderRadius:100,
//                 width : 145,
//                 height :35 ,
//                 borderWidth: 1,
//                 borderColor: '#fff' }}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
                
//                 if(text!==''  && addedItems.includes(text)==false)
//                 {

//                   addedItems.push(text);

//                   firebase.database().ref('/drawerMenu').set(addedItems).then(() => {
//                   }).catch((error) => {
//                       console.log(error);
//                   });

//                   customerItems.push (
//                     <DrawerNav.Screen name={text} component={

//                       ({navigation}) =>(


  
//                         <Stack.Navigator screenOptions={{
//                             headerStyle: {
//                                 backgroundColor: '#ec2F4B',
//                               },
                    
//                               headerTintColor: '#fff',
//                               headerTitleStyle: {
//                                 fontWeight: 'bold',
//                                 // alignSelf: 'center'
                               
//                               },
//                         }}>
                          
//                             <Stack.Screen name={text} component={ProductList} options={{
//                                 title:'ProductList',
//                                 headerStyle: {
//                                     backgroundColor: '#ec2F4B',
//                                   },
//                                 headerTitleAlign: 'center',
//                                 headerLeft : () => (
//                                     <Icon.Button  name = 'ios-menu' size={30}
//                                     backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//                                 ),
                                
//                                 headerRight : () => (
                                    
//                                     <View style={styles.iconContainer}>
//                                   <Icon.Button  name = 'md-search' size={30}
//                                     backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('SearchBar')}></Icon.Button>
//                              <Icon.Button  name = 'ios-cart' size={30}
//                                     backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
//                           </View>
//                                 ),
                    
//                             }}/>
                    
//                         </Stack.Navigator>
//                     )

//                     }
                
//                                   options={{
                          
//                                    drawerLabel:text,
//                                     title:text,
//                                     drawerIcon: ({color, size}) => (
//                                       <Icon
//                                         name="md-checkmark-circle-outline"
//                                         size={size}
//                                         color={color}
//                                       />
//                                   ),
//                                     // gestureEnabled: false,
//                               }}
//                                   />
//                   );
                 
                

//                   adminItems.push(
//                     <DrawerNav.Screen name={text} component={

                      
//                       ({navigation}) =>(


  
//                         <Stack.Navigator screenOptions={{
//                             headerStyle: {
//                                 backgroundColor: '#ec2F4B',
//                               },
                    
//                               headerTintColor: '#fff',
//                               headerTitleStyle: {
//                                 fontWeight: 'bold',
//                                 // alignSelf: 'center'
                               
//                               },
//                         }}>
                          
//                             <Stack.Screen name={text} component={ProductList} options={{
//                                 title:text,
//                                 headerStyle: {
//                                     backgroundColor: '#ec2F4B',
//                                   },
//                                 headerTitleAlign: 'center',
//                                 headerLeft : () => (
//                                     <Icon.Button  name = 'ios-menu' size={30}
//                                     backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
//                                 ),
                                
//                                 headerRight : () => (
                                    
//                                     <View style={styles.iconContainer}>
//                                   <Icon.Button  name = 'md-search' size={30}
//                                     backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('SearchBar')}></Icon.Button>
//                              <Icon.Button  name = 'ios-cart' size={30}
//                                     backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('CartScreen')}></Icon.Button>
//                           </View>
//                                 ),
                    
//                             }}/>
                    
//                         </Stack.Navigator>
//                     )
                                      

//                     }

//                           options={{
                  
//                            drawerLabel:text,
//                             title:text,
//                             drawerIcon: ({color, size}) => (
//                               <Icon
//                                 name="md-checkmark-circle-outline"
//                                 size={size}
//                                 color={color}
//                               />
//                           ),
//                             // gestureEnabled: false,
//                       }}
//                           />
//                   );

//                   // customerItems.push(
//                   //   <DrawerNav.Screen name={text} component={ProductListStackScreen}

//                   //         options={{
                  
//                   //          drawerLabel:text,
//                   //           title:text,
//                   //           drawerIcon: ({color, size}) => (
//                   //             <Icon
//                   //               name="md-checkmark-circle-outline"
//                   //               size={size}
//                   //               color={color}
//                   //             />
//                   //         ),
//                   //           // gestureEnabled: false,
//                   //     }}
//                   //         />
//                   // );
              
  
//                 }

//               }}
//             >
//               <Text style={styles.textStyle}>ADD</Text>
//             </TouchableHighlight>



//           </View>
//         </View>
//       </Modal>
          
//  <TouchableHighlight
//               style={{ ...styles.openButton, paddingTop:8,
//                 marginTop:-100,
//               paddingBottom:15,
//               marginLeft:40,
//               marginRight:30,
//               backgroundColor:'#ec2F4B',
//               borderRadius:100,
//               width : 145,
//               height :35 ,
//               borderWidth: 1,
//               borderColor: '#fff'}}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//               }}
//             >
//               <Text style={styles.textStyle}>ADD ITEM</Text>
//             </TouchableHighlight>

  


// <TouchableHighlight
//               style={{ ...styles.openButton,  paddingTop:8, marginTop:40,
//                 paddingBottom:15,
//                 marginLeft:40,
//                 marginRight:30,
//                 backgroundColor:'#ec2F4B',
//                 borderRadius:100,
//                 width : 145,
//                 height :35 ,
//                 borderWidth: 1,
//                 borderColor: '#fff'}}
//               onPress={() => {
//                 addedItems.splice(addedItems.length-1,1);
                
//                 firebase.database().ref('/drawerMenu').set(addedItems).then(() => {
//                 }).catch((error) => {
//                     console.log(error);
//                 });

//                 adminItems.splice(adminItems.length-1,1);
//                 customerItems.splice(adminItems.length-1,1);
//               }}
//             >
//               <Text style={styles.textStyle}>DELETE ITEM</Text>
//             </TouchableHighlight>

//     </View>


//   );

// }
















// function DrawerContent(props) {

//   const paperTheme = useTheme();

//   const { signOut,updateScreens, toggleTheme } = React.useContext(AuthContext);

//     return(

//         <View style={{flex:1}}>

//           <DrawerContentScrollView {...props}>
//                 <View style={styles.drawerContent}>
//                     <View style={styles.userInfoSection}>
//                         <View style={{flexDirection:'row',marginTop: 15}}>
//                             <Avatar.Image 
//                                 source={{
//                                     uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
//                                 }}
//                                 size={50}
//                             />
//                             <View style={{marginLeft:15, flexDirection:'column'}}>
//                                 <Title style={styles.title}>John Doe</Title>
//                                 <Caption style={styles.caption}>+91 9876543210</Caption>
//                             </View>
//                         </View>

//                         <View style={styles.row}>
//                             <View style={styles.section}>
//                                 <Paragraph style={[styles.paragraph, styles.caption]}>8</Paragraph>
//                                 <Caption style={styles.caption}>Orders Pending</Caption>
//                             </View>
//                             <View style={styles.section}>
//                                 <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
//                                 <Caption style={styles.caption}>Orders Delivered</Caption>
//                             </View>
//                         </View>
//                     </View> 


//                     <Drawer.Section style={styles.drawerSection}>

//                     <DrawerItemList {...props}/>

//                     </Drawer.Section>
                    
//                       <Drawer.Section title="Preferences">
//                         <TouchableRipple onPress={() => {toggleTheme()}}>
//                             <View style={styles.preference}>
//                                 <Text>Dark Theme</Text>
//                                 <View pointerEvents="none">
//                                     <Switch value={paperTheme.dark}/>
//                                 </View>
//                             </View>
//                         </TouchableRipple>
//                     </Drawer.Section>
//                 </View>
//             </DrawerContentScrollView>
//             <Drawer.Section style={styles.bottomDrawerSection}>
//                 <DrawerItem 
//                     icon={({color, size}) => (
//                         <Icon 
//                         name="md-exit" 
//                         color={color}
//                         size={size}
//                         />
//                     )}
//                     label="Sign Out"
//                     onPress={() => {  signOut()}}
//                 />
//             </Drawer.Section>
//         </View>
//     );
// }





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

    this.state = {
      arr:[],
  };

   
  }
   
  componentDidMount() {
    this._isMounted = true;
    Firebase.database().ref('/DrawerItemsList').once('value', (data) => {
        if (this._isMounted) {
            if (data.val()) {
            
                for(var index=0;index<this.data.val().length;index++)
                {
                    addedItems.push(this.data.val()[index])
                }

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
                          
                            <Stack.Screen name={data.val()[index].itemName} component={ProductList} options={{
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