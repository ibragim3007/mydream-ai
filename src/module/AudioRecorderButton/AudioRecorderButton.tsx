import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import { GridPressable } from '@/shared/ui/grid/Grid';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

interface AudioRecorderButtonProps {}

export default function AudioRecorderButton({}: AudioRecorderButtonProps) {
  const colors = useTheme();
  const { vibrateMedium } = useVibration();

  const [recording, setRecording] = useState<Audio.Recording>();

  const startRecording = async () => {
    try {
      vibrateMedium();
      const permissionResponse = await Audio.requestPermissionsAsync();

      if (permissionResponse.status === 'granted') {
        console.log('Permission granted');
      } else {
        Alert.alert('Permission to access microphone was denied');
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
    try {
      if (!recording) {
        return;
      }

      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      setRecording(undefined);

      if (uri) {
        router.push(`/screens/newDreamScreen?uri=${uri}`);
      }
    } catch (e) {
      errorLogger.logError('Error in stopRecording');
      console.log(e);
    }
  };

  return (
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
        <FontAwesome name="stop-circle-o" size={28} color={colors.text.white} />
      ) : (
        <FontAwesome name="microphone" size={28} color={colors.text.white} />
      )}
    </GridPressable>
  );
}
