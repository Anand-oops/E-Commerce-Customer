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
                                <TouchableOpacity style={styles.Container} onPress={props.pressHandler.bind(this, itemData.item.product)}>
                                    <Image style={styles.image} source={itemData.item.image} />
                                    <View style={{marginLeft:20}}>
                                        <Text style={{ color: '#000a1a' }}>Sub-Category : {itemData.item.product.subCategory}</Text>
                                        <Text style={styles.text}>Sale : {itemData.item.textItem}</Text>
                                        <Text style={styles.offerText}>Sale discount : {itemData.item.textOff + " % off !"}</Text>
                                    </View>
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
        width: '90%',
        marginTop: 30,
        backgroundColor: '#778899',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 50
    },

    header: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign:'center'
    },

    cardContainer: {
        alignItems: 'center',
    },

    card: {
        flex: 1,
        width: '90%',
        elevation: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#DCDCDC',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 20
    },

    Container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'transparent',
        borderWidth: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        height: 100,
        width: 100,
        marginVertical: 20,
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    text: {
        color: '#223240',
    },

    offerText: {
        color: 'darkgreen',
    }

});

export default Card;