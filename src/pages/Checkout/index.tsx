/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import CartCard from '../../components/CartCard';
import Loading from '../Loading';
import Button from '../../components/Button';
import EmptyCart from '../../components/EmptyCart';
import baseStyles from '../../styles';
import UseCart from './UseCart';
import { AuthContext } from '../../routes/AuthProvider';

import { createOrder, deleteCart } from '../../utils/FirestoreUtil';
import checkoutStyles from './style';

const Checkout: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [cartDisabled, setCartDisabled] = useState(false);
  const { list, price, cartLoading } = UseCart();

  const handleDeleteCart = async () => {
    return deleteCart(user.uid);
  };

  const handleCheckout = async () => {
    try {
      setCartDisabled(true);
      await createOrder(list, uuidv4().slice(0, 8), user, price as any);
      setCartDisabled(false);

      return Alert.alert('Pedido feito com sucesso!', 'tudo certo', [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log(error);
      setCartDisabled(false);

      Alert.alert('Something went wrong');
    }
  };

  const ListFooter = () => {
    return (
      <View>
        <View style={baseStyles.line} />
        <View style={checkoutStyles.statement}>
          <Text style={baseStyles.headerMd}>Total: </Text>
          <Text style={baseStyles.headerMd}>R${price}</Text>
        </View>
        <View style={baseStyles.line} />
        <Button
          title="CHECK OUT"
          onPress={() => handleCheckout()}
          isLoading={cartDisabled}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={handleDeleteCart}
            style={{
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#ffc46b',
              }}
            >
              Esvaziar carrinho
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!cartLoading && list.length <= 0) {
    return <EmptyCart />;
  }
  if (cartLoading) {
    return <Loading />;
  }
  return (
    <FlatList
      data={list}
      renderItem={item => <CartCard props={item as any} />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListFooterComponent={ListFooter}
      style={baseStyles.container}
    />
  );
};

export default Checkout;
