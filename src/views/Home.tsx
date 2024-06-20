/**
 * @file 首页
 */

import {TouchableHighlight} from 'react-native';

import styled from 'styled-components/native';
import {Page} from '../components/Page';
import {Navs} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {useAddNewSettingCfg} from '../store/hooks';
import {Weathers} from '../components/Weather';
import {getLives} from '../utils/live';
import {Loading} from '../components/Loading';
import {useRequest} from 'ahooks';

export const Home = () => {
  const navigate = useNavigation();
  const [_, newest] = useAddNewSettingCfg();

  const {loading} = useRequest(() => getLives(newest?.playAddr), {
    refreshDeps: [newest?.playAddr],
    ready: !!newest?.playAddr,
  });

  return (
    <Loading animating={loading}>
      <Page>
        <NavWrapper>
          {Navs.map(item => (
            <TouchableHighlight
              key={item.title}
              onPress={() => {
                navigate.navigate(item.path);
              }}>
              <NavBox>
                <BaseText>{item.title}</BaseText>
              </NavBox>
            </TouchableHighlight>
          ))}
        </NavWrapper>
        <ScrollView>
          <Weathers weatherAddr={newest?.weatherAddr} />
        </ScrollView>
      </Page>
    </Loading>
  );
};

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const NavWrapper = styled.View`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;

const BaseText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const NavBox = styled.View`
  width: 120px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
