/**
 * @file 只存放系统必要的 hooks （偏重要的）
 */
import {useQuery, useRealm} from '@realm/react';
import {defaultCfg, SettingCfg} from './settingsCfg';
import {useEffect} from 'react';
import {RealmTableName} from './const';

export const useQuerySettingCfg = () => {
  const realm = useQuery(SettingCfg);
  const length = realm.length;
  const newest = realm[length - 1];
  return [realm, newest] as const;
};
// 按主键查找，目前用不到
// export const useObjectSettingCfg = <T = any>(options?: any) => {
//   const realm = useObject(SettingCfg, '222');
//   return realm;
// };
export const useRealmSettingCfg = () => {
  const realm = useRealm();
  return realm;
};

export const useAddNewSettingCfg = () => {
  const realm = useRealm();
  const [values, newest] = useQuerySettingCfg();

  const create = (cfg: Partial<SettingCfg>) => {
    realm.write(() => {
      // keep 100 record 最多保留 100 条历史记录
      if (values.length >= 100) {
        realm.delete(values[0]);
      }

      realm.create(RealmTableName.SettingCfg, {
        playAddr: cfg.playAddr ?? newest?.playAddr ?? defaultCfg.playAddr,
        weatherAddr:
          cfg.weatherAddr ?? newest?.weatherAddr ?? defaultCfg.weatherAddr,
      });
    });
  };

  useEffect(() => {
    if (!values?.length) {
      create(defaultCfg);
    }
  }, []);

  return [values, newest, create] as const;
};
