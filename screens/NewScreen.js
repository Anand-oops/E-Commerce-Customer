import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewScreen(props) {

    console.log("dshjsfg",props);
    return (
        
        <View style={styles.main}>
                <Text style={ {color:'black'}}>This is new Screen </Text>
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
        // justifyContent: "center",
        paddingTop:'50%'
    },
});