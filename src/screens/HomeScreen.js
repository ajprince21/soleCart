import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Text,
    Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/slice/ProductSlice';

import ProductItem from '../components/ProductItem';
import ProductHeader from '../components/ProductHeader';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)

    useEffect(() => {
       
    }, []);

    const addToCart = (product, quantity) => {
        // Implement your logic to add the product to the cart
        console.log(`Added ${quantity} ${product.name} to cart.`);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="green" 
                barStyle="light-content" 
            />
            <ProductHeader />
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductItem product={item} onAddToCart={addToCart} />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 160 }}
            />
            {/* <View style={styles.cartButtonContainer}>
                <Pressable style={styles.cartButton} onPress={() => console.log('Go to cart pressed')} android_ripple={{ color: '#808080' }}>
                    <Text style={styles.cartButtonText}>Go to Cart</Text>
                </Pressable>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cartButtonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'white',
    },
    cartButton: {
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: 'green',
    },
    cartButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
