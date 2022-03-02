/* eslint-disable no-use-before-define */
/* eslint-disable no-return-await */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Cart, Product } from '../interfaces';
import { getCombinedArray, updateOrAdd, getPrice } from './CommonUtil';

const PRODUCT_COLLECTION = 'products';
const CUSTOMERS_COLLECTION = 'users';
const CART_COLLECTION = 'cart';
const ORDER_COLLECTION = 'orders';

export async function getProducts(ids?: number[]): Promise<Product[]> {
  try {
    if (ids && ids.length > 0) {
      const products = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where(firestore.FieldPath.documentId(), 'in', ids)
        .get();
      return products.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      }) as Product[] | any;
    }
    const products = await firestore().collection(PRODUCT_COLLECTION).get();
    return products.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    }) as Product[] | any;
  } catch (error) {
    console.log(error);
  }
  return [];
}

const getCart = async (
  user: FirebaseAuthTypes.User,
): Promise<{ cart: Cart[]; cartCollection: any }> => {
  const cartCollection = firestore()
    .collection(CUSTOMERS_COLLECTION)
    .doc(user.uid)
    .collection(CART_COLLECTION);
  const cartsFir = await cartCollection.get();
  const cart = cartsFir.docs.map(doc => doc.data()) as Cart[];
  return { cart, cartCollection };
};

export const addToCart = async (
  user: FirebaseAuthTypes.User | null,
  productId: number,
  foodQuantity: number,
) => {
  if (!user) {
    return;
  }

  const { cart, cartCollection } = await getCart(user);

  if (cart && cart.find(item => item.id === productId)) {
    const document = cartCollection.doc(productId.toString());

    await document.update({
      count: firestore.FieldValue.increment(foodQuantity),
    });
  } else {
    cartCollection.doc(productId.toString()).set({
      id: productId,
      count: foodQuantity,
    });
  }
};

export const removeFromCart = async (
  user: FirebaseAuthTypes.User | null,
  productId: number,
) => {
  if (!user) {
    return;
  }

  const { cart, cartCollection } = await getCart(user);

  if (cart && cart.find(item => item.id === productId)) {
    const document = cartCollection.doc(productId.toString());
    const auxiliar = cart.find(item => item.id === productId);

    if (auxiliar.count > 1) {
      await document.update({
        count: firestore.FieldValue.increment(-1),
      });
    } else {
      document.delete();
    }
  }
};

export const getCombinedCart = async (user: FirebaseAuthTypes.User) => {
  const { cart } = await getCart(user);
  const productIds = cart.map(item => item.id);
  const productArray = (await getProducts(productIds)) as Product[];
  return getCombinedArray(cart, productArray);
};

export const subscribeToCartUpdate = (
  user: FirebaseAuthTypes.User,
  updateToCart: (
    change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>,
  ) => void,
) => {
  return firestore()
    .collection(CUSTOMERS_COLLECTION)
    .doc(user.uid)
    .collection(CART_COLLECTION)
    .onSnapshot(snapshot => {
      if (!user) {
        snapshot.docChanges().forEach(change => {
          updateToCart(change);
        });
      }
    });
};

export const getUpdateCart = (
  old: Cart[],
  change: FirebaseFirestoreTypes.DocumentChange<FirebaseFirestoreTypes.DocumentData>,
  product: Product[],
) => {
  const data = change.doc?.data() as Cart;
  const newArray = getCombinedArray([data], product);
  return updateOrAdd(old, newArray[0]);
};

export const deleteCart = async (userUid: string) => {
  const snapshot = await firestore()
    .collection(CUSTOMERS_COLLECTION)
    .doc(userUid)
    .collection(CART_COLLECTION)
    .get();
  snapshot.docs.forEach(doc => {
    doc.ref.delete();
  });
};

export const createOrder = async (
  cart: Cart[],
  paymentId: string,
  userUid: FirebaseAuthTypes.User,
  amount: number,
) => {
  const order = firestore().collection(ORDER_COLLECTION).doc(paymentId);
  order.set({ user_uid: userUid.uid, status: 'initiated', amount });

  const orderCart = order.collection(CART_COLLECTION);
  cart.forEach(product => {
    orderCart
      .doc(product.id.toString())
      .set({ value: product.value, count: product.count });
  });

  return await completeOrder(paymentId, userUid.uid);
};

export const completeOrder = async (paymentId: string, userId: string) => {
  const order = firestore().collection(ORDER_COLLECTION).doc(paymentId);
  order.update({ status: 'Success' });
  await deleteCart(userId);
};

export const getAmountAndCart = async user => {
  const { cart } = await getCart(user);
  const products = await getProducts(cart.map(data => data.id));
  const combinedCart = getCombinedArray(cart, products);
  return { amount: getPrice(combinedCart), cart: combinedCart };
};
