import { StyleSheet } from 'react-native';
import { colors } from '../../styles';
import { ButtonProps } from './index';

const buttonStyles = ({ size, background, shape }: ButtonProps) =>
  StyleSheet.create({
    container: {
      height: size ? size : 55,
      width: size ? size : '100%',
      backgroundColor: background ? background : colors.yellow,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: shape == 'square' ? 5 : 35,
      marginHorizontal: 2,
    },
    loading: {
      backgroundColor: colors.black,
    },
  });

export default buttonStyles;
