import { Platform } from 'react-native';
const BASEURL =
  Platform.OS === 'android'
    ? __DEV__ && !global.__IS_EMULATOR__
      ? 'http://192.168.0.100:9000' // physical device
      : 'http://10.0.2.2:9000' // emulator
    : 'http://localhost:9000';

// const BASEURL = 'sex';

export { BASEURL };
