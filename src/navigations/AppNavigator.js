import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CartScreen' component={CartScreen} options={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor:'white',
        headerTitleAlign: 'center',
        headerTitleStyle:{
          fontSize: 18,
          fontWeight: 'bold',
        },
        title:'My Cart'
      }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}