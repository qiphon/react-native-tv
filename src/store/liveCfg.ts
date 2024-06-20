/**
 * @file 直播源信息
 */

import Realm from 'realm';
import {RealmTableName} from './const';

export interface LiveSource {
  /**
   * 电视台名称
   */
  name: string;
  /**
   * 直播源地址
   */
  url: Set<string>;
  /**
   * 直播源分类
   */
  type: string;
  /**
   * 唯一的值 type,name
   */
  uniqueId: string;
  /**
   * 直播源图标
   */
  icon?: string;
  /**
   * 直播源描述
   */
  desc?: string;
}

export const LiveSourceSchema: Realm.ObjectSchema = {
  name: RealmTableName.LiveSource,
  primaryKey: 'uniqueId',
  properties: {
    uniqueId: 'string',
    name: 'string',
    url: 'string<>',
    type: 'string',
    icon: 'string?',
    desc: 'string?',
  },
};
