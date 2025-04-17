import MoonImage from '@/assets/icons/moonImage2.png';
import { Image } from 'expo-image';

export default function HeaderImage() {
  return <Image source={MoonImage} style={{ height: 140, width: 140 }} />;
}
