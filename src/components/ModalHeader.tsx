import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Styles from '../styles/components';
import MySvgImage from './MySvgImage';

type TProps = {
  title: String;
  goBack: () => void;
};
const ModalHeader = (props: TProps) => {
  return (
    <View style={Styles.ModalHeader.container}>
      <View style={Styles.ModalHeader.shadow}>
        <TouchableOpacity
          onPress={() => {
            props.goBack();
          }}>
          <MySvgImage source={'CloseIcon'} width={14} height={14} />
        </TouchableOpacity>
        <Text style={Styles.ModalHeader.title}>{props.title}</Text>
      </View>
    </View>
  );
};

export default ModalHeader;
