/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState, useContext } from 'react';
import { Image } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import formatValue from '../../utils/formatValue';
import { AuthContext } from '../../routes/AuthProvider';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: number;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadOrders() {
      try {
        firestore()
          .collection('orders')
          .where('user_uid', '==', user.uid)
          .onSnapshot(querySnapshot => {
            const products: Food[] = [];
            querySnapshot.forEach(documentSnapshot => {
              products.push({
                value: documentSnapshot.data().value,
                description: documentSnapshot.data().status,
                formattedValue: formatValue(documentSnapshot.data().amount),
                id: documentSnapshot.id,
              });

              setOrders(products);
            });
          });
      } catch (error) {
        console.log(error);
      }
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={require('../../assets/5.jpeg')}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>Pedido #{item.id}</FoodTitle>
                <FoodDescription>
                  status:{' '}
                  {item.description === 'Success'
                    ? 'Finalizado'
                    : 'Em andamento'}
                </FoodDescription>
                <FoodPricing>{item.formattedValue}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
