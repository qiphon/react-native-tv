import {useEffect, useState} from 'react';
import Orientation, {
  type OrientationType,
} from 'react-native-orientation-locker';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>();

  useEffect(() => {
    Orientation.getOrientation(ori => {
      setOrientation(ori);
    });
    Orientation.lockToLandscape();
    Orientation.addDeviceOrientationListener(or => {
      console.log(or, 'change');
      setOrientation(or);
    });

    return () => {
      Orientation.removeAllListeners();
    };
  }, []);

  return orientation;
};
