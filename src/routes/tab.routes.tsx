import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';
import Orders from '../pages/Orders';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: '#C72828',
      tabBarLabelStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: '600',
      },
      tabBarInactiveTintColor: '#B7B7CC',
    }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => <Icon size={25} name="list" color={color} />,
        title: 'Listagem',
        headerShown: false,
      }}
      name="DashboardStack"
      component={Dashboard}
    />
    <Tab.Screen
      name="Orders"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon size={25} name="shopping-bag" color={color} />
        ),
        title: 'Pedidos',
        headerShown: false,
      }}
      component={Orders}
    />

    <Tab.Screen
      name="Favorites"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon size={25} name="heart" color={color} />
        ),
        title: 'Favoritos',
        headerShown: false,
      }}
      component={Favorites}
    />
  </Tab.Navigator>
);

export default TabRoutes;
