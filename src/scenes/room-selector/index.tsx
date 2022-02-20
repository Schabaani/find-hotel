import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigations/router';
import {RouteProp} from '@react-navigation/native';

const {width} = Dimensions.get('window');

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RoomSelector'>;
  route: RouteProp<RootStackParamList, 'RoomSelector'>;
};

const RoomSelector = (props: TProps) => {
  return <View style={[Styles.container]}></View>;
};

export default RoomSelector;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2F35',
  },
  content: {
    marginHorizontal: 20,
  },
  backWrapper: {
    borderWidth: 1,
    borderColor: '#363C43',
    borderRadius: 15,
    width: 120,
    height: 45,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h1Txt: {
    textAlign: 'right',
    color: '#fff',
    marginTop: 50,
    marginBottom: 10,
    fontSize: 16,
  },
  amountWrapper: {
    flexDirection: 'row',
    borderColor: '#363C43',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#1F2229',
    height: 80,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  rialTxt: {
    color: '#AEB1B8',
    fontWeight: '500',
    fontSize: 12,
  },
  amountNumTxt: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 20,
  },
  amountLetterTxt: {
    textAlign: 'center',
    color: '#AEB1B8',
    marginTop: 10,
    fontSize: 16,
    height: 75,
  },
  backTxt: {marginLeft: 10},
  textInput: {textAlign: 'left', color: '#fff'},
  boxStyle: {
    backgroundColor: '#1F2229',
    borderWidth: 0,
    width: '90%',
  },
  bills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  billBtn: {
    alignItems: 'center',
    marginBottom: 30,
  },
  billIcon: {
    width: (width - 40) * 0.24,
    aspectRatio: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  billImg: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});
