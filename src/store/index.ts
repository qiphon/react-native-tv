/**
 * @file Realm 相关操作
 */

import Realm from 'realm';
import {DictType, RealmDictObj} from './dict';
import {RealmTableName} from './const';

export const realm = new Realm(Realm.defaultPath);

/** 创建字典记录 */
const createDict = (key: DictType, data: string) => {
  const modifiyRow = realm
    .objects<RealmDictObj>(RealmTableName.Dict)
    ?.find(item => item.type === key);
  // ?.filtered(`type = '${key}'`);

  if (!modifiyRow) {
    realm.write(() => {
      realm.create<RealmDictObj>(RealmTableName.Dict, {
        type: key,
        // @ts-expect-error 初始化要使用 array 。by Realm doc
        data: [data],
      });
    });
  } else {
    realm.write(() => {
      modifiyRow.data.add(data);
    });
  }
  return modifiyRow;
};

/** 删除字典记录值 */
const delDictData = (key: DictType, data: string) => {
  const modifiyRow = realm
    .objects<RealmDictObj>(RealmTableName.Dict)
    .find(type => type.type === key);
  realm.write(() => {
    modifiyRow?.data.delete(data);
  });
  return modifiyRow;
};

/** 创建，添加直播分类 */
export const createLiveCategoryType = (typeName: string) => {
  return createDict(DictType.liveCategory, typeName);
};

/** 删除单个直播分类 */
export const delLiveCategoryType = (typeName: string) =>
  delDictData(DictType.liveCategory, typeName);
