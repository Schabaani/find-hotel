export type InitStackParamList = {
  DeveloperScreen: undefined;
  InitApp?: {devMode?: 'DEVELOPMENT' | 'PRODUCTION'};
  AppNavigator: undefined;
};

export const RootStackRouteNames = ['SecondaryScreen', 'PrimaryScreen'];

export type RootStackParamList = {
  About: undefined;
  PrimaryScreen: undefined;
  SecondaryScreen?: {config?: string};
};
