import React, { useState } from 'react';
import { ScrollView, View, Alert, Image } from 'react-native';
import { Input, Button, Text, Icon } from '@rneui/base';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddProductScreen = () => {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        brand: '',
        price: 0,
        discountedPrice: null,
        color: '',
        size: '',
        image: null,
        description: '',
        category: '',
        rating: 0.1,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    });

    const selectImage = (fromCamera) => {
        const options = {
            mediaType: 'photo',
            quality: 0.7,
        };

        if (fromCamera) {
            launchCamera(options, (response) => {
                handleImageResponse(response);
            });
        } else {
            launchImageLibrary(options, (response) => {
                handleImageResponse(response);
            });
        }
    };

    const handleImageResponse = async (response) => {
        if (response.didCancel) {
            console.log('Image selection was canceled.');
        } else if (response.error) {
            console.error('ImagePicker Error: ', response.error);
        } else {
            try {
                const selectedAsset = response.assets[0];
                setProduct({ ...product, image: selectedAsset.uri });
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Failed to upload image');
            }
        }
    };

    const handleAddProduct = async () => {
        try {
          const id = uuid.v4();
          
          // Create a reference to the Firebase Storage bucket
          const storageRef = firebase.storage().ref();
          
          // Create a reference to the image file with the product's ID
          const imageRef = storageRef.child(`images/${id}.jpg`);
          
          // Convert the image URI to a blob
          const response = await fetch(product.image);
          const blob = await response.blob();
          
          // Upload the blob to Firebase Storage
          await imageRef.put(blob);
      
          // Get the download URL of the uploaded image
          const imageUrl = await imageRef.getDownloadURL();
      
          // Update the product's image URL
          product.image = imageUrl;
      
          // Update the product in Firestore
          const productRef = firestore().collection('products').doc(product.id);
          await productRef.update({ image: imageUrl });
      
          Alert.alert('Product image updated successfully');
          // You can navigate to another screen or reset the form here
        } catch (error) {
          console.error('Error updating product image:', error);
          Alert.alert('Failed to update product image');
        }
      };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text h4>Product Name</Text>
                <Input
                    placeholder="Enter product name"
                    onChangeText={(text) => setProduct({ ...product, name: text })}
                    value={product.name}
                />
                <Text h4>Brand</Text>
                <Input
                    placeholder="Enter brand"
                    onChangeText={(text) => setProduct({ ...product, brand: text })}
                    value={product.brand}
                />
                <Text h4>Price</Text>
                <Input
                    placeholder="Enter price"
                    onChangeText={(text) => setProduct({ ...product, price: text })}
                    value={product.price.toString()}
                    keyboardType="numeric"
                />

                <Text h4>Discounted Price</Text>
                <Input
                    placeholder="Enter discounted price"
                    onChangeText={(text) => setProduct({ ...product, discountedPrice: text })}
                    value={product.discountedPrice ? product.discountedPrice.toString() : ''}
                    keyboardType="numeric"
                />

                <Text h4>Color</Text>
                <Input
                    placeholder="Enter color"
                    onChangeText={(text) => setProduct({ ...product, color: text })}
                    value={product.color}
                />

                <Text h4>Size</Text>
                <Input
                    placeholder="Enter size"
                    onChangeText={(text) => setProduct({ ...product, size: text })}
                    value={product.size}
                />

                <Text h4>Description</Text>
                <Input
                    placeholder="Enter description"
                    onChangeText={(text) => setProduct({ ...product, description: text })}
                    value={product.description}
                />

                <Text h4>Category</Text>
                <Input
                    placeholder="Enter category"
                    onChangeText={(text) => setProduct({ ...product, category: text })}
                    value={product.category}
                />

                <Text h4>Rating</Text>
                <Input
                    placeholder="Enter rating"
                    onChangeText={(text) => setProduct({ ...product, rating: parseFloat(text) })}
                    value={product.rating.toString()}
                    keyboardType="numeric"
                />

                <View style={{ alignItems: 'center' }}>
                    {product?.image
                        ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15, marginVertical: 10 }} >
                            <Image source={{ uri: product.image }} style={{ width: 120, height: 120 }} />
                            <Icon
                                raised
                                name='delete-outline'
                                type='MaterialIcons'
                                color='#f50'
                                onPress={() => setProduct({ ...product, image: null })}

                            />

                        </View>
                        : <>
                            <Button
                                color="secondary"
                                title="Capture Image"
                                onPress={() => selectImage(true)}
                                iconContainerStyle={{ marginLeft: 10 }}
                                titleStyle={{ fontWeight: '700' }}
                                buttonStyle={{
                                    backgroundColor: '#f4c20d',
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 30,
                                }}
                                containerStyle={{
                                    width: 200,
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                }}
                            />
                            <Button
                                title="Select Image"
                                onPress={() => selectImage(false)}
                                iconContainerStyle={{ marginLeft: 10 }}
                                titleStyle={{ fontWeight: '700' }}
                                buttonStyle={{
                                    backgroundColor: '#db3236',
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 30,
                                }}
                                containerStyle={{
                                    width: 200,
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                }}
                            />
                        </>
                    }
                    <Button
                        title="Add Product"
                        onPress={handleAddProduct}
                        iconContainerStyle={{ marginLeft: 10 }}
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: '#3cba54',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
};

export default AddProductScreen;
