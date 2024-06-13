/**
 * @file 直播界面
 */

import styled from 'styled-components/native';
import {Page} from '../components/Page';

export const Live = () => {
  return (
    <Page>
      <ListItem>直播页面</ListItem>
    </Page>
  );
};

const ListItem = styled.Text`
  color: red;
`;
