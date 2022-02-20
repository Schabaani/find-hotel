import {StyleSheet} from 'react-native';
import {Colors} from '../index';
import Sizes from '../sizes';

const RoomSelector = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_GREY,
  },
  content: {
    marginHorizontal: Sizes.margin1X,
    marginTop: Sizes.margin4X,
    flex: 1,
  },
  addMore: {
    flexDirection: 'row',
    borderColor: '#DAE9FA',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#F7FBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtn: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#EFF2F6',
    height: 3,
    width: '98%',
    alignSelf: 'center',
    marginVertical: 22,
  },
});

export default RoomSelector;
