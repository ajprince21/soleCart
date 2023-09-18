import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('BottomTab');
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Image source={require('../images/logo_round.png')} style={styles.logo} />
            <Text style={styles.text}>Sole Cart</Text>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
    },
    text: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SplashScreen;
