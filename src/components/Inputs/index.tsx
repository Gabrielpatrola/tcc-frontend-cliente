import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import baseStyles from '../../styles';
import inputStyles from './style';

interface InputsProps {
  value: string;
  setValue: any;
  label?: string;
  placeHolder: string;
  icon: string;
  secureText?: boolean;
}

const Inputs = (props: InputsProps) => {
  return (
    <View>
      {props.label && (
        <Text style={[baseStyles.headerSm, inputStyles.label]}>
          {props.label}
        </Text>
      )}
      <View style={inputStyles.inputContainer}>
        <Ionicons
          name={props.icon}
          color="black"
          size={24}
          style={inputStyles.icon}
        />
        <TextInput
          placeholder={props.placeHolder}
          onChangeText={props.setValue}
          value={props.value}
          style={inputStyles.textInput}
          secureTextEntry={props.secureText}
        />
      </View>
    </View>
  );
};

export default Inputs;
