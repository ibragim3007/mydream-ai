import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Snap from './Snap';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
import { useTranslation } from 'react-i18next';
interface SharableSnapshotProps {
  dream: GetDreamDto;
  analysis: SleepDataResponse | undefined;
}

export default function SharableSnapshot({ dream, analysis }: SharableSnapshotProps) {
  const ref = useRef<ViewShot>(null);
  const { t } = useTranslation();
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const colors = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const onPressShare = async () => {
    try {
      if (isLoadingShare) {
        return;
      }

      setIsLoadingShare(true);

      if (!ref.current) {
        throw new Error('ViewShot reference is null');
      }

      const uri = await ref.current?.capture?.();
      if (!uri) {
        throw new Error('Failed to capture the snapshot');
      }

      await Sharing.shareAsync(uri);
    } catch (e) {
      errorLogger.logError(`ShrableSnapshot: ${JSON.stringify(e)}`);
    } finally {
      setIsLoadingShare(false);
    }
  };

  return (
    <Grid flex={1}>
      <Grid marginHorizontal={HORIZONTAL_PADDINGS}>
        <Button leftIcon={<Feather name="share" size={24} color={colors.text.white} />} onPress={toggleModal}>
          {t('dream-page.share-my-dream')}
        </Button>
      </Grid>
      <Modal animationType="slide" visible={isOpen} transparent onRequestClose={toggleModal}>
        <Pressable
          style={{
            justifyContent: 'center',
          }}
          onPress={toggleModal}
        >
          <ScrollView
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: HORIZONTAL_PADDINGS,
              minHeight: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              paddingVertical: 70,
              paddingBottom: 120,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <Pressable>
              <Grid space="md">
                <Pressable
                  onPress={toggleModal}
                  style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    zIndex: 40,
                    top: -10,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    padding: 5,
                  }}
                >
                  <Ionicons name="close" size={24} color="black" />
                </Pressable>
                <Grid style={{ borderRadius: colors.styles.borderRadius, overflow: 'hidden' }}>
                  <ViewShot
                    captureMode="mount"
                    ref={ref}
                    options={{ fileName: 'Your-File-Name', format: 'png', quality: 1 }}
                  >
                    <Snap dream={dream} analysis={analysis} />
                  </ViewShot>
                </Grid>
              </Grid>
            </Pressable>
          </ScrollView>
          <Grid paddingHorizontal={30} style={{ position: 'absolute', bottom: 50, width: '100%' }}>
            <Button leftIcon={<Feather name="share" size={24} color={colors.text.white} />} onPress={onPressShare}>
              {t('dream-page.share-my-dream')}
            </Button>
          </Grid>
        </Pressable>
      </Modal>
    </Grid>
  );
}
