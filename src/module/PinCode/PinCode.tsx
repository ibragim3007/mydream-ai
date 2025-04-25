import { useTheme } from '@/shared/hooks/useTheme';
import CircleButton from '@/shared/ui/buttons/CircleButton';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Typography from '@/shared/ui/typography/Typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptic from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface PinCodeProps {
  onResult: (code: string, isBiometricRight: boolean) => void;

  title: string;
  isPasscodeOn?: null | number;
  isBiometricOn: boolean;
}

export default function PinCode({ title, isPasscodeOn, isBiometricOn, onResult }: PinCodeProps) {
  const colors = useTheme();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(4).fill(0);

  const offset = useSharedValue(0);
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  useEffect(() => {
    if (code.length === 4) {
      onResult(code.join(''), false);
      setCode([]);
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
      onResult(code.join(''), true);
      setCode([]);
    } else {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
    }
  };

  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  useEffect(() => {
    if (!isPasscodeOn && isBiometricOn) {
      const auth = LocalAuthentication.authenticateAsync({
        promptMessage: 'Welcome back',
        fallbackLabel: 'Enter your passcode',
      });

      auth.then(result => {
        if (result.success) {
          onResult(code.join(''), true);
          setCode([]);
        } else {
          Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
        }
      });
    }
  }, []);

  return (
    <PageWrapper>
      <SafeAreaView>
        <Grid marginTop={20} row justfity="center" align="center">
          <Typography weight="bold" textAlign="center" variant="title-1">
            {title}
          </Typography>
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
            <Grid flex={1} style={{ minWidth: 0 }}>
              {isBiometricOn && (
                <CircleButton onPress={onBiometricPress}>
                  <MaterialCommunityIcons name="face-recognition" size={26} color="#fff" />
                </CircleButton>
              )}
            </Grid>

            <CircleButton onPress={() => onNumberPress(0)}>
              <Typography style={styles.number}>{0}</Typography>
            </CircleButton>

            <Grid flex={1} style={{ minWidth: 0 }}>
              <CircleButton onPress={numberBackSpace}>
                <MaterialIcons name="backspace" size={26} color="#fff" />
              </CircleButton>
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
