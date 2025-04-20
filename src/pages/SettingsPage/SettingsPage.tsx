import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import { useHeaderHeight } from '@react-navigation/elements';
import LogOutBlock from './ui/blocks/LogOutBlock';
import FeedbackBlock from './ui/blocks/FeedbackBlock';
import Grid from '@/shared/ui/grid/Grid';

export default function SettingsPage() {
  const headerHeight = useHeaderHeight();
  return (
    <PageWrapper>
      <SafeWrapper style={{ paddingTop: 15 + headerHeight, flex: 1 }}>
        <Grid space="lg">
          <FeedbackBlock />
          <LogOutBlock />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
