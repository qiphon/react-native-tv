import {useObject, useQuery} from '@realm/react';
import {RealmTableName} from '../const';
import {DictType, RealmDictObj} from '../dict';
import {LiveSource} from '../liveCfg';

export const useLiveTypes = () => {
  const liveTypes = useObject<RealmDictObj>({
    primaryKey: DictType.liveCategory,
    type: RealmTableName.Dict,
    // not working not
    // keyPaths: ['data', 'type'],
  });
  return liveTypes;
};

export const useLiveSources = () => {
  const liveSource = useQuery<LiveSource>({
    type: RealmTableName.LiveSource,
  });
  return liveSource;
};
