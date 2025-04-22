import { useDreamStore } from '@/entities/dream/dream.store';
import SaveAndAnaluzeButton from '@/module/SaveAndAnalyzeButton/SaveAndAnaluzeButton';
import { transcibe } from '@/shared/api/entities/openai/openai.api';
import { useTheme } from '@/shared/hooks/useTheme';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import { fontWeight } from '@/shared/styles/typography/typography';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Paper from '@/shared/ui/layout/Paper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Modal, Platform, TextInput } from 'react-native';

export default function NewDreamInput() {
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  const [isLoadingTranscribing, setIsLoadingTranscribing] = useState(false);
  const { dreamText, setDreamText } = useDreamStore();

  useEffect(() => {
    if (uri) {
      handleTranscribe();
    }
  }, [uri]);

  const handleTranscribe = async () => {
    setIsLoadingTranscribing(true);
    try {
      const formData = new FormData();
      const audioData = { uri, name: 'audio.m4a', type: 'audio/m4a' };
      formData.append('audio', audioData as unknown as Blob);

      const response = await transcibe(formData);
      setDreamText(dreamText + ' ' + response);
    } catch (e) {
      errorLogger.logError('Error in handleTranscribe');
      console.log(e);
    }
    setIsLoadingTranscribing(false);
  };

  const colors = useTheme();
  const headerHeight = useHeaderHeight();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const onChangeText = (text: string) => {
    setDreamText(text);
  };

  // Пока не используется
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const hideKeyboard = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const isButtonDisabled = dreamText.length === 0;
  return (
    <PageWrapper>
      <SafeWrapper style={{ paddingTop: 15 + headerHeight, flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <TextInput
            onChangeText={onChangeText}
            value={dreamText}
            placeholderTextColor={colors.text.secondary}
            selectionColor={colors.text.primary}
            autoFocus
            multiline
            scrollEnabled
            placeholder="Enter your dream here. You can use microphone button on your keyboard"
            style={{
              fontSize: 22,
              fontFamily: fontWeight.medium,
              color: colors.text.primary,
              flex: 1,
              textAlignVertical: 'top',
            }}
          />

          <Grid marginTop={20}>
            <SaveAndAnaluzeButton onChangeText={onChangeText} dreamText={dreamText} disabled={isButtonDisabled} />
          </Grid>
          <Modal visible={isLoadingTranscribing} animationType="fade" transparent>
            <ModalContainer>
              <Paper>
                <Grid space="md">
                  <Typography weight="bold" variant="title-3">
                    Transcribing your audio... just a moment
                  </Typography>
                  <ActivityIndicator size="large" />
                </Grid>
              </Paper>
            </ModalContainer>
          </Modal>
          {/* {keyboardVisible && (
            <Pressable
              onPress={hideKeyboard}
              style={{
                position: 'absolute',
                right: 0,
                bottom: 330,
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 9,
              }}
            >
              <MaterialIcons name="keyboard-hide" size={24} color="black" />
            </Pressable>
          )} */}
        </KeyboardAvoidingView>
      </SafeWrapper>
    </PageWrapper>
  );
}
