export type InitStackParamList = {
  DeveloperScreen: undefined;
  InitApp?: {devMode?: 'DEVELOPMENT' | 'PRODUCTION'};
  AppNavigator: undefined;
};

export const BottomRouteNames = ['ShopFinder', 'Dashboard', 'Drawer'];

export type BottomNavParamList = {
  AppStack: {
    screen?: keyof RootStackParamList;
    params?: {[k: string]: any};
  };
  RoomSelector: {params?: String};
  Home: undefined;
};

export const RootStackRouteNames = ['RoomSelector', 'Home'];

export type RootStackParamList = {
  About: undefined;
  Home: undefined;
  RoomSelector?: {config?: string};
};

export const ValidRouteNames = [...BottomRouteNames, ...RootStackRouteNames];
