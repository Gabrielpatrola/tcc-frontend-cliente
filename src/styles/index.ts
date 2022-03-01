import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const DEVICE_WIDTH = Dimensions.get('window').width;

export const colors = {
  yellow: '#FFDB47',
  black: '#000',
  white: '#fff',
  grey: '#AFAFAF',
};

export const fontSize = {
  sm: 14,
  md: 18,
  lg: 24,
};
export const font = {
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
};

const header = {
  fontFamily: font.bold,
  color: colors.black,
};

const baseStyles = StyleSheet.create({
  brandTitle: {
    ...header,
    fontSize: fontSize.lg,
    letterSpacing: 4,
  },
  headerLg: {
    ...header,
    fontSize: fontSize.lg,
  },
  headerMd: {
    ...header,
    fontSize: fontSize.md,
  },
  headerSm: {
    ...header,
    fontSize: fontSize.sm,
  },
  headerSmSpace: {
    ...header,
    fontSize: fontSize.sm,
    letterSpacing: 1,
  },
  subHeader: {
    fontFamily: font.bold,
    fontSize: fontSize.sm,
    color: colors.grey,
  },
  body: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.black,
  },

  // containers
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
  },
  containerJustify: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  tabBar: {
    borderTopEndRadius: 35,
    borderTopLeftRadius: 35,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: DEVICE_WIDTH,
    height: 73,
  },
  line: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    marginVertical: 30,
    borderRadius: 50,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default baseStyles;
