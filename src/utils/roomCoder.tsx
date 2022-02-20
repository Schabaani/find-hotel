import {Room} from '../interfaces';

export function useEncodeRooms(uri: string): Room[] {
  if (uri == '') {
    return [
      {
        adultCount: 2,
      },
    ];
  }
  try {
    const rooms = uri.split('|');
    let guests: string[] = [];
    let children: string[] = [];
    let roomsData: Room[] = [];
    rooms.forEach(room => {
      guests = room.split(':');
      let roomData: Room = {
        adultCount: 0,
      };
      roomData.adultCount = parseInt(guests[0]);
      if (guests.length > 1) {
        children = guests[1].split(',');
        children.forEach(child => {
          const age = parseInt(child);
          if (roomData.children) roomData.children.push(age);
          else {
            roomData.children = [age];
          }
        });
      }
      roomsData.push(roomData);
    });
    return roomsData;
  } catch (e) {
    return [];
  }
}

export function useDecodeRooms(rooms: Room[]): string {
  let uri = '';
  rooms.forEach(room => {
    let children = '';
    if (room.children) {
      children = room.children.join(',');
    }

    uri += `${room.adultCount}${children.length == 0 ? '' : ':' + children}|`;
  });

  return uri.substring(0, uri.length - 1);
}
