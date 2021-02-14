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
        <ScrollView>
            <View style={styles.main}>

                <View style={{ margin: 4, borderColor: 'white', borderRadius: 1, elevation: 1, flexDirection: 'row' }}>
                    <View style={{ borderColor: 'white', borderRadius: 1, elevation: 1, flex: 1 }}>
                        <Image
                            style={{ padding: 2, height: 150, width: '98%', resizeMode: 'contain', alignSelf: 'center', }}
                            source={{ uri: item.image.uri }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#3b3a30', fontSize: 20, padding: 4, textTransform: 'capitalize' }}>{item.productName}</Text>
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
                        borderBottomColor: 'grey',
                        borderBottomWidth: 5,
                    }}
                />

                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4 }}>Add a Descriptive Review</Text>
                    <View style={{ height: 200, marginHorizontal: 8, marginVertical: 6, borderRadius: 1, elevation: 1 }}>
                        <TextInput
                            placeholder={"What did you like or dislike? Did this product fulfilled your requirements?"}
                            multiline={true}
                            style={{ height: 40, margin: 6, color: 'grey' }}
                            value={desReview}
                            onChangeText={(text) => setdesReview(text)}
                        />
                    </View>



                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 5,
                    }}
                />
                <View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 6, marginHorizontal: 4 }}>Add a Title for your Review</Text>
                    <View style={{ height: 100, marginHorizontal: 8, marginVertical: 6, borderRadius: 1, elevation: 1 }}>
                        <TextInput
                            style={{ height: 40, marginHorizontal: 6, color: 'grey' }}
                            placeholder={'Sum up your review in one line.'}
                            value={titleReview}
                            onChangeText={(text) => { setTitleReview(text) }}

                        />
                    </View>


                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: 'grey',
                        borderBottomWidth: 5,
                    }}
                />

            </View>
            <TouchableOpacity onPress={() => {
                if (rate != 0) {
                    submitChanges();
                } else
                    Toast.show("Rate the product atleast", Toast.SHORT);
            }} style={{ backgroundColor: 'coral', height: 40, borderRadius: 1, elevation: 1, marginHorizontal: 4, marginVertical: 5, justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },


});
