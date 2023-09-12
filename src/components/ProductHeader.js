import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const ProductHeader = () => {
    const cartQuantity = useSelector((state)=> state.cart.totalProduct)
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SoleCart</Text>
            <TouchableOpacity style={styles.cartContainer} onPress={()=> navigation.navigate('CartScreen')}>
                <Icon name="shopping-cart" size={24} color="white" />
                <Text style={styles.cartQuantity}>{cartQuantity}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        padding: 10,
    },
    heading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartQuantity: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default ProductHeader;
