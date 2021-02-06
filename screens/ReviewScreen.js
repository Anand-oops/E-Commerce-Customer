import React from 'react';
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import Firebase from "../firebaseConfig";
import Counter from "react-native-counters";
import Toast from 'react-native-simple-toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CheckBox } from 'react-native-elements'

export default function ReviewScreen(props) {

    
    const [item,setItem]=useState(props.route.params.item);
    const giveReview=(item)=>{
        console.log("clicked");
        props.navigation.navigate('WriteReview',{item:item});
    }


    return (
        <ScrollView>
            <View style={styles.main}>
                                <TouchableOpacity /*onPress={() => itemsPress(item)}*/>
                                    <View style={{ margin: 4, borderColor: 'white', borderRadius: 1, elevation: 1, flexDirection: 'row' }}>
                                        <View style={{ borderColor: 'white', borderRadius: 1, elevation: 1, flex: 1 }}>
                                            <Image
                                                style={{ padding: 2, height: 150, width: '98%', resizeMode: 'stretch', alignSelf: 'center', }}
                                                source={{ uri: item.image.uri }}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: '#3b3a30', fontSize: 20, padding: 4, textTransform: 'capitalize' }}>{item.productName}</Text>
                                            <Text style={{ color: 'black', fontSize: 10, paddingLeft: 4 }}>{item.description}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'green', fontSize: 14, padding: 2, }}>{"₹" + item.finalPrice}</Text>
                                                {/* <Text style={{ color: 'grey', fontSize: 14, padding: 2, textDecorationLine: 'line-through' }}>{"₹" + item.productPrice}</Text>
                                        <Text style={{ color: '#82b74b', fontSize: 14, padding: 2, }}>{item.discount + "off "}</Text> */}
                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <View
                        style={{
                            marginTop: 5,
                            borderBottomColor: 'grey',
                            borderBottomWidth: 5,
                        }}
                    />

                                <View>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginTop:6,marginHorizontal:4}}>How's your item ?</Text>
                <View style={{borderRadius:1,elevation:1,padding:2,margin:10,height:40,justifyContent:'center'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>giveReview(item)}>
                    <Text style={{fontSize:15,marginHorizontal:8,flex:1}}>Give Review</Text>
                    <View style={{alignSelf:'center',marginHorizontal:4}}>
                    <AntDesign name="right" size={15} color="black" />
                    </View>
                </TouchableOpacity>
                </View>
            </View>
            <View
                        style={{
                            marginTop: 5,
                            borderBottomColor: 'grey',
                            borderBottomWidth: 5,
                        }}
                    />
            <View>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginTop:6,marginHorizontal:4}}>Order Info</Text>
                <View style={{borderRadius:1,elevation:1,padding:2,margin:10,height:40,justifyContent:'center'}}>
                <TouchableOpacity style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15,marginHorizontal:8,flex:1}}>Order Info</Text>
                    <View style={{alignSelf:'center',marginHorizontal:4}}>
                    <AntDesign name="right" size={15} color="black" />
                    </View>
                </TouchableOpacity>
                </View>
                <View style={{borderRadius:1,elevation:1,padding:2,margin:10,height:40,justifyContent:'center'}}>
                <TouchableOpacity style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15,marginHorizontal:8,flex:1}}>Download Invoice</Text>
                    <View style={{alignSelf:'center',marginHorizontal:4}}>
                    <AntDesign name="right" size={15} color="black" />
                    </View>
                </TouchableOpacity>
                </View>
                
                </View>
                <View
                        style={{
                            marginTop: 5,
                            borderBottomColor: 'grey',
                            borderBottomWidth: 5,
                        }}
                    />
                          
            </View>

            
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },
    
    
});
