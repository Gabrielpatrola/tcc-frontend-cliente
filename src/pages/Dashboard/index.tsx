/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Logo from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  FilterContainer,
  Title,
  CategoryContainer,
  CategorySlider,
  CategoryItem,
  CategoryItemTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodPricing,
} from './styles';

// eslint-disable-next-line import/extensions
import * as All from '../../assets/details';

interface Food {
  id: number | string;
  name: string;
  value: number;
  category: number | string;
  image_url: string;
  formattedPrice: string;
}

interface Category {
  id: number;
  title: string;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function handleNavigate(id: number | string): Promise<void> {
    navigation.navigate('FoodDetails', { id });
  }

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      try {
        if (!searchValue.length && selectedCategory === undefined) {
          firestore()
            .collection('products')
            .onSnapshot(querySnapshot => {
              const products: Food[] = [];

              querySnapshot.forEach(documentSnapshot => {
                const { image } = documentSnapshot.data();
                products.push({
                  name: documentSnapshot.data().name,
                  value: documentSnapshot.data().value,
                  category: documentSnapshot.data().category,
                  formattedPrice: formatValue(documentSnapshot.data().value),
                  image_url: image,
                  id: documentSnapshot.id,
                });
              });

              setFoods(products);
            });
        } else if (searchValue.length) {
          const filterSearch = foods.filter(item =>
            item.name.includes(searchValue),
          );

          setFoods(filterSearch);
        } else if (selectedCategory !== undefined) {
          const filterSearchCategory = foods.filter(
            item => Number(item.category) === selectedCategory,
          );

          setFoods(filterSearchCategory);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Erro ao carregar lista de pratos');
      }
    }

    loadFoods();
  }, [selectedCategory, searchValue]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      try {
        setCategories([
          {
            id: 1,
            title: 'Comida',
            image_url: require('../../assets/6.png'),
          },
          {
            id: 2,
            title: 'Bebida',
            image_url: require('../../assets/7.png'),
          },
          {
            id: 3,
            title: 'Sobremesa',
            image_url: require('../../assets/39.png'),
          },
          {
            id: 4,
            title: 'Combo',
            image_url: require('../../assets/40.png'),
          },
        ]);
      } catch (error) {
        Alert.alert('Erro ao carregar categorias');
      }
    }

    loadCategories();
  }, []);

  function handleSelectCategory(id: number): void {
    setSelectedCategory(selectedCategory === id ? undefined : id);
    setSearchValue('');
  }

  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <Icon
          name="log-out"
          size={24}
          color="#FFB84D"
          onPress={() => navigation.navigate('Home')}
        />
      </Header>
      <FilterContainer>
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Qual comida você procura?"
        />
      </FilterContainer>
      <ScrollView>
        <CategoryContainer>
          <Title>Categorias</Title>
          <CategorySlider
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map(category => (
              <CategoryItem
                key={category.id}
                isSelected={category.id === selectedCategory}
                onPress={() => handleSelectCategory(category.id)}
                activeOpacity={0.6}
                testID={`category-${category.id}`}
              >
                <Image
                  style={{ width: 56, height: 56 }}
                  source={category.image_url}
                />
                <CategoryItemTitle>{category.title}</CategoryItemTitle>
              </CategoryItem>
            ))}
          </CategorySlider>
        </CategoryContainer>
        <FoodsContainer>
          <Title>Produtos</Title>
          <FoodList>
            {foods.map(food => (
              <Food
                key={food.id}
                onPress={() => handleNavigate(food.id)}
                activeOpacity={0.6}
                testID={`food-${food.id}`}
              >
                <FoodImageContainer>
                  <Image
                    style={{ width: 88, height: 88 }}
                    source={All[`${food.image_url}`]}
                  />
                </FoodImageContainer>
                <FoodContent>
                  <FoodTitle>{food.name}</FoodTitle>
                  <FoodPricing>{food.formattedPrice}</FoodPricing>
                </FoodContent>
              </Food>
            ))}
          </FoodList>
        </FoodsContainer>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
