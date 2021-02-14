import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, View, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import Firebase from '../firebaseConfig';
import Card from '../shared/Card'
import { SliderBox } from 'react-native-image-slider-box';


const HomeScreen = ({ navigation }) => {

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
    const [loader, setLoader] = useState(true);


    Firebase.database().ref('ImagesDeck/').on('value', function (data) {
        if (imagesDeckCall) {
            if (data.val()) {
                setImagesDeck(data.val())
            }
            setImagesDeckCall(false);
            setLoader(false)
        }
    })

    Firebase.database().ref('Cards/').on('value', function (data) {
        if (cardsCall) {
            if (data.val()) {
                setCards(data.val())
            }
            setCardsCall(false);
        }
    })

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
                    {cards.map(card => <Card key={card.key} images={card.images} header={card.header}
                        pressHandler={(prod) => navigation.navigate("SaleProductDetails", { product: prod })} />)}
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator
                    size='large'
                    color="grey"
                    animating={loader}
                />
            </View>

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
        backgroundColor: '#778899'
    },

    offerCards: {
        backgroundColor: 'white'
    },
    lottie: {
        width: 100,
        height: 100
    }

});