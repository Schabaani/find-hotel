import React from 'react';
import {SafeAreaView, TouchableOpacity, Text, View, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigations/router';
import {RouteProp} from '@react-navigation/native';
import Styles from '../../styles/components';
import {ModalHeader, MySvgImage} from '../../components';
import {useEncodeRooms, useDecodeRooms} from '../../utils/roomCoder';
import {ScrollView} from 'react-native-gesture-handler';
import {Age, Room} from '../../interfaces';

const MAX_CHILD_COUNT = 3;
const MAX_ADULT_COUNT = 5;

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RoomSelector'>;
  route: RouteProp<RootStackParamList, 'RoomSelector'>;
};

function sumOfGuests(rooms: Room[]): number {
  let count = 0;
  rooms.forEach(room => {
    count += room.adultCount;
    if (room.children) count += room.children.length;
  });

  return count;
}

const RoomSelector = (props: TProps) => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [guestCount, setGuestCount] = React.useState(0);

  React.useEffect(() => {
    const roomsInfo = useEncodeRooms(props.route.params?.config ?? '');
    setRooms(roomsInfo);
    setGuestCount(sumOfGuests(roomsInfo));
  }, []);

  const addRoom = () => {
    const newRoom: Room = {
      adultCount: 1,
    };
    setRooms([...rooms, newRoom]);
    setGuestCount(sumOfGuests([...rooms, newRoom]));
  };

  const removeRoom = (removeIndex: number) => {
    const filtered = rooms.filter(function (room, index) {
      return removeIndex != index;
    });
    setRooms(filtered);
    setGuestCount(sumOfGuests(filtered));
  };

  const increaseGuest = (by: TGuestType, index: number) => {
    let room = rooms[index];
    if (by === 'Adult') {
      if (room.adultCount == MAX_ADULT_COUNT) {
        return;
      }
      room.adultCount = room.adultCount + 1;
    } else {
      if (room.children?.length == MAX_CHILD_COUNT) {
        return;
      }
      if (room.children) room.children.push(0);
      else {
        room.children = [0];
      }
    }

    rooms[index] = room;
    setRooms([...rooms]);
    setGuestCount(sumOfGuests([...rooms]));
  };
  const decreaseGuest = (by: TGuestType, index: number) => {
    let room = rooms[index];
    if (by === 'Adult') {
      if (room.adultCount > 1) room.adultCount = room.adultCount - 1;
    } else {
      room.children?.pop();
    }

    rooms[index] = room;
    setRooms([...rooms]);
    setGuestCount(sumOfGuests([...rooms]));
  };

  const renderRooms = () => {
    const ChildrenAge = (children: Age[]) => {
      return children.children.map((childAge, index) => {
        return (
          <View key={index}>
            <Text>Child {index + 1} age</Text>
          </View>
        );
      });
    };

    return rooms.map((room: Room, index) => {
      const showRemoveButton = index != 0;
      return (
        <View key={index}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 20,
                fontWeight: '600',
                flex: 1,
              }}>
              Room {index + 1}
            </Text>
            {showRemoveButton && (
              <TouchableOpacity
                onPress={() => {
                  removeRoom(index);
                }}>
                <Text style={{color: '#D83B3B'}}>Remove room</Text>
              </TouchableOpacity>
            )}
          </View>
          <RoomGuestCount
            title="Adults"
            count={room.adultCount}
            increaseGuest={increaseGuest}
            decreaseGuest={decreaseGuest}
            type={'Adult'}
            index={index}
          />
          <RoomGuestCount
            title="Children"
            count={room.children?.length ?? 0}
            increaseGuest={increaseGuest}
            decreaseGuest={decreaseGuest}
            type={'Children'}
            index={index}
          />
          {room.children && room.children.length > 0 && (
            <ChildrenAge children={room.children} />
          )}
          <View style={Styles.RoomSelector.divider} />
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={Styles.RoomSelector.container}>
      <ModalHeader title="Who is staying?" goBack={props.navigation.goBack} />
      <View style={Styles.RoomSelector.content}>
        <ScrollView style={{marginBottom: 20}}>
          {renderRooms()}
          <AddRoom isDisabled={rooms.length == 8} addRoom={addRoom} />
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(useDecodeRooms(rooms));
          }}
          style={Styles.RoomSelector.searchBtn}>
          <MySvgImage source={'MagnifyIcon'} width={14} height={14} />
          <Text style={{color: 'white', marginLeft: 5}}>Search </Text>
          <Text style={{color: 'white'}}>
            {rooms.length} rooms • {guestCount} guests
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

type TAddRoom = {
  addRoom: () => void;
  isDisabled: boolean;
};
const AddRoom = (props: TAddRoom) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.addRoom}
    disabled={props.isDisabled}
    style={Styles.RoomSelector.addMore}>
    <MySvgImage source={'AddIcon'} width={14} height={14} />
    <Text style={{marginLeft: 5}}>Add Room</Text>
  </TouchableOpacity>
);

type TButton = {
  isIncreasing: boolean;
  type: TGuestType;
  increaseGuest?: (type: TGuestType, index: number) => void;
  decreaseGuest?: (type: TGuestType, index: number) => void;
  index: number;
};

type TGuestType = 'Adult' | 'Children';

type TRoomGuestCount = {
  type: TGuestType;
  title: string;
  count: number;
  increaseGuest: (type: TGuestType, index: number) => void;
  decreaseGuest: (type: TGuestType, index: number) => void;
  index: number;
};
const RoomGuestCount = (props: TRoomGuestCount) => {
  const Button = (props: TButton) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (props.isIncreasing) {
          props.increaseGuest?.(props.type, props.index);
        } else {
          props.decreaseGuest?.(props.type, props.index);
        }
      }}
      style={{
        backgroundColor: '#F7FBFF',
        borderWidth: 1,
        borderColor: '#BFDAF9',
        borderRadius: 8,
        padding: 13,
      }}>
      <MySvgImage
        source={props.isIncreasing ? 'AddIcon' : 'SubtractIcon'}
        width={14}
        height={14}
      />
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
      }}>
      <Text style={{flex: 1, fontSize: 16, fontWeight: '600'}}>
        {props.title}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          isIncreasing={false}
          decreaseGuest={props.decreaseGuest}
          type={props.type}
          index={props.index}
        />
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 18,
            fontWeight: '600',
            color: '#2A333D',
          }}>
          {props.count}
        </Text>
        <Button
          isIncreasing
          increaseGuest={props.increaseGuest}
          type={props.type}
          index={props.index}
        />
      </View>
    </View>
  );
};

export default RoomSelector;
