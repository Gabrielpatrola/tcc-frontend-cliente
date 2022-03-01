/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../pages/Signup';
import LoginScreen from '../pages/Login';
import Home from '../pages/Home';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: '#C72828' },
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          cardStyle: { backgroundColor: '#C72828' },
          title: 'Login',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#C72828',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          cardStyle: { backgroundColor: '#C72828' },
          title: 'Cadastro',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#C72828',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}
