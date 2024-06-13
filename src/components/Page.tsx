/**
 * @file 统一页面边距
 */
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState, type FC, type PropsWithChildren} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {RoutePath} from '../routes/paths';

export const Page: FC<PropsWithChildren<any>> = ({children}) => {
  const isIphone = Platform.OS === 'ios';
  const natigate = useNavigation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const routeListener = () => {
      const allStack = natigate.getState()?.routes || [];
      setIsHome(
        natigate.getState()?.routes[allStack.length - 1]?.name ===
          RoutePath.Home,
      );
    };
    natigate.addListener('state', routeListener);

    return () => {
      natigate.removeListener('state', routeListener);
    };
  }, []);

  return (
    <SafaView>
      <WrapperView>
        {isIphone && !isHome && (
          <BackBtn
            onPress={() => {
              natigate.goBack();
            }}>
            <BackText>&#60;</BackText>
          </BackBtn>
        )}

        {children}
      </WrapperView>
    </SafaView>
  );
};

const BackText = styled.Text`
  color: #000;
  font-weight: 600;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999;
  background: rgba(255, 255, 255, 1);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

const WrapperView = styled.View`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
`;

const SafaView = styled.SafeAreaView`
  min-height: 100%;
  background-color: #000;
  display: flex;
  flex-flow: column nowrap;
`;
