import * as React from 'react';
import { Alert, Image } from 'react-native';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Button from '../Button';
import baseStyles from '../../styles';
import emptyCartStyles from './style';

interface EmptyCartProps {}

const EmptyCart = (props: EmptyCartProps) => {
  return (
    <ScrollView
      contentContainerStyle={[
        baseStyles.containerJustify,
        emptyCartStyles.container,
      ]}
    >
      <Image
        style={emptyCartStyles.image}
        source={require('../../assets/noCart.png')}
      />
      <Text style={[baseStyles.headerLg, emptyCartStyles.heading]}>
        Your cart is empty :({' '}
      </Text>
      <Button
        style={emptyCartStyles.button}
        title="GO BACK HOME"
        onPress={() => Alert.alert('goes back')}
      />
    </ScrollView>
  );
};

export default EmptyCart;
