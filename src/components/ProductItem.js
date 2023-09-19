import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductItem = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        if (quantity > 0) {
            onAddToCart(product, quantity);
            setQuantity(0);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={product.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.brand}>{product.brand}</Text>
                <View style={styles.priceContainer}>
                    <Text style={product.discountedPrice !== null ? styles.originalPrice : styles.discountedPrice}>₹ {product.price}</Text>
                    {product.discountedPrice !== null && (
                        <Text style={styles.discountedPrice}>₹ {product.discountedPrice}</Text>
                    )}
                </View>
                {quantity > 0 ? (
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            onPress={() => setQuantity(quantity - 1)}
                            disabled={quantity === 0}
                            style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.quantity}>
                            {quantity}
                        </Text>
                        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 8,
        backgroundColor: '#ffffff',
        elevation: 2,
        borderRadius: 10,
        alignItems: 'center',
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    details: {
        marginLeft: 15,
    },
    name: {
        color: '#000000',
        fontWeight: '600',
    },
    brand: {
        color: '#808080',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    originalPrice: {
        color: '#808080',
        textDecorationLine: 'line-through',
        marginRight: 5,
    },
    discountedPrice: {
        color: 'green',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: 50,
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 20,
        color: '#000000',
    },
    quantity: {
        fontSize: 16,
        color: '#000000',
        width: 70,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    addToCartButton: {
        width: 100,
        borderRadius: 5,
        backgroundColor: 'green',
        alignItems: 'center',
        padding: 3,
        marginVertical: 5,
    },
    addToCartButtonText: {
        color: '#ffffff',
    },
});

export default ProductItem;
