import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import TutorialListScreen from './screens/TutorialListScreen';
import TutorialDetailScreen from './screens/TutorialDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='TutorialList' component={TutorialListScreen} />
        <Stack.Screen name='TutorialDetail' component={TutorialDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// tes
