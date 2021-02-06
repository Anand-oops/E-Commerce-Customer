import React from 'react';
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity ,TextInput} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import StarRating from "react-native-star-rating";
import { AntDesign } from '@expo/vector-icons';
import Firebase from "../firebaseConfig";
import Counter from "react-native-counters";
import Toast from 'react-native-simple-toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CheckBox } from 'react-native-elements'

export default function WriteReview(props) {

    const { user } = useContext(AuthContext);
const [desReview,setdesReview]=useState('');
const [titleReview,setTitleReview]=useState('');
    const [item,setItem]=useState(props.route.params.item);
    const [rate,setRating]=useState(0);
    const Rating=(rating)=>{
        setRating(rating);
        console.log("rating",rating);

    }
    const submitChanges=()=>{
        console.log("des review",desReview);
        console.log('title rev',titleReview);
        console.log('rating',rate);
        var rev ={
          revId:user.uid,
          revTitle:titleReview,
          revDesc:desReview
        }

        // Firebase.database().ref(`Customers/${user.uid}/wishlist`).set(rev).then(()=>{
        //     Toast.show("Review Submitted",Toast.SHORT);
        // })
    }


    return (
        <ScrollView>
            <View style={styles.main}>
                
                    <View style={{ margin: 4, borderColor: 'white', borderRadius: 1, elevation: 1, flexDirection: 'row' }}>
                        <View style={{ borderColor: 'white', borderRadius: 1, elevation: 1, flex: 1 }}>
                            <Image
                                style={{ padding: 2, height: 150, width: '98%', resizeMode: 'stretch', alignSelf: 'center', }}
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
                   selectedStar={(rating)=>{Rating(rating)}}                
                />
                <TouchableOpacity onPress={()=>{setRating(0)}} style={{elevation:1,borderRadius:1,width:50,margin:8,backgroundColor:'coral'}}>
                    <Text style={{alignSelf:'center',fontWeight:'bold'}}>Clear</Text>
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
                    <View  style={{height:200,marginHorizontal:8,marginVertical:6,borderRadius:1,elevation:1}}>
                        <TextInput 
                        placeholder={"What did you like or dislike? Did this product fulfilled your requirements?"}
                        multiline={true}
                        style={{height:40,margin:6,color:'grey'}}
                        value={desReview}
                        onChangeText={(text)=>setdesReview(text)}
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
                    <View  style={{height:100,marginHorizontal:8,marginVertical:6,borderRadius:1,elevation:1}}>
                        <TextInput 
                        style={{height:40,marginHorizontal:6,color:'grey'}}
                        placeholder={'Sum up your review in one line.'}
                        value={titleReview}
                        onChangeText={(text)=>{setTitleReview(text)}}

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
            <TouchableOpacity onPress={()=>{submitChanges()}} style={{backgroundColor:'coral',height:40,borderRadius:1,elevation:1,marginHorizontal:4,marginVertical:5,justifyContent:'center'}}>
                <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>Submit</Text>
            </TouchableOpacity>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex:1
    },


});
