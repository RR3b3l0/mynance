import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export enum RootScreens {
  HomeScreen = 'Home',
  UserDetails = 'Details',
}

export type RootStackParamList = {
  [RootScreens.HomeScreen]: undefined;
  [RootScreens.UserDetails]: {id: string};
};

export type RootNavigationProp<ParamListKey extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, ParamListKey>;

export type NavigationProp<ParamListKey extends keyof RootStackParamList> =
  CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, ParamListKey>,
    RootNavigationProp<RootScreens.HomeScreen>
  >;

export type ScreenProps<ParamListKey extends keyof RootStackParamList> = {
  navigation: NavigationProp<ParamListKey>;
  route: RouteProp<RootStackParamList, ParamListKey>;
};
