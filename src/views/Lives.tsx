/**
 * @file 直播界面
 */
import styled from 'styled-components/native';
import {Toast} from 'react-native-toast-notifications';
import {useEffect, useMemo, useRef, useState} from 'react';
import IVSPlayer, {
  IVSPlayerRef,
  LogLevel,
} from 'amazon-ivs-react-native-player';
import IdleTimerManager from 'react-native-idle-timer';
import {useLiveSources, useLiveTypes} from '../store/subHooks/liveTypes';
import {delLiveSourceRecord} from '../store/liveSource';

export const Live = () => {
  const playerRef = useRef<IVSPlayerRef>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [secMenuType, setSecMenuType] = useState('');
  const [currentVideoSource, setCurrentVideoSource] = useState(
    // 'http://ottrrs.hl.chinamobile.com/PLTV/88888888/224/3221226016/index.m3u8',
    // 'http://ottrrs.hl.chinamobile.com/PLTV/88888888/224/3221225765/index.m3u8',
    'http://txmov2.a.kwimgs.com/upic/2022/01/31/16/BMjAyMjAxMzExNjAwMTVfNDAzMDAxOTlfNjYyNzMyNzQ2OTlfMF8z_b_Be477b27b9ce655d2372df56a5a3d96ef.mp4',
    // not support
    // 'http://[2409:8087:5e01:34::21]:6610/ZTE_CMS/00000001000000060000000000000318/index.m3u8?IAS',
    // 'https://s.yangshipin.cn/CCTVVideo/cctvh5-openapicore/keygen_bg.wasm?ts=28644942',
  );
  const currentItemInter = useRef<IterableIterator<string>>();
  const currentChannelId = useRef('');

  const liveTypes = useLiveTypes();
  const liveSource = useLiveSources();
  /** 当前分类下的数据 */
  const secLiveSource = useMemo(() => {
    return liveSource?.filter(item => item.type === secMenuType) || [];
  }, [liveSource, secMenuType]);

  useEffect(() => {
    IdleTimerManager.setIdleTimerDisabled(true);
    return () => {
      IdleTimerManager.setIdleTimerDisabled(false);
      playerRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    return () => {
      playerRef.current?.pause();
    };
  }, [currentVideoSource]);
  return (
    <Wrapper>
      <TouchWrapper
        activeOpacity={1}
        showMenu={showMenu}
        onPress={() => {
          setShowMenu(!showMenu);
        }}>
        <>
          <PlayerMenuCate show={showMenu} key="category">
            <StopPropergation onPress={() => {}} activeOpacity={1}>
              <>
                {[...(liveTypes?.data || [])].reverse().map((item, index) => {
                  return (
                    <ChannelCategoryText
                      isActive={item === secMenuType}
                      numberOfLines={2}
                      key={item || index}
                      onPress={() => {
                        setSecMenuType(`${item}`);
                      }}>
                      {item}
                    </ChannelCategoryText>
                  );
                })}
              </>
            </StopPropergation>
          </PlayerMenuCate>
          <PlayMenu show={showMenu && !!secMenuType}>
            <StopPropergation onPress={() => {}} activeOpacity={1}>
              <>
                {secLiveSource?.map(item => {
                  if (item.url?.size <= 0) return null;
                  return (
                    <ChannelCategoryText
                      isActive={item.url.has(currentVideoSource)}
                      numberOfLines={2}
                      key={item.uniqueId}
                      onPress={() => {
                        currentChannelId.current = item.uniqueId;
                        currentItemInter.current = item.url.values();
                        const currentUrl = currentItemInter.current.next()
                          .value as string;
                        if (currentUrl.startsWith('http')) {
                          Toast.hideAll();
                          Toast.show('频道切换中，请耐心等待。。。', {
                            duration: 9999999,
                            placement: 'center',
                          });
                          console.log('set url ====>', currentUrl);
                          setCurrentVideoSource(currentUrl);
                        }
                      }}>
                      {item.name}
                    </ChannelCategoryText>
                  );
                })}
              </>
            </StopPropergation>
          </PlayMenu>
        </>
      </TouchWrapper>
      <Player
        streamUrl={currentVideoSource}
        ref={playerRef}
        liveLowLatency
        rebufferToLive
        logLevel={LogLevel.IVSLogLevelDebug}
        volume={1}
        resizeMode="aspectFit"
        onLoad={() => {
          playerRef.current?.play();
          Toast.hideAll();
        }}
        onError={err => {
          console.log(err, '播放出错');
          if (currentChannelId.current) {
            delLiveSourceRecord({
              uniqueId: currentChannelId.current,
              url: currentVideoSource,
            });
          }
          Toast.show(
            `当前视频无法播放，请更换频道. 当前源：${currentVideoSource}`,
          );
          const currentUrl = currentItemInter.current?.next().value as string;

          if (currentUrl?.startsWith('http')) {
            Toast.show('正在切换源...');
            console.log('set url ====>', currentUrl);
            setCurrentVideoSource(currentUrl);
          } else {
            Toast.hideAll();
            Toast.show('当前频道无法播放，请更换频道', {
              placement: 'center',
              duration: 9999999,
            });
          }
        }}
      />
    </Wrapper>
  );
};

const ChannelText = styled.Text<{isActive?: boolean}>`
  color: ${props => (props.isActive ? 'red' : ' #fff')};
  font-size: 16px;
  width: 100%;
  padding: 10px 10px 10px 30px;
  border: 1px solid #fff;
  margin: 5px 0;
  border-radius: 0 15px;
`;

const ChannelCategoryText = styled(ChannelText)`
  font-weight: bold;
`;

const StopPropergation = styled.TouchableOpacity`
  flex: 1;
`;

const PlayMenu = styled.ScrollView<{show?: boolean}>`
  margin: 10px 3px;
  min-width: 40px;
  max-width: 190px;
  background: #000000b8;
  display: ${props => (props.show ? 'flex' : 'none')};
`;

const PlayerMenuCate = styled(PlayMenu)`
  background: rgba(0, 0, 0, 0.5);
`;

const TouchWrapper = styled.TouchableOpacity<{showMenu?: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-flow: row nowrap;
  ${props => props.showMenu && 'background: rgba(0, 0, 0, 0.3);'}
`;

const Player = styled(IVSPlayer)`
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Wrapper = styled.View`
  background: #000;
  flex: 1;
  position: relative;
`;
