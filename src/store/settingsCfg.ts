/**
 * @file 系统配置信息
 */

import Realm, {ObjectSchema} from 'realm';
import {RealmTableName} from './const';

export const defaultCfg = {
  playAddr: 'https://盒子迷.top/禁止贩卖',
  weatherAddr: '北京',
};

export class SettingCfg extends Realm.Object<any> {
  //   _id!: BSON.ObjectID;
  playAddr!: string;
  weatherAddr!: string;

  static schema: ObjectSchema = {
    name: RealmTableName.SettingCfg,
    // primaryKey: '_id',
    properties: {
      //   _id: 'objectId',
      playAddr: 'string',
      weatherAddr: 'string',
    },
  };
}
