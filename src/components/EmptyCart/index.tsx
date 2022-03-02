import * as React from 'react';
import { Alert, Image } from 'react-native';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Button';
import baseStyles from '../../styles';
import emptyCartStyles from './style';

interface EmptyCartProps {}

const EmptyCart = (props: EmptyCartProps) => {
  const navigation = useNavigation();

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
        Seu carrinho está vazio :({' '}
      </Text>
      <Button
        style={emptyCartStyles.button}
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
};

export default EmptyCart;
