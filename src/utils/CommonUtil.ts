/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-plusplus */
import { Cart, Product } from '../interfaces';

export const getCombinedArray = (cart: Cart[], products: Product[]) => {
  const combinedArray = [];
  for (let i = 0; i < cart.length; i++) {
    combinedArray.push({
      ...cart[i],
      ...products.find(item => item.id === cart[i].id),
    });
    cart;
  }

  return combinedArray as Cart[];
};

export const getPrice = (cart: Cart[]) => {
  let amount = 0;

  cart.forEach(item => {
    amount += item.value * item.count;
  });
  return amount;
};

export const updateOrAdd = (old: Cart[], item: Cart) => {
  const i = old.findIndex(_item => _item.id == item.id);
  if (i > -1) {
    old[i] = item;
  } else {
    old.push(item);
  }
  return [...old];
};
