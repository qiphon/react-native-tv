import Reactotron, {networking, openInEditor} from 'reactotron-react-native';

console.log('------dev mode ------ use reactotron');

Reactotron.configure({}) // controls connection & communication settings
  .use(networking())
  .use(openInEditor())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
