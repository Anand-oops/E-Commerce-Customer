import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';


export default function header({ navigation, title }) {
// console.log("nav",navigation);
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
            <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={styles.icon} />
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