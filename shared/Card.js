import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Card = props => {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{props.header}</Text>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <FlatList data={props.images}
                        renderItem={itemData => (
                            <View >
                                <TouchableOpacity style={styles.Container} onPress={props.pressHandler.bind()}>
                                    <Image style={styles.image} source={itemData.item.image} />
                                    <Text style={styles.text}>{itemData.item.textItem}</Text>
                                    <Text style={styles.offerText}>{itemData.item.textOff+" % off !"}</Text>
                                </TouchableOpacity>
                            </View>
                        )} />
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({

    headerContainer: {
        paddingLeft: 30,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
    },

    header: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    icon: {
        height: 35,
        width: 35,
        paddingHorizontal: 15,
    },

    cardContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },

    card: {
        flex: 1,
        width: '90%',
        elevation: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },

    Container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 0.4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        height: 80,
        width: 80,
        marginVertical: 20,
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    text: {
        color: 'red',
    },

    offerText: {
        color: 'darkgreen',
        fontSize: 16,
    }

});

export default Card;