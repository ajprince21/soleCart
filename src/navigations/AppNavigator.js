import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor: 'green',
    }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="home" color={color} size={26} />)
        }}

      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="person" color={color} size={26} />)
        }}
      />
    </Tab.Navigator>
  );
}


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
      <Stack.Screen name="BottomTab" component={HomeTabs} options={{ headerShown: false }} />
      <Stack.Screen name='CartScreen' component={CartScreen} options={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        title: 'My Cart'
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