import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import firestore, { Filter } from '@react-native-firebase/firestore';
import { storeUserData } from '../global/asyncStorage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Query for email match
            const emailQuery = await firestore()
                .collection('users')
                .where('email', '==', emailOrMobile)
                .where('password', '==', password)
                .get();

            // Query for phone number match
            const phoneQuery = await firestore()
                .collection('users')
                .where('phone_number', '==', emailOrMobile)
                .where('password', '==', password)
                .get();

            // Combine the results
            const querySnapshot = emailQuery.size > 0 ? emailQuery : phoneQuery;

            if (querySnapshot.size > 0) {
                const userData = querySnapshot.docs[0].data();
                storeUserData(userData);
                navigation.replace('BottomTab')

            } else {
                Alert.alert('User not found or credentials are incorrect')
            }
        } catch (error) {
            console.log('Error', error);
        }
    };


    const handleSignUp = () => {
        navigation.navigate('SignupScreen')
    };

    return (
        <View style={styles.container}>
            <Image source={require('../images/logo_round.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email or Mobile"
                value={emailOrMobile}
                onChangeText={(text) => setEmailOrMobile(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink} onPress={handleSignUp}>Sign Up</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#017dbf',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
    },
    signupText: {
        marginTop: 15,
        fontSize: 16,
    },
    signupLink: {
        color: '#017dbf',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
