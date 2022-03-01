/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { UseMounted } from '../../hooks/UseMounted';
import { getPrice } from '../../utils/CommonUtil';
import {
  getCombinedCart,
  getProducts,
  getUpdateCart,
  subscribeToCartUpdate,
} from '../../utils/FirestoreUtil';
import { AuthContext } from '../../routes/AuthProvider';
import { Cart, Product } from '../../interfaces';

export default function UseCart() {
  let subscriber: () => void;
  const { user } = useContext(AuthContext);
  const [list, setList] = useState<Cart[]>([]);
  const [price, setPrice] = useState<number>();
  const [cartLoading, setCartLoading] = useState(true);
  const isMounted = UseMounted();

  const updateToCart = async (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    const Products = (await getProducts([change.doc.data().id])) as Product[];
    setList(old => {
      const cart = getUpdateCart(old, change, Products);
      setPrice(getPrice(cart));
      return cart;
    });
  };

  async function getCart() {
    if (!user) return;

    try {
      const cart = await getCombinedCart(user);
      isMounted && setList(cart);

      isMounted && setPrice(getPrice(cart));

      // Get the real time update on cart
      subscriber = subscribeToCartUpdate(user, updateToCart);
    } catch (e) {
      console.log(e);
      Alert.alert('something went wrong');
    }
    setCartLoading(false);
  }

  useEffect(() => {
    getCart();

    return () => {
      subscriber && subscriber();
    };
  }, [list]);
  return { list, setList, price, cartLoading };
}
