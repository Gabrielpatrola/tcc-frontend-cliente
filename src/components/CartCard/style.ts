import { StyleSheet } from 'react-native';

const cartCardStyles = StyleSheet.create({
  card: {
    marginTop: 30,
    height: 125,
    borderRadius: 35,
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  image: {
    height: 150,
    width: '40%',
  },
  desc: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
  },
  qty: {
    marginBottom: 10,
  },
});

export default cartCardStyles;
