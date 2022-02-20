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
  Primary: undefined;
  Secondary: undefined;
};

export const RootStackRouteNames = ['Primary', 'About', 'Drawer'];

export type RootStackParamList = {
  About: undefined;
  Primary: undefined;
  Secondary: undefined;
};

export const ValidRouteNames = [...BottomRouteNames, ...RootStackRouteNames];
