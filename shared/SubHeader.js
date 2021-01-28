import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function header({ title }) {

    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headertext}>{title}</Text>
            </View>
            <AntDesign name="hearto" size={22} color="white" style={{ position: 'absolute', right: 40 }} />
            <AntDesign name="shoppingcart" size={24} color="white" style={{ position: 'absolute', right: 3 }} />

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