/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './src/routes';
import {RealmProvider} from '@realm/react';
// import Realm from 'realm';
import {SettingCfg} from './src/store/settingsCfg';
import {ToastProvider} from 'react-native-toast-notifications';
import {RealmVersion} from './src/store/const';
import {Dict} from './src/store/dict';
import {LiveSourceSchema} from './src/store/liveCfg';
import IdleTimerManager from 'react-native-idle-timer';

if (__DEV__) {
  require('./ReactotronConfig');
  // Realm.deleteFile({path: Realm.defaultPath});
}

const Stack = createNativeStackNavigator();

const Entry = () => {
  if (__DEV__) {
    IdleTimerManager.setIdleTimerDisabled(true);
  }

  return (
    <ToastProvider>
      <RealmProvider
        schema={[SettingCfg, Dict, LiveSourceSchema]}
        schemaVersion={RealmVersion}>
        <NavigationContainer>
          <Stack.Navigator>
            {routes.map(route => (
              <Stack.Screen key={route.name} {...route} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </ToastProvider>
  );
};

export default Entry;
