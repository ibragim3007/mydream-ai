import TextLine from '@/shared/ui/elements/TextLine';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import Bars from './Bars';

import { useTranslation } from 'react-i18next';
import Button from '@/shared/ui/buttons/Button';
import Animated, { FadeIn } from 'react-native-reanimated';
import { animationEngine } from '@/shared/service/animation.service';

interface ShortExplanationScreenProps {
  onPressButton: () => void;
}

export default function ShortExplanationScreen({ onPressButton }: ShortExplanationScreenProps) {
  const { t } = useTranslation();

  return (
    <SafeWrapper style={{ flex: 1 }}>
      <Grid justfity="space-between" height="100%">
        <Grid space="md" paddingVertical={20}>
          <Typography variant="largeTitle" weight="extra-bold">
            What is MyDream?
          </Typography>
          <Grid row space="sm">
            <TextLine />
            <Grid>
              <Typography>
                MyDream is an app that helps you{'\n'}
                <Typography weight="bold">record, analyze, and interpret your dreams{'\n'}</Typography>
                using AI technology.
              </Typography>
            </Grid>
          </Grid>
          <Grid marginTop={50}>
            <Bars />
          </Grid>
        </Grid>
        <Animated.View entering={FadeIn.delay(1000)}>
          <Grid align="center" marginBottom={16}>
            <Button style={{ width: '75%' }} onPress={onPressButton}>
              {t('onboarding.continue')}
            </Button>
          </Grid>
        </Animated.View>
      </Grid>
    </SafeWrapper>
  );
}
