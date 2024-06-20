import {RealmTableName} from '../const';
import {realm} from '../index';
import {LiveSource} from '../liveCfg';

export const createLiveSourceRecord = (
  source: Omit<LiveSource, 'uniqueId' | 'url'> & {url: string},
) => {
  const liveSources = realm.objects<LiveSource>(RealmTableName.LiveSource);
  const uniqueId = `${source.type},${source.name}`.replaceAll(/'/g, "\\'");
  const modifiyRow = liveSources.filtered(`uniqueId = '${uniqueId}'`)[0];
  //   第一条数据 或者没有相同 id 的数据
  if (liveSources.isEmpty() || !modifiyRow) {
    realm.write(() => {
      const {url, ...args} = source;
      realm.create(RealmTableName.LiveSource, {
        ...args,
        url: [url],
        uniqueId,
      });
    });
  } else {
    realm.write(() => {
      modifiyRow.url.add(source.url);
    });
  }
};

export const delLiveSourceRecord = ({
  uniqueId,
  url,
}: Pick<LiveSource, 'uniqueId'> & {url: string}) => {
  const liveSources = realm
    .objects<LiveSource>(RealmTableName.LiveSource)
    .filtered(`uniqueId = '${uniqueId}'`);

  if (url) {
    realm.write(() => {
      liveSources[0].url.delete(url);
    });
  }
};
