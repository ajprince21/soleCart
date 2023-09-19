import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store user data in AsyncStorage
const storeUserData = async (userData) => {
    try {
        // Convert the user data object to a JSON string
        const userDataJSON = JSON.stringify(userData);

        // Store the JSON string in AsyncStorage with a key
        await AsyncStorage.setItem('userData', userDataJSON);
    } catch (error) {
        console.error('Error storing user data:', error);
    }
};

// Function to retrieve user data from AsyncStorage
const getUserData = async () => {
    try {
        // Retrieve the JSON string from AsyncStorage using the key
        const userDataJSON = await AsyncStorage.getItem('userData');

        // If no data is found, return null
        if (!userDataJSON) {
            return null;
        }

        // Parse the JSON string back to an object
        const userData = JSON.parse(userDataJSON);

        return userData;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

// Function to remove user data from AsyncStorage
const removeUserData = async () => {
    try {
        // Remove the user data from AsyncStorage using the key
        await AsyncStorage.removeItem('userData');
    } catch (error) {
        console.error('Error removing user data:', error);
    }
};

export { storeUserData, getUserData, removeUserData };
