import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function header({ navigation,title }) {

    const wishlistOpen=()=>{
        console.log("wishlist open");
        navigation.navigate('WishList');
        
    }
    const cartOpen=()=>{
        console.log("cart open");
        navigation.navigate('Cart');
    }
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headertext}>{title}</Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', right: 40 }} onPress={()=>{wishlistOpen()}}>
            <AntDesign name="hearto" size={22} color="white"   />
            </TouchableOpacity>
            
            <TouchableOpacity style={{ position: 'absolute', right: 3 }} onPress={()=>{cartOpen()}}>
            <AntDesign name="shoppingcart" size={24} color="white"   />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        color: 'white'
    },
});