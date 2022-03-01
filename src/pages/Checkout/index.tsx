/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import CartCard from '../../components/CartCard';
import Loading from '../Loading';
import Button from '../../components/Button';
import EmptyCart from '../../components/EmptyCart';
import baseStyles from '../../styles';
import UseCart from './UseCart';
/* import UsePayment from './UsePayment'; */
import checkoutStyles from './style';

const Checkout: React.FC = () => {
  const { list, price, cartLoading } = UseCart();
  /*   const { openPaymentPage, cartDisabled } = UsePayment(setList); */

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
          onPress={() => console.log('here')}
         /*  isLoading={cartDisabled} */
        />
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
      renderItem={CartCard}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListFooterComponent={ListFooter}
      style={baseStyles.container}
    />
  );
};

export default Checkout;
