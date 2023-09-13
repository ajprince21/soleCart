import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const CartItem = ({ product }) => {
    const { name, totalPrice, quantity, image } = product;

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={image} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>Total Price: ₹ {totalPrice}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center',marginVertical:5 }}>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text  adjustsFontSizeToFit numberOfLines={1} style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
            <Icon
                raised
                name='delete-outline'
                type='MaterialIcons'
                color='#f50'
                onPress={() => console.log('hello')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
        borderRadius: 8,
        margin: 8
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 40
    },
    details: {
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: 'gray',
    },
    quantity: {
        fontSize: 16,
        color: '#000000',
        width:50,
        textAlign:'center',
        paddingHorizontal:5
    },
    quantityButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingHorizontal: 5,
        paddingVertical: 4,
        width:40, alignItems:'center'
    },
    quantityButtonText: {
        fontSize: 20,
        color: '#000000',
    },
});

export default CartItem;
