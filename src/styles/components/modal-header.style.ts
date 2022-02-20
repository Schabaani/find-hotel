import {StyleSheet} from 'react-native';

import {Colors, Sizes} from '../index';

const ModalHeader = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 5,
    height: 64,
  },
  shadow: {
    backgroundColor: Colors.WHITE_GREY,
    flex: 1,
    height: 64,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.margin2X,
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
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: Sizes.fontSize2X,
    fontWeight: '600',
  },
});

export default ModalHeader;
