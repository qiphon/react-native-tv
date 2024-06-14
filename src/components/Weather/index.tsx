/**
 * @file 天气预报展示
 */

import styled from 'styled-components/native';
import {getWeather} from '../../utils/weather';
import {useRequest} from 'ahooks';
import {Loading} from '../Loading';

export const Weathers = ({weatherAddr}: {weatherAddr?: string}) => {
  const {data: weathers, loading} = useRequest(
    () => getWeather(weatherAddr).then(res => res || []),
    {
      refreshDeps: [weatherAddr],
    },
  );

  return (
    <Loading animating={loading}>
      <Wrapper>
        <Title>
          <TitleText>{weatherAddr}今日</TitleText>
          <TitleSmall>
            空气质量：{weathers?.[0]?.airQuality || '无数据'}
          </TitleSmall>
          <TitleSmall>
            天气预警：{weathers?.[0]?.weatherAlert || '无数据'}
          </TitleSmall>
        </Title>

        <WeatherWrapper>
          {weathers?.map(item => {
            return (
              <WeatherItem key={item.date + item.week}>
                <TextSmall>{item.week}</TextSmall>
                {item.date && <TextSmall>{item.date}</TextSmall>}
                <TextSmall>{item.temperature}</TextSmall>
                <TextSmall>{item.weather}</TextSmall>
                {!!item.image && <Image source={{uri: item.image}} />}
              </WeatherItem>
            );
          })}
        </WeatherWrapper>
      </Wrapper>
    </Loading>
  );
};

const Image = styled.Image`
  width: 60px;
  height: 60px;
`;

const TextSmall = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-bottom: 8px;
`;

const TitleSmall = styled.Text`
  color: #fff;
  display: inline;
`;

const WeatherItem = styled.View`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 24px;
  color: #fff;
`;

const Title = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
`;

const WeatherWrapper = styled.View`
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
`;

const Wrapper = styled.View`
  margin-top: 30px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
