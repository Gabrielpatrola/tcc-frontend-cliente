/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-use-before-define */
import React, { useState, useContext, useCallback } from 'react';
import {
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { AuthContext } from '../../routes/AuthProvider';

import {
  Container,
  BackgroundImage,
  NavigationButton,
  ButtonText,
  IconContainer,
  ButtonText2,
  Title,
  TextInput,
  Container2,
  Container3,
} from './styles';

import Background from '../../assets/home-background.png';
import Logo from '../../assets/logo.png';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}
      style={{
        flex: 1,
      }}
    >
      <BackgroundImage
        source={Background}
        imageStyle={{
          width: 313,
          height: 427,
        }}
      >
        <Container>
          <Image source={Logo} />
        </Container>
        <Container>
          <Title>Faça o seu login</Title>
          <Container2 isFocused={isFocused}>
            <TextInput
              value={email}
              placeholder="E-mail"
              onChangeText={(userEmail: string) => setEmail(userEmail)}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#B7B7CC"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoCorrect={false}
              labelValue={undefined}
            />
          </Container2>
          <Container2>
            <TextInput
              value={password}
              placeholder="Senha"
              onChangeText={(userPassword: string) => setPassword(userPassword)}
              secureTextEntry
              labelValue={undefined}
              placeholderTextColor="#B7B7CC"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </Container2>
          <NavigationButton onPress={() => login(email, password)}>
            <ButtonText>Entrar</ButtonText>
            <IconContainer>
              <Icon name="log-in" size={24} color="#7A1818" />
            </IconContainer>
          </NavigationButton>
          <Container3>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={{
                marginTop: 15,
              }}
            >
              <ButtonText2>Não possui conta? Cadastre-se!</ButtonText2>
            </TouchableOpacity>
          </Container3>
        </Container>
      </BackgroundImage>
    </KeyboardAvoidingView>
  );
}
