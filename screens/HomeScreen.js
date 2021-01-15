import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, View,ScrollView } from 'react-native';
import Firebase from '../firebaseConfig';
import Card from '../shared/Card'
import { SliderBox } from 'react-native-image-slider-box';

export default function HomeScreen() {

    const { user } = useContext(AuthContext);

    const [imagesDeck, setImagesDeck] = useState([])
    const [cards, setCards] = useState([])

    Firebase.database().ref(`/Customers/${user.uid}`).update({
        id: user.uid,
        email: user.email,
        password: user.providerId,
    })

    Firebase.database().ref(`/ImagesDeck/`).once('value').then((data) => {
        if (data.val()) {
            setImagesDeck(data.val())
        }
    })

    Firebase.database().ref(`/Cards`).once('value').then((data) => {
        if (data.val()) {
            setCards(data.val())
        }
    })

    return (
        <View style={styles.screen}>
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