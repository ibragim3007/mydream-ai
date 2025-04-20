import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import { useHeaderHeight } from '@react-navigation/elements';
import { Button, ScrollView } from 'react-native';
import AppSettingsBlock from './ui/blocks/AppSettingsBlock';
import LegalBlock from './ui/blocks/LegalBlock';
import LogOutBlock from './ui/blocks/LogOutBlock';
import * as Sentry from '@sentry/react-native';

export default function SettingsPage() {
  const headerHeight = useHeaderHeight();
  return (
    <PageWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeWrapper style={{ paddingTop: 15 + headerHeight, flex: 1 }}>
          <Grid space="lg">
            <AppSettingsBlock />
            <LegalBlock />
            {/* <FeedbackBlock /> */}
            <LogOutBlock />
          </Grid>
        </SafeWrapper>
      </ScrollView>
    </PageWrapper>
  );
}
