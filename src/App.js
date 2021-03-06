import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomePage} from './screen/Home';
import {LoginPage} from './screen/Login';
import {RegisterPage} from './screen/Register';
import {DetailPage} from './screen/Detail';
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login_Screen">
        <Stack.Screen name="Home_Screen" component={HomePage} />
        <Stack.Screen name="Detail_Screen" component={DetailPage} />
        <Stack.Screen name="Login_Screen" component={LoginPage} />
        <Stack.Screen name="Register_Screen" component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
