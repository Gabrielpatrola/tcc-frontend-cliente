/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Cart } from '../../interfaces';
import baseStyles from '../../styles';
import cartCardStyles from './style';

import * as All from '../../assets/details';

interface CartCardProps {
  item: Cart;
}

const CartCard = ({ item }: CartCardProps) => {
  return (
    <View style={[cartCardStyles.card, baseStyles.cardShadow]}>
      <Image source={All[`${item.image}`]} style={cartCardStyles.image} />
      <View style={cartCardStyles.desc}>
        <Text style={[cartCardStyles.title, baseStyles.headerSm]}>
          {item.name}
        </Text>
        <Text style={[baseStyles.subHeader, cartCardStyles.qty]}>
          Quantidade: {item.count}
        </Text>
        <Text style={baseStyles.headerSm}>R${item.value}</Text>
      </View>
    </View>
  );
};

export default CartCard;
