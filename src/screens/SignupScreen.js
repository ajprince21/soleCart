import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Keyboard, Platform, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignupScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleSignup = async () => {
        if (!formData.email || !formData.phone || !formData.name || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const id = uuid.v4();
        try {
            await firestore()
                .collection('users')
                .doc(id)
                .set({
                    userId:id,
                    name: formData.name,
                    email: formData.email,
                    phone_number: formData.phone,
                    password: formData.password,
                })
                .then(() => {
                    Alert.alert('Fantastic! Your account is live and ready for action');
                    navigation.replace('LoginScreen');
                })
                .catch((error) => {
                    Alert.alert('Error', error.message);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
        setError('');
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const goToSignIn = () => {
        // Navigate to the sign-in screen
        navigation.replace('LoginScreen');
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled" // Dismiss keyboard on tap outside input
            >
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.signInText}>Already have an account?</Text>
                <TouchableOpacity style={styles.signInButton} onPress={goToSignIn}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
    signupButton: {
        width: '100%',
        height: 48,
        backgroundColor: '#017dbf',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 16,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signInText: {
        fontSize: 16,
        marginBottom: 8,
    },
    signInButton: {
        marginBottom: 20,
    },
    signInButtonText: {
        color: '#017dbf',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SignupScreen;
