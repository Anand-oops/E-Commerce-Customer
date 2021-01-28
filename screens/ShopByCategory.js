import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";


export default function ShopByCategory({ navigation, route }) {

    const [listen, setListen] = useState(true);
    const [items, setItem] = useState([]);
    Firebase.database().ref(`ProductList/${route.name}`).on('value', (data) => {
        if (listen) {
            if (data.val()) {
                var temp = [];
                var keys = Object.keys(data.val());
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val()[key])
                }
                setListen(false);
                setItem(temp);
            }
        }

    })

    const itemsPress = (item) => {
        console.log("clicked");
        navigation.navigate('ProductDetailsScreen', { item: item });
    }

    return (

        <View style={styles.main}>

            <FlatList style={{ flex: 1, padding: 4 }}
                data={items}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, margin: 2 }}>
                        <TouchableOpacity onPress={() => itemsPress(item)}>
                            <View style={{ margin: 1, borderColor: 'white', borderRadius: 1, elevation: 1, height: 110, flexDirection: 'row' }}>
                                <View style={{ borderColor: 'white', borderRadius: 1, elevation: 1 }}>
                                    <Image
                                        style={{ padding: 2, height: 120, width: 100, resizeMode: 'contain', alignSelf: 'center', }}
                                        source={{ uri: item.image.uri }}
                                    />
                                </View>

                                <Text style={{ color: '#3b3a30', fontSize: 10, padding: 4, alignSelf: 'center', flex: 1 }}>{item.productName}</Text>
                                {/* <Text style={{color:'black' , fontSize:10,paddingLeft:4}}>{ item.description}</Text>
                      <View style={{flexDirection:'row'}}>
                      <Text style={{color:'grey' , fontSize:18,padding:2,flex:1}}>{"Rs."+ item.finalPrice}</Text>
                      
                      <Text style={{color:'#82b74b' , fontSize:18,padding:2,flex:1}}>{item.discount +"off "}</Text>
                      </View>
                      <Text style={{color:'grey' , fontSize:10,paddingLeft:4,paddingBottom:2}}>{ item.productPrice}</Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                )}>

            </FlatList>


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
        // justifyContent: "center",
        paddingTop: '50%'
    },
    text: {
        color: 'blue'
    }
});