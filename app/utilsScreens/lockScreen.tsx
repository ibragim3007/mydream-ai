import MoonImage from '@/assets/icons/moonImage2.png';
import { useTheme } from '@/shared/hooks/useTheme';
import CircleButton from '@/shared/ui/buttons/CircleButton';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Typography from '@/shared/ui/typography/Typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptic from 'expo-haptics';
import { Image } from 'expo-image';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function lockScreen() {
  const colors = useTheme();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(4).fill(0);
  const router = useRouter();

  const offset = useSharedValue(0);
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const OFFSET = 20;
  const TIME = 20;

  useEffect(() => {
    if (code.length === 4) {
      if (code.join('') === '1111') {
        router.replace('/screens/homeScreen');
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 }),
        );
        Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const numberBackSpace = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();

    if (success) {
      router.replace('/screens/homeScreen');
    } else {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
    }
  };

  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <PageWrapper>
      <SafeAreaView>
        <Grid marginTop={20} row justfity="center" align="center">
          <Typography weight="bold" textAlign="center" variant="title-1">
            Welcome back
          </Typography>
          <Image source={MoonImage} style={{ width: 50, height: 50 }} />
        </Grid>

        <Animated.View style={styleAnimation}>
          <Grid style={styles.codeView}>
            {codeLength.map((_, index) => (
              <Grid
                key={index}
                style={[
                  styles.codeEmpty,
                  { backgroundColor: code[index] !== undefined ? colors.accent.primary : '#3a3a3a' },
                ]}
              />
            ))}
          </Grid>
        </Animated.View>

        <Grid gap={15} align="center" marginHorizontal={50}>
          {numbers.map((row, rowIndex) => (
            <Grid gap={15} row key={rowIndex} justfity="space-between">
              {row.map(number => (
                <CircleButton text={number} onPress={() => onNumberPress(number)} key={number} />
              ))}
            </Grid>
          ))}

          <Grid gap={15} row justfity="space-between">
            <CircleButton onPress={onBiometricPress}>
              <MaterialCommunityIcons name="face-recognition" size={26} color="#fff" />
            </CircleButton>

            <CircleButton onPress={() => onNumberPress(0)}>
              <Typography style={styles.number}>{0}</Typography>
            </CircleButton>

            <Grid flex={1} style={{ minWidth: 0 }}>
              {code.length > 0 && (
                <CircleButton onPress={numberBackSpace}>
                  <MaterialIcons name="backspace" size={26} color="#fff" />
                </CircleButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </SafeAreaView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  greetings: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginVertical: 80,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  number: {
    fontSize: 32,
  },
});
