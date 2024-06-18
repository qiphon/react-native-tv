import RNFetchBlob from 'react-native-fs';

export enum DownloadType {
  'weather' = 'weather',
  'playAddr' = 'playAddr',
}

const todayStr = (useHour?: boolean) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  return `${year}-${month}-${day}-${useHour ? hour : '0'}`;
};

export const downloadPath = {
  [DownloadType.weather]: (addr: string) =>
    `${RNFetchBlob.CachesDirectoryPath}/${DownloadType.weather}_${todayStr(
      true,
    )}${addr}.html`,
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
    headers: {
      'Cache-Control': 'no-cache',
      DNT: '1',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'zh,en;q=0.9,zh-CN;q=0.8',
      'sec-ch-ua-platform': 'macOS',
      'Sec-Fetch-Mode': 'navigate',
      Host: 'www.so.com',
      'sec-ch-ua': `${Date.now()}Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24`,
      'User-Agent': `${Date.now()}}Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36`,
    },
  });
  return promise;
};

export const readFile = (path: string) => {
  return RNFetchBlob.readFile(path, 'utf8');
};
