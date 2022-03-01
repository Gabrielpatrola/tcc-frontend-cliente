import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import baseStyles, { colors } from '../../styles';
import buttonStyles from './style';

export interface ButtonProps {
  onPress?: () => void;
  title?: string;
  iconName?: string;
  isLoading?: boolean;
  style?: ViewStyle;
  shape?: string;
  size?: number;
  background?: string;
}

const Button = ({
  onPress,
  size,
  shape,
  iconName,
  style,
  background,
  isLoading,
  title,
}: ButtonProps) => {
  const bStyle = buttonStyles({ size, background, shape });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        bStyle.container,
        style,
        isLoading && bStyle.loading,
        baseStyles.buttonShadow,
      ]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.yellow} size="large" />
      ) : (
        <>
          {iconName && (
            <Ionicons name={iconName} color={colors.black} size={25} />
          )}
          {title && <Text style={baseStyles.headerSmSpace}> {title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
