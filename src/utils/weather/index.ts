import {defaultCfg} from '../../store/settingsCfg';
import {download, downloadPath, DownloadType, readFile} from '../download';
import RNFetchBlob from 'react-native-fs';
import {load} from 'cheerio';
import {Weather} from './types';

const downloadUrl = {
  [DownloadType.weather]: (name: string) =>
    // `http://www.baidu.com/s?wd=${name}天气`,
    `https://www.so.com/s?q=${name}天气&src=360portal&_re=0`,
};

/** 读取天气信息 */
const readWeather = (path: string) => {
  return readFile(path)
    .then(res => {
      const $ = load(res);
      const weatherItems = [
        ...$(
          '#mohe-weather .mh-tab-cont.js-mh-tab-cont .g-slider-item.js-mh-item',
        ),
      ];

      let todayWeatherItemIndex = weatherItems?.findIndex(item => {
        return $(item).find('.mh-week').text().includes('今天');
      });
      if (!weatherItems?.length || todayWeatherItemIndex <= 0)
        return [] as Weather[];
      const list7Day: Weather[] = new Array(7).fill(1).map((_, idx) => {
        const todayItem = load(weatherItems[todayWeatherItemIndex + idx]);
        const airQuality =
          $('#mohe-weather .mh-pm25 span.mh-desc-item-txt').text() || '';
        const weatherAlert =
          $('#mohe-weather .mh-alert span.mh-desc-item-txt').text() || '';
        return {
          date: todayItem('.mh-des-date').text() || '',
          image: todayItem('.mh-bg-weather').attr('src') || '',
          temperature: todayItem('.mh-des-temperature-num').text() || '',
          weather: todayItem('.mh-des-temperature').text() || '',
          week: todayItem('.mh-week').text() || '',
          airQuality,
          weatherAlert,
        };
      });
      return list7Day;
    })
    .catch(err =>
      console.log(err, '------read weather HTML error -----------'),
    );
};

/** 获取天气信息 */
export const getWeather = (name?: string) => {
  const addr = name || defaultCfg.weatherAddr;
  const path = downloadPath[DownloadType.weather]() + addr;
  return RNFetchBlob.exists(path).then(bool => {
    if (bool) {
      return readWeather(path);
    } else {
      return download(downloadUrl[DownloadType.weather](addr), path)
        .catch(err =>
          console.log(err, '------download weather HTML error -----------'),
        )
        .then(() => {
          //   console.log(path, 'res load weather', res);
          return readWeather(path);
        });
    }
  });
};
