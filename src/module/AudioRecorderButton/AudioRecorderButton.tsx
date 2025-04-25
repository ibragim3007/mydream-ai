import { PLACEMENTS } from '@/shared/config/constants/constants';
import formatTime from '@/shared/helpers/formatTime';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import Grid, { GridPressable } from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Superwall from '@superwall/react-native-superwall';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Animated, Easing, Modal } from 'react-native';

interface AudioRecorderButtonProps {}

export default function AudioRecorderButton({}: AudioRecorderButtonProps) {
  const { subscriptionStatus, isActive } = useSubscription();

  const { vibrate } = useVibration();
  const colors = useTheme();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [recording, setRecording] = useState<Audio.Recording>();

  const rotation = new Animated.Value(-1);

  const startRotation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopRotation = () => {
    rotation.stopAnimation();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  // Start rotation when recording starts
  if (recording) {
    startRotation();
  } else {
    stopRotation();
  }

  const startRecording = async () => {
    if (!isActive) {
      Superwall.shared.register({
        placement: PLACEMENTS.campaign_trigger,
      });

      return;
    }

    setStartTime(Date.now());
    try {
      vibrate();
      const permissionResponse = await Audio.requestPermissionsAsync();

      if (permissionResponse.status === 'granted') {
        console.log('Permission granted');
      } else {
        Alert.alert('Permission to access microphone was denied', 'Please enable it in the settings.');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

      setRecording(recording);
    } catch (e) {
      errorLogger.logError('Error in startRecording');
      console.log(e);
    }
  };

  const stopRecording = async () => {
    setStartTime(null);

    try {
      if (!recording) {
        return;
      }

      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      setRecording(undefined);

      const durationMs = Date.now() - (startTime ?? 0);
      setStartTime(null);
      setRecording(undefined);

      if (durationMs < 3000) {
        Alert.alert('Слишком короткая запись', 'Попробуй записать хотя бы несколько секунд.');
        return;
      }

      if (uri) {
        router.push(`/screens/newDreamScreen?uri=${uri}`);
      }
    } catch (e) {
      errorLogger.logError('Error in stopRecording');
      console.log(e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (recording && startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => clearInterval(interval);
  }, [recording, startTime]);

  if (!isActive) {
    return (
      <GridPressable
        onPress={() => {
          Superwall.shared.register({
            placement: PLACEMENTS.campaign_trigger,
          });
        }}
        justfity="center"
        flex={1}
        paddingHorizontal={25}
        color={colors.text.primary}
        align="center"
        style={{ borderRadius: 15, width: 90 }}
      >
        <FontAwesome name="microphone" size={32} color={colors.text.white} />
        <Grid style={{ position: 'absolute', right: 15, bottom: 5 }}>
          <FontAwesome name="lock" size={18} color={colors.accent.primary} />
        </Grid>
      </GridPressable>
    );
  }

  return (
    <>
      <GridPressable
        onPress={recording ? stopRecording : startRecording}
        justfity="center"
        flex={1}
        paddingHorizontal={25}
        color={colors.text.primary}
        align="center"
        style={{ borderRadius: 15, width: 90 }}
      >
        {recording ? (
          <FontAwesome name="stop-circle-o" size={30} color={colors.text.white} />
        ) : (
          <FontAwesome name="microphone" size={30} color={colors.text.white} />
        )}
      </GridPressable>
      <Modal visible={!!recording} animationType="fade" transparent>
        <ModalContainer>
          <Grid
            color={colors.background.secondary}
            padding={20}
            style={{ borderRadius: colors.styles.borderRadius }}
            align="center"
            width="60%"
            space="sm"
          >
            <Grid gap={2}>
              <GridPressable
                onPress={stopRecording}
                justfity="center"
                // paddingHorizontal={25}
                color={colors.text.primary}
                align="center"
                style={{
                  borderRadius: 100,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  width: 60,
                  height: 60,
                }}
              >
                <Animated.View style={animatedStyle}>
                  <FontAwesome name="microphone" size={33} color={colors.accent.red} />
                </Animated.View>
              </GridPressable>
              <GridPressable
                onPress={stopRecording}
                justfity="center"
                // paddingHorizontal={25}
                color={colors.text.primary}
                align="center"
                style={{ borderRadius: 20, borderTopRightRadius: 5, borderTopLeftRadius: 5, width: 60, height: 40 }}
              >
                <FontAwesome name="stop" size={20} color={colors.text.white} />
              </GridPressable>
            </Grid>
            <Typography variant="title-3" weight="bold">
              {formatTime(elapsedTime)}
            </Typography>
          </Grid>
        </ModalContainer>
      </Modal>
    </>
  );
}
