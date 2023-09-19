import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        checkUserData();
    }, []);

    const checkUserData = async () => {
        try {
            // Retrieve the JSON string from AsyncStorage using the key
            const userDataJSON = await AsyncStorage.getItem('userData');

            // If user data is found, navigate to the BottomTab screen
            if (userDataJSON) {
                setTimeout(() => {
                    navigation.replace('BottomTab');
                }, 3000);

            } else {
                setTimeout(() => {
                    navigation.replace('LoginScreen');
                }, 3000);
            }
        } catch (error) {
            console.error('Error checking user data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Image source={require('../images/logo_round.png')} style={styles.logo} />
            <Text style={styles.text}>Sole Cart</Text>
        </View>
    );
}

const { width } = Dimensions.get('window');

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
