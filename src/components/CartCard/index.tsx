/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Cart } from '../../interfaces';
import baseStyles from '../../styles';
import cartCardStyles from './style';
import * as All from '../../assets/details';

import { addToCart, removeFromCart } from '../../utils/FirestoreUtil';
import { AuthContext } from '../../routes/AuthProvider';

interface CartCardProps {
  item: Cart;
}

const CartCard: React.FC = ({ props }) => {
  const { item }: CartCardProps = props;
  const [quantity, setQuantity] = useState(item.count);
  const { user } = useContext(AuthContext);

  const handleIncrementFood = async () => {
    try {
      setQuantity(quantity + 1);
      await addToCart(user, item.id as number, quantity - 1);
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong');
    }
  };

  const handleDecrementFood = async () => {
    try {
      setQuantity(quantity - 1);

      await removeFromCart(user, item.id as number);
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View style={[cartCardStyles.card, baseStyles.cardShadow]}>
      <Image source={All[`${item.image}`]} style={cartCardStyles.image} />
      <View style={cartCardStyles.desc}>
        <Text style={[cartCardStyles.title, baseStyles.headerSm]}>
          {item.name}
        </Text>
        <Icon
          size={15}
          color="#6C6C80"
          name="minus"
          onPress={handleDecrementFood}
          testID="decrement-food"
        />
        <Text style={[baseStyles.subHeader, cartCardStyles.qty]}>
          Quantidade: {item.count}
        </Text>
        <Icon
          size={15}
          color="#6C6C80"
          name="plus"
          onPress={handleIncrementFood}
          testID="decrement-food"
        />
        <Text style={baseStyles.headerSm}>R${item.value}</Text>
      </View>
    </View>
  );
};

export default CartCard;
