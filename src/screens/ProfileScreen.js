import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { useSelector } from 'react-redux';
import products from '../global/data';
import notifee, { AndroidStyle } from '@notifee/react-native';


const ProfileScreen = () => {



  const storeProductsInFirestore = async () => {
    try {
      const batch = firestore().batch();

      products.forEach(async (product) => {
        const { image, ...productData } = product;

        try {
          // Get the local image file path
          const imagePath = image;
          console.log('1 imagePath', imagePath)
          // Create a reference for the image in Firebase Storage
          const imageRef = storage().ref(`product_images/${product.id}.jpg`);
          console.log('1 imageRef', imageRef)
          // Upload the image from the local file path to Firebase Storage
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/product_images/${product.id}.jpg`;
          await imageRef.putFile(pathToFile);

          // Get the download URL of the uploaded image
          const imageUrl = await imageRef.getDownloadURL();

          // Add the image URL to the product data
          productData.image = imageUrl;

          const productRef = firestore().collection('products').doc(product.id.toString());

          // Set the product data (including the image URL) in Firestore
          batch.set(productRef, productData);
        } catch (imageUploadError) {
          console.error('Error uploading image:', imageUploadError);
        }
      });



      // Commit the batch write
      await batch.commit();
      console.log('Products (with images) stored in Firestore successfully');
    } catch (error) {
      console.error('Error storing products (with images) in Firestore:', error);
    }
  };


  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Sale is LIVE',
      body: 'Hurry up to get SALE deals..',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', 
        style: { type: AndroidStyle.BIGPICTURE, picture: 'https://picsum.photos/seed/picsum/200/300' },
        timestamp: Date.now() + 300000,
        showTimestamp: true,
        chronometerDirection: 'down',
        showChronometer: true,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      {/* <TouchableOpacity style={styles.addButton} onPress={storeProductsInFirestore}>
        <Text style={styles.buttonText}>Store Products in Firestore</Text>
      </TouchableOpacity> */}
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
