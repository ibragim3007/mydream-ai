import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import WrapIconInCircle from '@/shared/ui/wrapper/WrapIconInCircle';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Snap from './Snap';
interface SharableSnapshotProps {
  dream: GetDreamDto;
  analysis: SleepDataResponse | undefined;
}

export default function SharableSnapshot({ dream, analysis }: SharableSnapshotProps) {
  const ref = useRef<ViewShot>(null);
  const colors = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const onPressShare = async () => {
    if (!ref.current) {
      console.error('ViewShot reference is null');
      return;
    }

    const uri = await ref.current?.capture?.();
    if (!uri) {
      console.error('Failed to capture the view');
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: 'Share your dream summary',
      UTI: 'public.png',
    });

    console.log(uri);
  };

  return (
    <Grid>
      <WrapIconInCircle onPress={toggleModal}>
        <FontAwesome name="share-alt" size={24} color={colors.text.primary} />
      </WrapIconInCircle>
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

                <ViewShot
                  captureMode="mount"
                  ref={ref}
                  options={{ fileName: 'Your-File-Name', format: 'png', quality: 1 }}
                >
                  <Snap dream={dream} analysis={analysis} />
                </ViewShot>
              </Grid>
            </Pressable>
          </ScrollView>
          <Grid paddingHorizontal={30} style={{ position: 'absolute', bottom: 50, width: '100%' }}>
            <Button leftIcon={<Feather name="share" size={24} color={colors.text.white} />} onPress={onPressShare}>
              Share my dream
            </Button>
          </Grid>
        </Pressable>
      </Modal>
    </Grid>
  );
}
