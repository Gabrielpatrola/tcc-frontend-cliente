import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Product } from '../../interfaces';
import baseStyles from '../../styles';
import gridStyles from './style';

interface GridProps {
  products: Product[];
}

const Grid = (props: GridProps) => {
  const navigation = useNavigation();

  const renderItem: React.FC<{ item: Product; index: number }> = ({
    item,
    index,
  }) => {
    const handlePress = () => {
      navigation.navigate('Product', {
        product: item,
      });
    };

    return (
      <TouchableOpacity
        style={[gridStyles.card, baseStyles.cardShadow]}
        onPress={handlePress}
      >
        <Image source={{ uri: item.image }} style={gridStyles.image} />
        <View style={gridStyles.cardDesc}>
          <Text style={[gridStyles.cardTitle, baseStyles.headerSm]}>
            {item.name}
          </Text>
          <Text style={baseStyles.headerSm}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        style={gridStyles.grid}
        data={props.products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default Grid;
