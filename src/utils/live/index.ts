/**
 * @file 直播信息读取
 */

import {Toast} from 'react-native-toast-notifications';
import {stringMd5} from 'react-native-quick-md5';
import {exists, CachesDirectoryPath, writeFile} from 'react-native-fs';
import {defaultDictType} from '../../store/dict';
import {createLiveCategoryType} from '../../store';
import {createLiveSourceRecord} from '../../store/liveSource';

const downloadAndCache = async (url: string, loadingTip?: string) => {
  const md5Name = stringMd5(url);
  const pathName = `${CachesDirectoryPath}/${md5Name}.txt`;
  return exists(pathName).then(res => {
    if (!res) {
      if (loadingTip) Toast?.show(loadingTip);
      return fetch(url)
        .then(res => res.text())
        .then(res => {
          writeFile(pathName, res);
          return res;
        });
    }
  });
};

export const getLives = async (source?: string) => {
  if (!source) return;

  return downloadAndCache(source, '正在读取直播信息')
    .then(res => {
      if (res) {
        const jsonConfig = JSON.parse(res);
        const livesAddr = jsonConfig.lives?.find(
          // 目前只支持 m3u8 直播流
          (item: any) => item?.type === 0 || item.name === 'live',
        )?.url;

        if (livesAddr) {
          let dictCategorys = createLiveCategoryType(defaultDictType);
          return downloadAndCache(livesAddr).then(res => {
            const livesRow = res?.split('\n').filter(row => !!row.trim());
            let currentCategory = defaultDictType;

            livesRow?.forEach(item => {
              const rowDatas = item.split(',').filter(Boolean);
              const isChannel = rowDatas.length >= 2 && item.includes('http');
              if (isChannel) {
                const [channel, url] = rowDatas as string[];
                const trimUrl = url?.trim();
                if (trimUrl && channel)
                  createLiveSourceRecord({
                    name: channel,
                    url: trimUrl,
                    type: currentCategory,
                  });
              } else {
                const [category] = rowDatas as string[];
                const categoryName = category?.trim().replace(/#.*#$/, '');
                if (categoryName) {
                  currentCategory = categoryName;
                  if (!dictCategorys?.data.has(categoryName)) {
                    dictCategorys = createLiveCategoryType(currentCategory);
                  }
                }
              }
            });
          });
        }
      }
    })
    .finally(() => {
      Toast.show('读取直播信息成功');
    });
};
