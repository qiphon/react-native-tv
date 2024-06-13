/**
 * @file 带遮罩的 loading
 */

import {FC, PropsWithChildren} from 'react';
import {ActivityIndicatorProps} from 'react-native';
import {FastOmit} from 'styled-components';
import styled from 'styled-components/native';

export type LoadingProps = {showTips?: string | false} & FastOmit<
  ActivityIndicatorProps,
  never
>;

export const Loading: FC<PropsWithChildren<LoadingProps>> = ({
  children,
  showTips,
  animating = true,
  ...props
}) => {
  return (
    <>
      {animating && (
        <LoadingWrapper>
          <LoadingContentWrapper>
            <LoadingItem size={'large'} {...props} animating={animating} />
            {showTips && <Tips>{showTips || '加载中...'}</Tips>}
          </LoadingContentWrapper>
        </LoadingWrapper>
      )}
      {children}
    </>
  );
};

const Tips = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
`;

const LoadingItem = styled.ActivityIndicator``;

const LoadingContentWrapper = styled.View`
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const LoadingWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;
