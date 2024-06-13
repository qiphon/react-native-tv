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
import {RealmVersion, SettingCfg} from './src/store/settingsCfg';
import {ToastProvider} from 'react-native-toast-notifications';

if (__DEV__) {
  require('./ReactotronConfig');
}

const Stack = createNativeStackNavigator();

const Entry = () => {
  return (
    <ToastProvider>
      <RealmProvider schema={[SettingCfg]} schemaVersion={RealmVersion}>
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
