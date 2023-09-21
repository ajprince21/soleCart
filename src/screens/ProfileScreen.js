import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from '@rneui/base';
import { removeUserData } from '../global/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserData } from '../store/slice/AuthSlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData)
  console.log('User Data', userData);
  const navigateToAddProduct = () => {
    navigation.navigate('AddProductScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ marginLeft: 'auto' }}>
        <Icon
          raised
          name='logout'
          type='MaterialIcons'
          color='#f50'
          onPress={() => {
            removeUserData()
            navigation.replace('LoginScreen')
            dispatch(deleteUserData());
          }}

        />
      </View>
      {userData &&
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
          />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.userMobile}>Mobile: +91 {userData.phone_number}</Text>
        </View>
      }
      <View>
        <Text style={{textAlign: 'center'}}>Admin Section only</Text>
        <TouchableOpacity
          onPress={navigateToAddProduct}
          style={styles.addProductButton}
        >
          <Text style={styles.addProductButtonText}>Add Products</Text>
          <FontAwesome name="angle-right" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addProductButton, { backgroundColor: 'grey' }]}
        >
          <Text style={styles.addProductButtonText}>Update Products</Text>
          <FontAwesome name="angle-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    marginTop: 5,
  },
  userMobile: {
    fontSize: 16,
    marginTop: 5,
  },
  addProductButton: {
    flexDirection: 'row',
    backgroundColor: 'tomato',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 10
  },
  addProductButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
};

export default ProfileScreen;
