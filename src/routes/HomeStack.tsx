import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';
import TabRoutes from './tab.routes';

import Home from '../pages/Home';
import FoodDetails from '../pages/FoodDetails';

const App = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <App.Navigator initialRouteName="MainBottom">
      <App.Screen
        name="MainBottom"
        component={TabRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <App.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#FFB84D"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRight: () => <Icon name="heart" size={24} color="#FFB84D" />,
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Prato - Massas',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: '#C72828',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />
    </App.Navigator>
  );
};

export default HomeStack;
