import { useCreateDream } from '@/entities/dream/dream.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import { Inform } from '@/shared/service/logger.service/logger.service';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { ActivityIndicator, Alert, Modal } from 'react-native';

interface SaveAndAnaluzeButtonProps {
  dreamText: string;
  disabled: boolean;
  onChangeText: (text: string) => void;
}

export default function SaveAndAnaluzeButton({ dreamText, disabled, onChangeText }: SaveAndAnaluzeButtonProps) {
  const colors = useTheme();
  const { createDreamFunction, isPending } = useCreateDream();

  const onPressCreateDream = async () => {
    if (dreamText.trim().length === 0) {
      Alert.alert('Please enter a dream description');
      return;
    }

    if (dreamText.split(' ').length < 3) {
      Alert.alert('Please enter at least 3 words');
      return;
    }

    onChangeText('');

    try {
      const res = await createDreamFunction({
        inputText: dreamText,
      });

      router.dismissAll();
      if (!res) {
        Alert.alert('Error', 'Dream not created');
        return;
      }
      router.push(`/screens/dream/${res.id}`);
    } catch {
      Inform.error('Error while creating dream');
    }
  };

  return (
    <>
      <Button
        leftIcon={
          <FontAwesome6
            name="wand-magic-sparkles"
            size={20}
            color={disabled ? colors.background.neutral : colors.text.white}
          />
        }
        disabled={disabled}
        onPress={onPressCreateDream}
      >
        Save & Analyze
      </Button>
      <Modal transparent visible={isPending} animationType="fade">
        <ModalContainer>
          <Paper>
            <Grid space="md">
              <Typography weight="bold" variant="title-3">
                Analyzing your dream...
              </Typography>
              <ActivityIndicator size="large" />
            </Grid>
          </Paper>
        </ModalContainer>
      </Modal>
    </>
  );
}
