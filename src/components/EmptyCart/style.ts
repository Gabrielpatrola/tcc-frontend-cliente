import { StyleSheet } from 'react-native';

const emptyCartStyles = StyleSheet.create({
  // Cart is empty
  container: {
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
  heading: {
    marginTop: 50,
  },
  button: {
    marginTop: 40,
    width: '100%',
    marginBottom: 100,
  },
});

export default emptyCartStyles;
