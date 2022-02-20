import {StyleSheet} from 'react-native';

import {Colors, Sizes} from '../index';

const Home = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.BLUE,
    padding: Sizes.margin3X,
    borderRadius: Sizes.border2X,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: Sizes.fontSize2X,
  },
});

export default Home;
