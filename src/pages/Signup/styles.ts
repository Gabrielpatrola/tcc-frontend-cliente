import styled, { css } from 'styled-components/native';
interface ContainerProps {
  isFocused: boolean;
}

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  padding: 40px 40px 0;
  justify-content: space-around;
`;

export const Container = styled.View``;

export const Title = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  margin-top: 80px;
  width: 250px;
  font-family: 'Poppins-Regular';
`;

export const NavigationButton = styled.TouchableOpacity`
  background: #ffb84d;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #7a1818;
  flex: 1;
  text-align: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #6c6c80;
  font-size: 16px;
  font-family: 'Poppins-Regular';
`;

export const IconContainer = styled.View`
  background-color: #ffc46b;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const Container2 = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #f0f0f5;
  border-radius: 10px;
  border-width: 2px;
  border-color: #f0f0f5;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;

  ${props =>
    props.isFocused &&
    css`
      border-color: #c72828;
    `}
`;

export const Container3 = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText2 = styled.Text`
  font-size: 20px;
  color: #ffc46b;
`;
