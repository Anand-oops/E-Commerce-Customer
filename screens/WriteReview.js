import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from "react-native-star-rating";
import Firebase from "../firebaseConfig";
import Toast from 'react-native-simple-toast';

export default function WriteReview(props) {

    const { user } = useContext(AuthContext);
    const [call, setCall] = useState(true)
    const [desReview, setdesReview] = useState('');
    const [titleReview, setTitleReview] = useState('');
    const [item] = useState(props.route.params.item);
    const [rate, setRating] = useState(0);
    const [updateCheck, setUpdateCheck] = useState(true);
    const [orgRating, setOrgRating] = useState(0);
    const [count, setCount] = useState(0)

    Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}/Reviews`).once('value').then(data => {
        if (call) {
            if (data.val()) {
                setCount(Object.keys(data.val()).length)
                var item = data.val()[user.uid];
                setTitleReview(item.revTitle);
                setdesReview(item.revDesc);
                setRating(item.revRating);
                setOrgRating(item.revRating)
                setUpdateCheck(false);
            }
            setCall(false);
        }
    })

    const submitChanges = () => {
        console.log('rating', rate);
        console.log('orgRate', orgRating);
        console.log('count', count);
        var rev = {
            revId: user.uid,
            revTitle: titleReview,
            revDesc: desReview,
            revRating: rate,
        }
        Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}/Reviews/${user.uid}`).set(rev).then(() => {
            Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}/rating`).transaction(function (currentRating) {
                if (updateCheck) {
                    if (currentRating == 0)
                        return rate;
                    else
                        return (currentRating + rate) / 2;
                }
                else {
                    if (orgRating > rate)
                        return currentRating + (rate - orgRating) / count;
                    else if (orgRating < rate)
                        return currentRating + (rate - orgRating) / count;
                    else
                        return currentRating;
                }
            }).then(() => {
                Toast.show("Review Submitted", Toast.SHORT);
                props.navigation.goBack();
            })

        })
    }


    return (
        <ScrollView style={{ backgroundColor: '#a6b8ca' }}>
            <View style={styles.main}>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    padding: 5,
                    borderRadius: 10,
                    elevation: 3,
                    flex: 1,
                    backgroundColor: '#778899',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333',
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    borderWidth: 2,
                    borderColor: '#DCDCDC',
                    marginHorizontal: 4,
                    marginVertical: 6,
                }}>
                    <View style={{ borderRadius: 5, flex: 1 }}>
                        <Image
                            style={{ padding: 2, height: 150, width: '98%', resizeMode: 'contain', alignSelf: 'center', }}
                            source={{ uri: item.image.uri }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#3b3a30', fontSize: 20, padding: 4, textTransform: 'capitalize' }}>{item.productName}</Text>
                        <Text style={{ color: '#DCDCDC', fontSize: 12, padding: 4, paddingBottom: 10 }}>{item.category + " : " + item.subCategory}</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={rate}
                            starSize={30}
                            fullStarColor={'#ffa500'}
                            emptyStarColor={'#ff4500'}
                            selectedStar={(rating) => { setRating(rating) }}
                        />
                        <TouchableOpacity onPress={() => { setRating(0) }} style={{ elevation: 1, borderRadius: 1, width: 50, margin: 8, backgroundColor: 'coral' }}>
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Clear</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: '#000a1a',
                        borderBottomWidth: 5,
                    }}
                />
                <View style={styles.card}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4, textAlign: 'center' }}>Add a Descriptive Review</Text>
                    <View style={{ height: 180, marginHorizontal: 8, marginVertical: 6, borderRadius: 5, borderWidth: 2, borderColor: '#000a1a', backgroundColor: '#d8eafd' }}>
                        <TextInput
                            placeholder={"What did you like or dislike? Did this product fulfilled your requirements?"}
                            multiline={true}
                            style={{ height: 180, margin: 6, color: 'grey', textAlignVertical: 'top' }}
                            value={desReview}
                            onChangeText={(text) => setdesReview(text)}
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: '#000a1a',
                        borderBottomWidth: 5,
                    }}
                />
                <View style={styles.card}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4, textAlign: 'center' }}>Add a Title for your Review</Text>
                    <View style={{ height: 80, marginHorizontal: 8, marginVertical: 6, borderRadius: 5, borderWidth: 2, borderColor: '#000a1a', backgroundColor: '#d8eafd' }}>
                        <TextInput
                            style={{ height: 80, margin: 6, color: 'grey', textAlignVertical: 'top' }}
                            placeholder={'Sum up your review in one line.'}
                            value={titleReview}
                            onChangeText={(text) => { setTitleReview(text) }}

                        />
                    </View>
                </View>

            </View>
            <TouchableOpacity onPress={() => {
                if (rate != 0) {
                    submitChanges();
                } else
                    Toast.show("Rate the product atleast", Toast.SHORT);
            }} style={{ backgroundColor: 'coral', height: 40, borderRadius: 10, elevation: 5, marginHorizontal: 4, marginVertical: 5, justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    card: {
        marginTop: 8,
        padding: 5,
        borderRadius: 10,
        elevation: 3,
        flex: 1,
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
