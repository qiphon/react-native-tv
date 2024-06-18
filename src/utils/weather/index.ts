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
      let list7Day: Weather[] = [];
      // 移动端页面是这个
      const weatherCard = $('#mohe-m-entity--weather_city .mh-weather-weeks');
      // 安卓返回的是手机版的数据
      if (weatherCard.length > 0) {
        const children = weatherCard
          .find('div.mh-week-head')
          ?.children('.mh-week-day');
        list7Day = new Array(children?.length || 0).fill(1).map((_, idx) => {
          const weekAndWeather = children?.eq(idx);
          const headEl = weekAndWeather.children('p');
          const tmperHighEls = weatherCard.find(
            '.mh-line-wrap .mh-text-wrap .mh-text.mh-high',
          );
          const tmperLowEls = weatherCard.find(
            '.mh-line-wrap .mh-text-wrap .mh-text.mh-low',
          );
          const nightWeather = weatherCard.find('.mh-week-foot .mh-week-night');
          // console.log();
          return {
            week: headEl.eq(0).text(),
            weather: `早：${headEl.last().text()}
晚：${nightWeather.eq(idx).find('p').eq(1).text()}`,
            image: '',
            temperature: `${tmperLowEls.eq(idx).text()} ~ ${tmperHighEls
              .eq(idx)
              .text()}`,
            airQuality: nightWeather
              .eq(idx)
              .find('div.mh-weather-pollution')
              .text(),
            date: '',
            weatherAlert: '',
          } as Weather;
        });
      } else {
        const weatherItems = [
          ...$(
            '#mohe-weather .mh-tab-cont.js-mh-tab-cont .g-slider-item.js-mh-item',
          ),
        ];
        let todayWeatherItemIndex = weatherItems?.findIndex(item => {
          return $(item).find('.mh-week').text().includes('今天');
        });
        if (!weatherItems?.length || todayWeatherItemIndex <= 0) return;
        list7Day = new Array(7).fill(1).map((_, idx) => {
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
      }
      return list7Day;
    })
    .catch(err =>
      console.log(err, '------read weather HTML error -----------'),
    );
};

/** 获取天气信息 */
export const getWeather = (name?: string) => {
  const addr = name || defaultCfg.weatherAddr;
  const path = downloadPath[DownloadType.weather](addr);
  return RNFetchBlob.exists(path).then(bool => {
    if (bool) {
      return readWeather(path);
    } else {
      // RNFetchBlob.unlink(path);
      return download(downloadUrl[DownloadType.weather](addr), path)
        .catch(err =>
          console.log(err, '------download weather HTML error -----------'),
        )
        .then(res => {
          // console.log(path, 'res load weather', res);
          if (res?.statusCode === 200) return readWeather(path);
          return [];
        });
    }
  });
};
