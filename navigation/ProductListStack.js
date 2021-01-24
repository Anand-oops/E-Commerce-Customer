import { createStackNavigator } from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import ProductListScreen from "../screens/ProductsListScreen";
import ProductDetailsScreen from '../screens/ProductDetailsScreen'

const screens = {
    ProductList: {
        screen: ProductListScreen, navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Pending list' />,
            }
        }
    },
    ProductDetails: { screen: ProductDetailsScreen }
}

const ProductListStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black', height: 70
        }
    }
});

export default ProductListStack;
