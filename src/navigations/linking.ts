const config = {
  screens: {
    RoomSelector: {
      path: 'room/:config',
      parse: {
        config: (config: String) => `${config}`,
      },
    },
  },
};

const linking = {
  prefixes: ['findhotel://app'],
  config,
};

export default linking;
