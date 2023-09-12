import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
const ProductHeader = () => {
    const cartQuantity = useSelector((state) => state.cart.totalProduct)
    const navigation = useNavigation();
    const BadgedIcon = withBadge(cartQuantity)(Icon);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SoleCart</Text>
            <View style={{marginRight:10}}>
                <BadgedIcon
                    type="MaterialIcons"
                    name="shopping-cart"
                    color="white" size={32}
                    onPress={() => navigation.navigate('CartScreen')}
                />
            </View>

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
