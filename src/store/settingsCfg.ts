/**
 * @file 系统配置信息
 */

import Realm, {ObjectSchema} from 'realm';

export const RealmVersion = 7;

export const defaultCfg = {
  playAddr: '',
  weatherAddr: '北京',
};

export class SettingCfg extends Realm.Object<any> {
  //   _id!: BSON.ObjectID;
  playAddr!: string;
  weatherAddr!: string;

  static schema: ObjectSchema = {
    name: 'SettingCfg',
    // primaryKey: '_id',
    properties: {
      //   _id: 'objectId',
      playAddr: 'string',
      weatherAddr: 'string',
    },
  };
}
