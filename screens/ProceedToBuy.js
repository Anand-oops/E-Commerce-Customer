import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";
import Toast from 'react-native-simple-toast';


export default function ProceedToBuy(props) {

    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [call, setCall] = useState(true);
    const [mobile, setMobile] = useState();
    const [pincode, setPincode] = useState();
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [addresses, setAddresses] = useState([])

    Firebase.database().ref(`Customers/${user.uid}/Address`).on('value',data => {
        if (call) {
            if (data.val()) {
                setAddresses(data.val());
            }
            setCall(false);
        }
    })

    const saveChanges = () => {
        const address = {
            name: name,
            mobile: mobile,
            pincode: pincode,
            addressLine1: add1,
            addressLine2: add2,
            landmark: landmark,
            city: city,
            state: state
        }
        const temp = [address, ...addresses]
        console.log("Adress", temp)
        Firebase.database().ref(`Customers/${user.uid}/Address`).set(temp).then(props.navigation.goBack())
    }

    return (

        <View style={styles.main}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}> Add a new address </Text>

            <ScrollView style={{ marginTop: 10 }}>

                <View >
                    <View style={{ borderRadius: 1, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd' }}>
                        <TextInput
                            placeholder='Full Name'
                            placeholderTextColor='gray'
                            onChangeText={(val) => setName(val)}
                        />
                    </View>
                    <View style={{ borderRadius: 1, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd' }}>
                        <TextInput
                            placeholder='Mobile Number'
                            placeholderTextColor='gray'
                            keyboardType='number-pad'
                            maxLength={10}
                            onChangeText={(val) => setMobile(val)}
                        />
                    </View>
                    <View style={{ borderRadius: 1, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd' }}>
                        <TextInput
                            placeholder='PIN CODE'
                            placeholderTextColor='gray'
                            keyboardType='number-pad'
                            maxLength={6}
                            onChangeText={(val) => setPincode(val)}
                        />
                    </View>
                    <View style={{ borderRadius: 1, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd' }}>
                        <TextInput
                            placeholder='Flat,House no.,Building,Company,Apartment'
                            placeholderTextColor='gray'
                            onChangeText={(val) => setAdd1(val)}
                        />
                    </View>
                    <View style={{ borderRadius: 1, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd' }}>
                        <TextInput
                            placeholder='Area,Colony,Street,Sector,Village'
                            placeholderTextColor='gray'
                            onChangeText={(val) => setAdd2(val)}
                        />
                    </View>
                    <View style={{ borderRadius: 1, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd' }}>
                        <TextInput
                            placeholder='Landmark e.g. near Apoolo hospital'
                            placeholderTextColor='gray'
                            onChangeText={(val) => setLandmark(val)}
                        />
                    </View>
                    <View style={{ borderRadius: 1, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd' }}>
                        <TextInput
                            placeholder='Town/City'
                            placeholderTextColor='gray'
                            onChangeText={(val) => setCity(val)}
                        />
                    </View>
                    <View style={{ borderRadius: 5, elevation: 1, margin: 8, padding: 8,backgroundColor:'#d8eafd'}}>
                        <TextInput
                            placeholder='State'
                            placeholderTextColor='gray'
                            onChangeText={(val) => setState(val)}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    if (name.length > 0 && mobile.length == 10 && pincode.length == 6 && add1.length > 0 && add2.length > 0
                        && landmark.length > 0 && city.length > 0 && state.length > 0) {
                        saveChanges();
                    } else if (mobile.length < 10)
                        Toast.show("Mobile number shall have 10 digits", Toast.SHORT);
                    else if (pincode.length < 6)
                        Toast.show("Pin Code shall have 6 digits", Toast.SHORT);
                    else
                        Toast.show("Fill all fields...", Toast.SHORT);
                }}>
                    <View style={{ borderRadius: 3, elevation: 1, margin: 6, padding: 4, backgroundColor: '#f4a460', height: 40, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>SAVE CHANGES</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#a6b8ca',
    },
    card: {
        marginTop: 8,
        padding: 5,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#778899',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderWidth: 2,
        borderColor: '#DCDCDC',
        marginHorizontal: 4,
        marginVertical: 6,
    }
    
});
