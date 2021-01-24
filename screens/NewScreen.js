import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";


export default function NewScreen(props) {
    var temp = [];
    const [listen, setListen] = useState(true);
    const [items, setItem] = useState([]);
    Firebase.database().ref(`ProductList/${props.route.name}`).on('value', (data) => {
        if (listen) {
            if(data.val()){
 
            var keys = Object.keys(data.val());
            console.log('keys',keys);
                
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val()[key])
                }

                console.log("sddssdsdd",temp);

            setListen(false);

            setItem(temp);

            console.log('items',items);
            console.log('vsfhbf',temp[0].productName);
        }
    }
        
    })

    return (

        <View style={styles.main}>
            <Text style={{ color: 'black' }}>{"this is " + props.route.name} </Text>
            <FlatList style={{flex:1}}
              data={temp}
              numColumns={2}
              renderItem={({item})=>(
                  <View style={{flex:1}}>
                      <TouchableOpacity>
                      {/* <Image
                      style={{height:200,width:50,resizeMode:'stretch'}}
                      source={require(item.image.uri)}
                      /> */}

                      <Text style={{color:'black' , fontSize:20}}>{item.productName}</Text>
                      <Text style={{color:'black' , fontSize:10}}>{ item.description}</Text>
                      <View style={{flexDirection:'row'}}>
                      <Text style={{color:'black' , fontSize:20}}>{"Rs."+ item.finalPrice}</Text>
                      <Text style={{color:'black' , fontSize:20}}>{ item.productPrice}</Text>
                      <Text style={{color:'black' , fontSize:20}}>{item.discount +" off "}</Text>
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
    text:{
        color:'blue'
    }
});