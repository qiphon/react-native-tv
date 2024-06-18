/**
 * @file 设置页面
 */

import styled from 'styled-components/native';
import {Page} from '../components/Page';
import {useState} from 'react';
import {useAddNewSettingCfg} from '../store/hooks';
import {useToast} from 'react-native-toast-notifications';
import {feedback} from '../utils/feedback';

export const Settings = () => {
  const [_, newest, create] = useAddNewSettingCfg();
  const [newWeatherAddr, setNewWeatherAddr] = useState('');
  const [newCfg, setNewCfg] = useState('');
  const Toast = useToast();
  const [feedbackText, setFeedbackText] = useState('');

  return (
    <Page>
      <Header>
        <SettingText>设置</SettingText>
      </Header>
      <Row>
        <RowKey> 配置地址</RowKey>
        <CfgAddr
          keyboardType="url"
          placeholder="请输入配置地址url"
          defaultValue={newest.playAddr}
          onChange={ev => {
            setNewCfg(ev.nativeEvent.text);
          }}
        />
        <AddrConfirmBtn
          title="确认"
          onPress={() => {
            const trimed = newCfg.trim();
            if (!trimed && trimed === newest.playAddr) {
              return;
            }

            create({
              ...newest,
              playAddr: trimed,
            });
            Toast.show('配置成功');
          }}
        />
      </Row>
      <Row>
        <RowKey>天气地址</RowKey>
        <CfgAddr
          keyboardType="default"
          placeholder="请输入城市"
          defaultValue={newest.weatherAddr}
          onChange={ev => {
            setNewWeatherAddr(ev.nativeEvent.text);
          }}
        />
        <AddrConfirmBtn
          title="确认"
          onPress={() => {
            const trimed = newWeatherAddr.trim();
            if (!trimed && trimed === newest.weatherAddr) return;
            create({
              ...newest,
              weatherAddr: trimed,
            });
            Toast.show('配置成功');
          }}
        />
      </Row>
      <Row>
        <RowKey>反 馈</RowKey>
        <CfgAddr
          keyboardType="default"
          placeholder="请输入反馈内容"
          multiline
          onChange={ev => {
            setFeedbackText(ev.nativeEvent.text);
          }}
        />
        <AddrConfirmBtn
          title="确认"
          onPress={() => {
            feedback(feedbackText).then(res => {
              if (res?.StatusMessage === 'success') {
                Toast.show('反馈成功');
              }
            });
          }}
        />
      </Row>
    </Page>
  );
};

const AddrConfirmBtn = styled.Button`
  color: #fff;
  font-size: 16px;
`;

const CfgAddr = styled.TextInput`
  color: #fff;
  flex: 1 1 auto;
  border: 1px solid #fff;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
`;

const RowKey = styled.Text`
  color: #fff;
  font-size: 16px;
  min-width: 70px;
  text-align: right;
`;

const Row = styled.View`
  gap: 8px;
  margin-top: 16px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const SettingText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;
