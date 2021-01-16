import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import Firebase from '../firebaseConfig';
import Card from '../shared/Card'
import { SliderBox } from 'react-native-image-slider-box';

const HomeScreen = () => {

    const { user } = useContext(AuthContext);

    Firebase.database().ref(`/Customers/${user.uid}`).update({
        id: user.uid,
        email: user.email,
        password: user.providerId,
    })

    const [imagesDeck, setImagesDeck] = useState([])
    const [imagesDeckCall, setImagesDeckCall] = useState(true)
    const [cards, setCards] = useState([])
    const [cardsCall, setCardsCall] = useState(true)

    

    Firebase.database().ref('ImagesDeck/').on('value', function (data) {
        if (imagesDeckCall) {
            if (data.val()) {
                console.log("ImagesDeck Called")
                setImagesDeck(data.val())
                setImagesDeckCall(false);
            }
        }
    })

    Firebase.database().ref('ImagesDeck/').on('child_changed', function () {
        console.log("ImagesDeck Child Changed")
        setImagesDeckCall(true)
    })

    Firebase.database().ref('Cards/').once('value', function (data) {
        if (cardsCall) {
            if (data.val()) {
                console.log("Cards Called")
                setCards(data.val())
                setCardsCall(false);
            }
        }
    })

    Firebase.database().ref('Cards/').on('child_changed', function () {
        console.log("Card Child Changed")
        setCardsCall(true);
    });

    // Firebase.database().ref('Cards/').on('child_added', function () {
    //     console.log("Card Child Changed")
    //     setCardsCall(true);
    // });

    return (
        <View style={styles.screen}>
            <StatusBar style='light' />
            <ScrollView>
                <View>
                    <View style={styles.imageDeck}>
                        <SliderBox
                            images={imagesDeck}
                            autoplay={true}
                            sliderBoxHeight={175}
                            circleLoop={true}
                            resizeMode={'contain'}
                        />
                    </View>
                </View>
                <View>
                    {cards.map(card => <Card key={card.key} images={card.images} header={card.header} />)}
                </View>
            </ScrollView>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    screen: {
        paddingTop: 0,
        flex: 1,
    },

    imageDeck: {
        elevation: 5,
        height: 175,
        borderColor: 'black',
        borderWidth: 1,
    },

    offerCards: {
        backgroundColor: 'white'
    }

});