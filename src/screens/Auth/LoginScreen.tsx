import { ImageBackground } from 'react-native';

import BGImg from '~/assets/BGImage.png';

export function LoginScreen() {
  return <ImageBackground source={BGImg} className="-m-5 flex-1 bg-green-600" />;
}
