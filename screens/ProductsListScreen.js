import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProductListScreen() {

    return (
        
        <View style={styles.main}>
                <Text style={ {color:'black'}}>This is Product List Screen </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height:'100%',
        width:'100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop:'50%'
    },
});