/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
  useContext,
} from 'react';
import { Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import * as All from '../../assets/details';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodPricing,
  Title,
  TotalContainer,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
  AdittionalItemText,
} from './styles';

import { addToCart } from '../../utils/FirestoreUtil';
import { AuthContext } from '../../routes/AuthProvider';

interface Params {
  id: undefined | string;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number | string;
  name: string;
  value: number;
  category: number | string;
  image_url: string;
  formattedPrice: string;
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useContext(AuthContext);

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      try {
        firestore()
          .collection('products')
          .doc(routeParams.id)
          .get()
          .then(item => {
            if (item.exists) {
              setFood({
                name: item.get('name'),
                value: item.get('value'),
                formattedPrice: formatValue(item.get('value')),
                category: item.get('category'),
                image_url: item.get('image'),
                id: item.id,
              });
            }
          });
      } catch (error) {
        Alert.alert('Erro ao carregar prato');
      }
    }

    loadFood();
  }, [routeParams]);

  const handlePress = async () => {
    /*     setLoading(true); */
    try {
      await addToCart(user, food.id as number, foodQuantity);
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong');
    }
    /*     setLoading(false); */
  };

  function handleIncrementFood(): void {
    setFoodQuantity(foodQuantity + 1);
  }

  function handleDecrementFood(): void {
    setFoodQuantity(foodQuantity > 1 ? foodQuantity - 1 : 1);
  }

  /*   const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      api.delete(`/favorites/${food.id}`);
    } else {
      const newFavorite = { ...food };

      api.post('/favorites', newFavorite);
    }

    setIsFavorite(!isFavorite);
  }, [isFavorite, food]); */

  const cartTotal = useMemo(() => {
    const foodPrice = food.value * foodQuantity;

    return formatValue(foodPrice);
  }, [food, foodQuantity]);

  /*   async function handleFinishOrder(): Promise<void> {
    const newOrder = { ...food, product_id: food.id };
    delete newOrder.id;

    await api.post('/orders', newOrder);

    navigation.goBack();
  } */

  // Calculate the correct icon name
  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    // Add the favorite icon on the right of the header bar
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 345, height: 183 }}
                source={All[`${food.image_url}`]}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodPricing>{food.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <PriceButtonContainer>
            <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color="#6C6C80"
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <AdittionalItemText testID="food-quantity">
                {foodQuantity}
              </AdittionalItemText>
              <Icon
                size={15}
                color="#6C6C80"
                name="plus"
                onPress={handleIncrementFood}
                testID="decrement-food"
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={handlePress}>
            <ButtonText>Adicionar ao carrinho</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;
