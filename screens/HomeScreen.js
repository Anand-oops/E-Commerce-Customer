import React,{ useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet,Text, View } from 'react-native';
import Firebase from '../firebaseConfig'

export default function HomeScreen() {

    const { user } = useContext(AuthContext);

    Firebase.database().ref(`/Customers/${user.uid}`).update({
		id: user.uid,
		email: user.email,
		password: user.providerId,
	})

    return (
        
        <View style={styles.main}>
                <Text style={ {color:'black'}}>Welcome user </Text>
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