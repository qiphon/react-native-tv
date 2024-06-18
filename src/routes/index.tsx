import {RouteConfig} from '@react-navigation/native';
import {Home} from '../views/Home';
import {RoutePath} from './paths';
import {Settings} from '../views/Settings';
import {Live} from '../views/Lives';
import {Yangshi} from '../views/YangShi';

export const routes: RouteConfig<any, RoutePath, any, any, any>[] = [
  {
    name: RoutePath.Home,
    component: Home,
    options: {
      header: () => null,
    },
  },
  {
    name: RoutePath.Settings,
    component: Settings,
    options: {
      header: () => null,
    },
  },
  {
    name: RoutePath.Lives,
    component: Live,
    options: {
      header: () => null,
    },
  },
  {
    name: RoutePath.Yangshi,
    component: Yangshi,
    options: {
      header: () => null,
    },
  },
];
