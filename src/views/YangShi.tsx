/**
 * @file 央视频
 */
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';

export const Yangshi = () => {
  return (
    <Wrapper>
      <WebView
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        contentMode="desktop"
        forceDarkOn
        webviewDebuggingEnabled
        useWebView2
        injectedJavaScript={`
          const style = document.createElement('style');
          style.innerHTML = \`
            .tv .volume-muted-tip-container > div:nth-child(1) {
              display: none !important;
            }
            .tv .volume-muted-tip-container > div:nth-child(2) {
              display: none !important;
            }
          \`;
            document.body.appendChild(style);
          `}
        // 默认中央 1
        source={{uri: 'https://yangshipin.cn/tv/home?pid=600001859'}}
        style={{flex: 1}}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
`;
