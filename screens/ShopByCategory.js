import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList,Image } from 'react-native';
import { LongPressGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";


export default function ShopByCategory({navigation,route}) {
    var name=route.name;
    // console.log("navigation",navigation);
    // console.log("route",route);
    const [listen, setListen] = useState(true);
    const [items, setItem] = useState([]);
    Firebase.database().ref(`DrawerItemsList/`).on('value', (data) => {
        if (listen) {
            if(data.val()){
                var temp = [];
            var keys = Object.keys(data.val());
            // console.log('keys',keys);
                
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val()[key])
                }
              
               temp.map((item)=>{
                   if(item.itemName==name){
                       console.log("cgh",item.SubCategories);
                       setItem(item.SubCategories)
                   }
               })
                console.log("sddssdsdd",temp);

            setListen(false);

            // setItem(temp);

            // console.log('items',items);
            // console.log('vsfhbf',temp[0].productName);
        }
    }
        
    })

    const itemsPress=(item)=>{
        console.log("clicked");
       navigation.navigate('NewScreen',{name:name,subitemName:item.subitemName});
    // console.log(props.navigation.navigate);
    }

    return (

        <View style={styles.main}>
            
            <FlatList style={{flex:1 ,padding:4}}
              data={items}
              numColumns={2}
              renderItem={({item})=>(
                  <View style={{flex:1,margin:2}}>
                      <TouchableOpacity onPress={()=>itemsPress(item)}>
                          <View style={{margin:1,borderColor:'white',borderRadius:1,elevation:1,height:110,flexDirection:'row'}}>
                              <View style={{borderColor:'white',borderRadius:1,elevation:1}}>
                      <Image
                      style={{padding:2,height:120,width:100,resizeMode:'contain',alignSelf:'center',}}
                      source={{uri:item.uri}}
                      />
                      </View>

                      <Text style={{color:'#3b3a30' ,fontSize:10,padding:4,alignSelf:'center',flex:1}}>{item.subitemName}</Text>
                      
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