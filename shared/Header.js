import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function header({ navigation, title }) {
console.log("nav",navigation);
const wishlistOpen=()=>{
    console.log("wishlist open");
}
const cartOpen=()=>{
    console.log("cart open");
}
    return (
        <View style={styles.header}>
            <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={styles.icon} />
            <View>
                <Text style={styles.headertext}>{title}</Text>
            </View>
            
            <AntDesign name="hearto" size={22} color="white" onPress={()=>{wishlistOpen()}} style={{ position: 'absolute', right: 40 }} />
            
            
            <AntDesign name="shoppingcart" size={24} color="white" onPress={()=>{cartOpen()}} style={{ position: 'absolute', right: 3 }} />
            

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        color: 'white'
    },
    icon: {
        position: 'absolute',
        left: 3
    }
});