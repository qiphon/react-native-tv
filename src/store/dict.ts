/**
 * @file 字典类型 table
 */

import Realm from 'realm';
import {RealmTableName} from './const';

/** 固定的字典 Key */
export enum DictType {
  liveCategory = 'liveCategory',
}

/** 如果没有数据分类的类名，则改为其他 */
export const defaultDictType = '其他';

export interface RealmDictObj {
  type: DictType;
  data: Set<string>;
  desc?: string;
}

export const Dict: Realm.ObjectSchema = {
  name: RealmTableName.Dict,
  primaryKey: 'type',
  properties: {
    type: 'string',
    data: 'string<>',
    desc: 'string?',
  },
};
// 对象方式声明 schema 更简洁
// export class Dict extends Realm.Object<RealmDictObj> {
//   key!: DictType;
//   data!: Set<string>;
//   desc?: Realm.Mixed;
//   static schema: Realm.ObjectSchema = {
//     name: RealmTableName.Dict,
//     properties: {
//       key: 'string',
//       data: 'string<>',
//       desc: 'mixed',
//     },
//   };
// }
