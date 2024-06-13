import RNFetchBlob from 'react-native-fs';

export enum DownloadType {
  'weather' = 'weather',
  'playAddr' = 'playAddr',
}

const todayStr = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const downloadPath = {
  [DownloadType.weather]: () =>
    `${RNFetchBlob.CachesDirectoryPath}/${
      DownloadType.weather
    }_${todayStr()}.html`,
  [DownloadType.playAddr]: () =>
    `${RNFetchBlob.CachesDirectoryPath}/${
      DownloadType.playAddr
    }/${todayStr()}}.html`,
};

export const download = (url: string, savePath: string) => {
  const {promise} = RNFetchBlob.downloadFile({
    fromUrl: url,
    // fromUrl: 'https://reactnative.cn/img/header_logo.svg',
    toFile: savePath,
  });
  return promise;
};

export const readFile = (path: string) => {
  return RNFetchBlob.readFile(path, 'utf8');
};
