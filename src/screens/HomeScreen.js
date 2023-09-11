import React from 'react';
import { View, FlatList } from 'react-native';

import ProductItem from '../components/ProductItem';
import products from '../global/data';

const HomeScreen = () => {
    const addToCart = (product, quantity) => {
        // Implement your logic to add the product to the cart
        console.log(`Added ${quantity} ${product.name} to cart.`);
    };

    return (
        <View>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductItem product={item} onAddToCart={addToCart} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default HomeScreen;
