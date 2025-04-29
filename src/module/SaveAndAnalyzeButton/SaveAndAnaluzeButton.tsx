import DogAnim from '@/assets/animations/dog_anim_2.json';
import { useCreateDream } from '@/entities/dream/dream.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import Button from '@/shared/ui/buttons/Button';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { Alert, Modal } from 'react-native';

interface SaveAndAnaluzeButtonProps {
  dreamText: string;
  disabled: boolean;
  onChangeText: (text: string) => void;
}

export default function SaveAndAnaluzeButton({ dreamText, disabled, onChangeText }: SaveAndAnaluzeButtonProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const { createDreamFunction, isPending } = useCreateDream();

  const onPressCreateDream = async () => {
    if (dreamText.trim().length === 0) {
      Alert.alert(t('dream-input.enter-description'));
      return;
    }

    if (dreamText.split(' ').length < 3) {
      Alert.alert(t('dream-input.more-words-needed'));
      return;
    }

    onChangeText('');

    try {
      const res = await createDreamFunction({
        inputText: dreamText,
      });

      router.dismissAll();
      if (!res) {
        Alert.alert(t('dream-input.error'), t('dream-input.dream-not-created'));
        return;
      }
      router.push(`/screens/dream/${res.id}`);
    } catch {
      errorLogger.logError('Error in SaveAndAnaluzeButton');
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
        {t('dream-input.analyze-button')}
      </Button>
      <Modal transparent visible={isPending} animationType="fade">
        <ModalContainer>
          <Grid width="90%">
            <Paper color="#2c4376">
              <Grid width="100%" space="md" align="center">
                <LottieView
                  autoPlay
                  style={{ width: '100%', height: 250, shadowColor: '#60eaff', shadowOpacity: 1, shadowRadius: 4 }}
                  source={DogAnim}
                />
                <Typography textAlign="center" weight="bold" variant="title-3">
                  {t('dream-input.analyzing-loading')}
                </Typography>
                <LoaderIndicator />
              </Grid>
            </Paper>
          </Grid>
        </ModalContainer>
      </Modal>
    </>
  );
}
