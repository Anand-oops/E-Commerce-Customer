import React from 'react';
import { useState,useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, FlatList,Image,ScrollView,TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";


export default function ProceedToBuy(props) {

    // const { user } = useContext(AuthContext);

    // console.log("props",props);
    // const [listen, setListen] = useState(true);
    // const [items, setItem] = useState([]);
    // Firebase.database().ref(`Customers/${user.uid}/wishlist`).on('value', (data) => {
    //     if (listen) {
    //         if(data.val()){
    //             var temp = [];
    //         var keys = Object.keys(data.val());
    //         console.log('keys',keys);
                
    //             for (var i = 0; i < keys.length; i++) {
    //                 var key = keys[i]
    //                 temp.push(data.val()[key])
    //             }

    //             console.log("sddssdsdd",temp);

    //         setListen(false);

    //         setItem(temp);

    //         console.log('items',items);
    //         console.log('vsfhbf',temp[0].productName);
    //     }
    // }
        
    // })
    // const itemsPress=(item)=>{
    //     console.log("clicked");
    //    props.navigation.navigate('ProductDetailsScreen',{item:item});
    // // console.log(props.navigation.navigate);
    // }

    return (

        <View style={styles.main}>
            <Text style={{fontSize:22,fontWeight:'bold'}}> Add a new address </Text>
            
            <ScrollView style={{ marginTop: 10 }}>
                        
                            <View >
                                <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                <TextInput
                                    placeholder='Country'
                                    placeholderTextColor='gray'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)}
                                     />
                                </View>
                                
                                <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='Full Name'
                                    placeholderTextColor='gray'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                                    <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='Mobile Number'
                                    placeholderTextColor='gray'
                                    keyboardType='number-pad'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                                    <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='PIN CODE'
                                    placeholderTextColor='gray'
                                    keyboardType='number-pad'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                                    <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='Flat,House no.,Building,Company,Apartment'
                                    placeholderTextColor='gray'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                                    <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='Area,Colony,Street,Sector,Village'
                                    placeholderTextColor='gray'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                                    <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='Landmark e.g. near Apoolo hospital'
                                    placeholderTextColor='gray'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                                    <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='Town/City'
                                    placeholderTextColor='gray'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                                    <View style={{borderRadius:1,elevation:1,margin:8,padding:8}}>
                                    <TextInput
                                    placeholder='State'
                                    placeholderTextColor='gray'
                                    // style={styles.textInput}
                                    // value={productName}
                                    // onChangeText={(val) => setProductName(val)} 
                                    />
                                    </View>
                            </View>
                            <TouchableOpacity >
                    <View style={{borderRadius:3,elevation:1,margin:6,padding:4,backgroundColor:'#f4a460',height:40,justifyContent:'center'}}>
                        <Text style={{alignSelf:'center',fontWeight:'bold'}}>SAVE CHANGES</Text>
                    </View>
                </TouchableOpacity>
                        
                    </ScrollView>

                
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: '50%'
    },
    text:{
        color:'blue'
    }
});
